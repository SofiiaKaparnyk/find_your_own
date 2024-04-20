import { Button, Form, Input } from 'antd';
import PageWrapper from 'components/common/PageWrapper';
import { useLoading } from 'context/LoadingContext';

const containerStyles = {
  display: 'grid',
  placeItems: 'center',
  gap: '32px',
  padding: '32px',
};

export default function SecuritySettings() {
  const [form] = Form.useForm();
  const { setIsLoading } = useLoading();

  return (
    <PageWrapper style={containerStyles}>
      <Form
        layout="horizontal"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        form={form}
        initialValues={{ layout: [] }}
        onValuesChange={() => {}}
        size="large"
        style={{ maxWidth: '400px', width: '100%' }}
      >
        <Form.Item label="Current password">
          <Input.Password value="Bohdan" />
        </Form.Item>
        <Form.Item label="New password">
          <Input.Password value="Omeli" />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 8, offset: 8 }}>
          <Button type="primary" style={{ width: '100%' }}>
            Change
          </Button>
        </Form.Item>
      </Form>
    </PageWrapper>
  );
}
