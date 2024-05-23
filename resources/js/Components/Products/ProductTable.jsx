import {Button, Layout, message, Table, Tag} from "antd";
import React from "react";
import {Inertia} from "@inertiajs/inertia";

const ProductTable = ({products, query, categories, handleTableChange, setCurrentProduct}) => {
    const fullQueryDirectionName = query.direction === 'asc' ? 'ascend' : 'descend';

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            sorter: true,
            defaultSortOrder: query.sortBy === 'id' ? fullQueryDirectionName : false,
        },
        {
            title: 'Image',
            dataIndex: 'images',
            render: images => images.length > 0 && <img src={images[0].image_url} alt="product" style={{width: 50}}/>,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: true,
            defaultSortOrder: query.sortBy === 'name' ? fullQueryDirectionName : false,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            sorter: true,
            defaultSortOrder: query.sortBy === 'description' ? fullQueryDirectionName : false,
            render: text => (text.length > 30 ? `${text.substring(0, 30)}...` : text),
        },
        {
            title: 'Price',
            dataIndex: 'price',
            sorter: true,
            defaultSortOrder: query.sortBy === 'price' ? fullQueryDirectionName : false,
        },
        {
            title: 'Categories',
            dataIndex: 'categories',
            filters: Array.from(categories, (category) => (
                    {text: category.name, value: category.name}
                )
            ),
            filteredValue: query?.categories?.split(','),
            render: categories => (
                <div style={{maxWidth: 250}}>
                    {categories.map((category, index) => (
                        <Tag key={index} color="blue">{category.name}</Tag>
                    ))}
                </div>)
        },
        {
            title: 'Actions',
            dataIndex: 'id',
            render: id => (
                <>
                    <Button onClick={() => setCurrentProduct(id)}>View</Button>
                    <Button type="link" onClick={() => handleDelete(id)}>Delete</Button>
                </>
            ),
        },
    ];

    const handleDelete = id => {
        if (confirm('Are you sure you want to delete this product?')) {
            Inertia.delete(`/admin/products/${id}`, {
                onError: (error) => {
                        message.error(error)
                },
                onSuccess: () => {
                    message.success('Product has been deleted successfully!');
                },
            });
        }
    };

    const tableChange = (pagination, filters, sorter) => {
        handleTableChange(pagination, filters, sorter)
    }

    const navigateToAdmin = () => {
        Inertia.visit('/admin');
    };

    return (
        <Layout style={{
            minHeight: '100vh',
            overflowY: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Layout style={{padding: '20px 0px', maxWidth: 1500, width: '100%'}}>
                <div style={{
                    padding: '0 10px',
                    margin: '0 auto',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                        <h1 style={{textAlign: "center", marginBottom: '20px'}}>Products</h1>
                        <Button type="primary" onClick={navigateToAdmin}>
                            Add Product
                        </Button>
                    </div>
                    <div style={{flex: 1, overflowY: 'auto', overflowX: 'auto'}}>
                        <Table
                            bordered
                            columns={columns}
                            dataSource={products.data}
                            rowKey="id"
                            onChange={tableChange}
                            pagination={{
                                current: products.current_page,
                                pageSize: products.per_page,
                                total: products.total,
                                showSizeChanger: true,
                            }}
                            scroll={{y: 'calc(100vh - 250px)', x: 'max-content'}}
                        />
                    </div>
                </div>
            </Layout>
        </Layout>
    );
}

export default ProductTable;
