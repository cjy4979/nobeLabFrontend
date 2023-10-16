import React from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { login } from '@/services/admin/userController';
import { useNavigate } from '@umijs/max';

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};



function index() {
  const navigate = useNavigate()
  const onFinish = async (values: any) => {
    const { username, password } = values
    const data = await login({ username, password })
    if (data.success) {
      sessionStorage.setItem('token',data.token)
      message.success("登录成功！")
      navigate('/admin/home')
      return
    }
    message.error('出错了!')
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center' }}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600, marginTop: '30vh' }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="用户名"
          name="username"
          rules={[{ required: true, message: '请输入用户名!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="密码"
          name="password"
          rules={[{ required: true, message: '请输入密码!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType>
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>记住我</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default index;