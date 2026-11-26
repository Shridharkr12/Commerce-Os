import { useState } from 'react';
import { Button, Form, Input } from 'antd';
import {
  ArrowRightOutlined,
  BarChartOutlined,
  LockOutlined,
  SafetyCertificateOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { message } from '@/lib/antdApp';
import './Login.css';

interface LoginValues {
  username: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm<LoginValues>();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: LoginValues) => {
    try {
      setLoading(true);
      await login(values);
      message.success('Login successful!');
      navigate('/admin');
    } catch (error: unknown) {
      const loginError = error as {
        message?: string;
        response?: { data?: { message?: string } };
      };
      message.error(
        loginError.response?.data?.message || loginError.message || 'Login failed',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      <section className="login-shell" aria-label="Sign in to the commerce dashboard">
        <aside className="login-brand-panel">
          <div className="login-brand">
            <span className="login-brand-icon" aria-hidden="true">
              <ShoppingCartOutlined />
            </span>
            <span className="login-brand-name">Commerce<span>OS</span></span>
          </div>

          <div className="login-brand-content">
            <p className="login-eyebrow">COMMERCE OPERATIONS PLATFORM</p>
            <h1>Everything in<br />one clear view.</h1>
            <p className="login-brand-description">
              A smarter workspace to manage your store, support your customers,
              and keep business moving.
            </p>

            <div className="login-feature-list">
              <div className="login-feature">
                <span className="login-feature-icon" aria-hidden="true">
                  <BarChartOutlined />
                </span>
                <span>
                  <strong>Know your numbers</strong>
                  <small>Orders, sales, and performance at a glance</small>
                </span>
              </div>
              <div className="login-feature">
                <span className="login-feature-icon" aria-hidden="true">
                  <ShoppingCartOutlined />
                </span>
                <span>
                  <strong>Keep operations moving</strong>
                  <small>Products, fulfillment, and customers together</small>
                </span>
              </div>
              <div className="login-feature">
                <span className="login-feature-icon" aria-hidden="true">
                  <SafetyCertificateOutlined />
                </span>
                <span>
                  <strong>Access with confidence</strong>
                  <small>Role-based tools for your team</small>
                </span>
              </div>
            </div>
          </div>

          <p className="login-brand-footer">A BETTER WAY TO RUN YOUR STORE</p>
          <div className="login-orbit login-orbit-one" aria-hidden="true" />
          <div className="login-orbit login-orbit-two" aria-hidden="true" />
        </aside>

        <div className="login-form-panel">
          <div className="login-form-content">
            <div className="login-form-heading">
              <p className="login-eyebrow">YOUR WORKSPACE AWAITS</p>
              <h2>Welcome back</h2>
              <p>Sign in with your account to continue to the dashboard.</p>
            </div>

            <Form
              form={form}
              name="login"
              onFinish={onFinish}
              layout="vertical"
              requiredMark={false}
              className="login-form"
            >
              <Form.Item
                name="username"
                label="Username"
                rules={[{ required: true, message: 'Please enter your username.' }]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Enter your username"
                  size="large"
                  autoComplete="username"
                />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true, message: 'Please enter your password.' }]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Enter your password"
                  size="large"
                  autoComplete="current-password"
                />
              </Form.Item>
              <Form.Item className="login-submit-item">
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  block
                  loading={loading}
                >
                  <span className="login-submit-content">
                    Sign in to your account <ArrowRightOutlined />
                  </span>
                </Button>
              </Form.Item>
            </Form>

            <div className="login-security-note">
              <SafetyCertificateOutlined />
              <span>Secure access for authorized team members</span>
            </div>
          </div>

          <footer className="login-form-footer">
            <span>© {new Date().getFullYear()} CommerceOS</span>
            <span>Store operations, made simpler.</span>
          </footer>
        </div>
      </section>
    </main>
  );
};

export default Login;
