import React, { useState } from "react";
import { Button, Form, Input, Layout, Card, Row, Alert } from "antd";
import { useSelector } from 'react-redux';
import useLogin from "./useLogin";

const Login = () => {

  const isLoading = useSelector(state => state.auth.isLoading)
  const isError = useSelector(state => state.auth.error)
  const [login, setLogin] = useState({ email: 'test@mail.ru', password: 'test@mail.ru' })

  const { queryLogin } = useLogin()

  return (
    <Layout>
      <Row justify="center" align="middle" style={{minHeight: '100vh'}}>
        <Card title='Авторизация' style={{ width: 400, alignSelf: 'start', marginTop: '10%' }}>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={() => { queryLogin({...login, device_name: navigator.userAgent}) }}
            onFinishFailed={(e) => console.error(e)}
            autoComplete="off"
          >
            {isError && <Alert
              style={{ marginBottom: 24 }}
              message="Ошибка"
              description={isError}
              type="error"
              showIcon
            />}

            <Form.Item
              label="Маил"
              name="email"
              rules={[{ required: true, message: 'Введите электронную почту!' }]}
              initialValue="test@mail.ru"
            >
              <Input onChange={e => setLogin({ ...login, email: e.target.value })} />
            </Form.Item>

            <Form.Item
              label="Пароль"
              name="password"
              rules={[{ required: true, message: 'Введите пароль!' }]}
              initialValue="test@mail.ru"
            >
              <Input.Password onChange={e => setLogin({ ...login, password: e.target.value })} />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit" loading={isLoading}>
                Войти
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Row>
    </Layout>
  )
}

export default Login