import {Button, Carousel, Modal, Tag} from "antd";
import React from "react";
import {Inertia} from "@inertiajs/inertia";

const ProductModal = ({product, query, setQuery, open, setOpen}) => {
    const handleClose = () => {
        setOpen(false);

        delete query.product

        setQuery(prevState => {
            delete prevState.product
            return prevState;
        });

        Inertia.get('/', query, {preserveState: true});
    };

    return (
        <Modal
            title={product.name}
            open={open}
            destroyOnClose={true}
            onCancel={handleClose}
            footer={<Button onClick={handleClose}>Return</Button>}
        >
            {product.images && <Carousel autoplay>
                {product.images.map((image, index) => (
                    <img key={index} alt={product.name} src={image.image_url} style={{width: '100%'}}/>
                ))}
            </Carousel>}
            <div style={{marginTop: '20px'}}>
                {product.categories.map((category, index) => (
                    <Tag key={index} color="blue">{category.name}</Tag>
                ))}
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
            </div>
        </Modal>
    )
}

export default ProductModal;
