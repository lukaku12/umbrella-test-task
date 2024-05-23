import React, {useState} from 'react';
import AdminCreateCategory from "../../Components/Admin/AdminCreateCategory.jsx";
import AdminCreateProduct from "../../Components/Admin/AdminCreateProduct.jsx";
import AdminLayout from "../../Components/Admin/AdminLayout.jsx";

const AdminIndex = ({categories}) => {
    const [isProductForm, setIsProductForm] = useState(true);

    return (
        <AdminLayout
            isProductForm={isProductForm}
            setIsProductForm={setIsProductForm}
        >
            {isProductForm ? (
                <AdminCreateProduct categories={categories}/>
            ) : (
                <AdminCreateCategory/>
            )}
        </AdminLayout>
    );
};

export default AdminIndex;
