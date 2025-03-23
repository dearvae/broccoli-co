import React, { useState } from 'react';
import { Button, Divider, Form, Input, message, Modal } from 'antd';
import { useRequest } from 'ahooks';

type ErrorResponse = {
    errorMessage: string;
};
const RequestInviteModal = ({ visible, onHide }: { visible: boolean; onHide: () => void }) => {
    const [errorMessage, setErrorMessage] = useState('');
    const [form] = Form.useForm();
    const onCancel = () => {
        form.resetFields();
        setErrorMessage('');
        onHide();
    };
    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 6 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 18 },
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
                Modal.success({
                    title: 'You are successfully registered!',
                });
                onCancel();
            },
            onError: (error) => {
                setErrorMessage(error.message);
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
        <Modal
            title={<div className="text-center">Request an invite</div>}
            open={visible}
            onCancel={onCancel}
            footer={
                errorMessage ? <div className="text-red-500 text-center">{errorMessage}</div> : null
            }
        >
            <Divider />
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
                    rules={[
                        { required: true, message: 'Please enter your email' },
                        {
                            type: 'email',
                            message: 'Please enter a valid email address',
                        },
                    ]}
                >
                    <Input data-testid="email-input" />
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
                    <Input data-testid="confirm-email-input" />
                </Form.Item>
                <Button type="primary" onClick={onSubmit} loading={loading} className="w-full mb-5">
                    {loading ? 'Sending, Please wait...' : 'Submit'}
                </Button>
            </Form>
        </Modal>
    );
};

export default RequestInviteModal;
