import React, {useEffect, useState} from 'react';
import {Inertia} from '@inertiajs/inertia';
import ProductModal from "../../Components/Products/ProductModal.jsx";
import ProductTable from "../../Components/Products/ProductTable.jsx";


const ProductsIndex = ({products, categories, filters}) => {
    const [open, setOpen] = useState(false);
    const [product, setProduct] = useState({});
    const [query, setQuery] = useState(filters);

    const handleTableChange = (pagination, filters, sorter) => {
        const query = {
            ...(pagination?.current && {page: pagination.current}),
            ...(pagination?.pageSize && {pageSize: pagination.pageSize}),
        }

        if (filters?.categories) {
            query['categories'] = filters.categories.toString();
        }
        if (sorter?.order) {
            query['sortBy'] = sorter.field;
            query['direction'] = sorter.order === 'ascend' ? 'asc' : 'desc';
        }

        setQuery(query)
    };

    const setCurrentProduct = (id, updateQuery = true) => {
        const currentProduct = products.data.filter(product => product.id === +id)[0];
        if (!currentProduct) return;

        if (updateQuery) {
            setQuery(prevState => ({...prevState, product: currentProduct.id}))
        }
        setProduct(currentProduct);
        setOpen(true);
    }

    useEffect(() => {
        if (query?.product) setCurrentProduct(query?.product, false);
        Inertia.get('/', query, {preserveState: true});
    }, [query]);

    return (
        <>
            <ProductTable
                products={products}
                query={query}
                categories={categories}
                setCurrentProduct={setCurrentProduct}
                handleTableChange={handleTableChange}
            />
            {product && open &&
                <ProductModal
                    product={product}
                    query={query}
                    setQuery={setQuery}
                    open={open}
                    setOpen={setOpen}
                />
            }
        </>
    );
};

export default ProductsIndex;
