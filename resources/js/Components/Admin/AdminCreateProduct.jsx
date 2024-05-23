import {Button, Card, Form, Input, InputNumber, message, Select, Upload} from "antd";
import {useForm} from "@inertiajs/react";
import {Inertia} from "@inertiajs/inertia";
import {useState} from "react";

const {Option} = Select;

const CreateProduct = ({categories}) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const {data, setData, post, reset, errors} = useForm({
        name: '',
        description: '',
        price: '',
        images: [],
        categories: '',
    });

    const handleFileChange = ({fileList}) => setData('images', fileList)

    const objectToFormData = (obj, form = new FormData(), namespace = '') => {
        for (let property in obj) {
            if (!obj.hasOwnProperty(property) || obj[property] === undefined || obj[property] === null) {
                continue;
            }

            let formKey = namespace ? `${namespace}[${property}]` : property;

            if (obj[property] instanceof Date) {
                form.append(formKey, obj[property].toISOString());
            } else if (typeof obj[property] === 'object' && !(obj[property] instanceof File)) {
                // If it's an array or a plain object, recursively call the function
                objectToFormData(obj[property], form, formKey);
            } else {
                // If it's a file or a simple value, append it
                form.append(formKey, obj[property]);
            }
        }

        return form;
    }


    const submitProduct = () => {
        setLoading(true);

        const submittableData = {...data};
        submittableData.images = submittableData.images.map(image => image.originFileObj);

        Inertia.post('/admin/products', objectToFormData(submittableData), {
            onError: (errors) => {
                Object.keys(errors).map(key => {
                    message.error(errors[key])
                });
                setLoading(false);
            },
            onSuccess: () => {
                message.success('Product created successfully!');
                form.resetFields();
                reset();
                setLoading(false);
            },
        });
    };

    return (
        <Card title="Create Product" style={{width: '100%', maxWidth: 600, margin: '0 auto'}}>
            <Form form={form} onFinish={submitProduct}>
                <Form.Item name="name" label="Name" rules={[{required: true}]}>
                    <Input value={data.name} onChange={e => setData('name', e.target.value)}/>
                </Form.Item>
                <Form.Item name="description" label="Description" rules={[{required: true}]}>
                    <Input.TextArea value={data.description} onChange={e => setData('description', e.target.value)}/>
                </Form.Item>
                <Form.Item name="price" label="Price" rules={[{required: true, type: 'number', min: 0}]}>
                    <InputNumber value={data.price} onChange={value => setData('price', value)}/>
                </Form.Item>
                <Form.Item name="images" label="Images" rules={[{required: true}]}>
                    <Upload
                        multiple={true}
                        listType="picture"
                        fileList={data.images}
                        beforeUpload={() => false}
                        onChange={handleFileChange}
                    >
                        <Button>Select Files</Button>
                    </Upload>
                </Form.Item>
                <Form.Item name="categories" label="Categories" rules={[{required: true}]}>
                    <Select mode="multiple" allowClear onChange={value => setData('categories', value)}>
                        {categories.map(category => (
                            <Option key={category.id} value={category.id}>{category.name}</Option>
                        ))}
                    </Select>
                </Form.Item>
                <Button type="primary" loading={loading} htmlType="submit">
                    Create Product
                </Button>
            </Form>
        </Card>
    )
}


export default CreateProduct;
