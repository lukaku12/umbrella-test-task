import React, {useState} from 'react';
import {Button, Card, Form, Input, message} from 'antd';
import {Inertia} from '@inertiajs/inertia';

const AdminCreateCategory = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const onFinish = (values) => {
        setLoading(true);
        Inertia.post('/admin/categories', values, {
            onError: (errors) => {
                Object.keys(errors).map(key => {
                    message.error(errors[key])
                });
                setLoading(false);
            },
            onSuccess: () => {
                message.success('Category created successfully!');
                form.resetFields();
                setLoading(false);
            },
        });
    };

    return (
        <Card title="Create Category" style={{width: '100%', maxWidth: 600, margin: '0 auto'}}>
            <Form form={form} onFinish={onFinish}>
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[{required: true, message: 'Please input the category name!'}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Create Category
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default AdminCreateCategory;


