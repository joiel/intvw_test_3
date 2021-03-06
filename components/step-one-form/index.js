import React from 'react';
import { Form, Input, Checkbox, Button, Col } from 'antd';
const formItemLayout = {
  labelCol: {
    md: {
      span: 24,
    },
    lg: {
      span: 6,
    },
  },
  wrapperCol: {
    md: {
      span: 24,
    },
    lg: {
      span: 18,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    md: {
      span: 24,
      offset: 0,
    },
    lg: {
      span: 18,
      offset: 6,
    },
  },
};

export default function StepOne({ handleNext, setValues }) {
  const [form] = Form.useForm();

  const onFinish = values => {
    console.log('Received values of form: ', values);
    if (values) {
      setValues(values);
      handleNext();
    }
  };
  return (
    <Col md={{ span: 24 }} lg={{ span: 16, offset: 4 }}>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
      >
        <Form.Item
          name="firstname"
          label="First Name"
          rules={[
            {
              required: true,
              message: 'Please input your first name!',
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="lastname"
          label="Last Name"
          rules={[
            {
              required: false,
              message: 'Please input your last name!',
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  'The two passwords that you entered do not match!',
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject('Should accept agreement'),
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>
            I have read the <a href="">agreement</a>
          </Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Next
          </Button>
        </Form.Item>
      </Form>
    </Col>
  );
}
