import styles from './login.module.scss';
import { Row, Col, Form, Input, Button } from 'antd'
import { LoginDto } from '@vnm/model'
import { httpService } from '@vnm/ui'

/* eslint-disable-next-line */
export interface LoginProps {}

export function Login() {
  const onFinish = (user: LoginDto) => {
    httpService.post<LoginDto>('/api/auth/login', user).subscribe((result: LoginDto) => {
      console.log('Success:', result)
      window.location.href = '/dashboard'
    })
  }

  const onFinishFailed = (errorInfo: any) => { console.log('Failed', errorInfo) }

  return (
    <div className={styles['login_container']}>
      <div className={styles['center_bg']}>
        <Row justify='center' align='middle' className={styles['form_container']}>
          <Col span={16} offset={6}>
            <Form
              name='basic'
              layout='vertical'
              labelCol={{ span: 16 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete='off'
            >
              <Form.Item label='Email' name='email' rules={[{ required: true, message: 'Please input your email' }]}>
                <Input />
              </Form.Item>

              <Form.Item label='Password' name='password' rules={[{ required: true, message: 'Please input your password' }]}>
                <Input.Password />
              </Form.Item>

              <Form.Item wrapperCol={{ span: 16 }}>
                <Button type='primary' htmlType='submit' block>Submit</Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Login;
