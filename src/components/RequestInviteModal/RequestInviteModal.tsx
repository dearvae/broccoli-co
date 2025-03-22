import React from 'react';
import { Button, Form, Input, message, Modal } from 'antd';
import { useRequest } from 'ahooks';

type ErrorResponse = {
    errorMessage: string;
};
const RequestInviteModal = ({ visible, onHide }: { visible: boolean; onHide: () => void }) => {
    const [form] = Form.useForm();
    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 6 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 14 },
        },
    };
    const { loading, run: submitRequest } = useRequest(
        (data: { name: string; email: string }) => {
            return fetch(
                'https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                }
            ).then((response) => {
                if (!response.ok) {
                    return response.json().then((errorData: ErrorResponse) => {
                        throw { message: errorData.errorMessage };
                    });
                }
                return response;
            });
            //usedemail@airwallex.com
        },
        {
            manual: true,
            onSuccess: async (response) => {
                const data = await response.json();
                message.success(data);
                form.resetFields();
                onHide();
            },
            onError: (error) => {
                console.log(error);
                message.error(error.message);
            },
        }
    );
    const onSubmit = async () => {
        form.validateFields()
            .then((values) => {
                submitRequest({
                    name: values.fullName,
                    email: values.email,
                });
            })
            .catch((errorInfo) => {
                console.log(errorInfo);
            });
    };
    return (
        <Modal title="Request an invite" visible={visible} onCancel={onHide} footer={null}>
            <Form form={form} {...formItemLayout}>
                <Form.Item
                    label="Full Name"
                    name="fullName"
                    rules={[{ required: true, message: 'Please enter your full name' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please enter your email' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Confirm Email"
                    name="confirmEmail"
                    dependencies={['email']}
                    rules={[
                        { required: true, message: 'Please confirm your email' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('email') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error('The email that you entered do not match!')
                                );
                            },
                        }),
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" onClick={onSubmit} loading={loading}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default RequestInviteModal;
