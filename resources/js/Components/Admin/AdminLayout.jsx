import {Button, Layout} from "antd";
import React from "react";

const AdminLayout = ({isProductForm, setIsProductForm, children}) => (
    <Layout style={{width: '100%', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Layout style={{width: '100%', padding: '50px'}}>
            <div style={{textAlign: 'center', marginBottom: '20px'}}>
                <Button type={isProductForm ? 'primary' : 'default'} onClick={() => setIsProductForm(true)}
                        style={{marginRight: '10px'}}>
                    Create Product
                </Button>
                <Button type={!isProductForm ? 'primary' : 'default'} onClick={() => setIsProductForm(false)}>
                    Create Category
                </Button>
            </div>

            { children }

        </Layout>
    </Layout>
)


export default AdminLayout;
