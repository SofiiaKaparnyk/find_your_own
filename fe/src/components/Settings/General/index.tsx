import { useEffect, useState, CSSProperties } from 'react';
import { Avatar, Button, DatePicker, Flex, Form, Input, Select } from 'antd';
import dayjs from 'dayjs';
import PageWrapper from 'components/common/PageWrapper';
import AvatarLoader from './AvatarLoader';
import SubmitButton from './SubmitButton';
import BackdropLoading from 'components/Backdrop';
import { IUserProfile } from 'types/users';
import { getUserProfile } from 'services';
import { useLoading } from 'context/LoadingContext';

const containerStyles: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  placeItems: 'center',
  gap: '32px',
  padding: '32px',
  overflowY: 'auto',
};

let userBeforeEdit: IUserProfile;

export default function GeneralSettings() {
  const [user, setUser] = useState<IUserProfile>();
  const [form] = Form.useForm();
  const { isLoading, setIsLoading } = useLoading();

  useEffect(() => {
    setIsLoading(true);
    getUserProfile()
      .then((data) => {
        if (data) {
          setUser(data);
          userBeforeEdit = data;
          form.setFieldsValue({ ...data, dob: dayjs(data.dob) });
        }
      })
      .finally(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (data: IUserProfile) => {
    const newData: Partial<IUserProfile> = {
      ...user,
      ...data,
      dob: dayjs(data.dob).format('YYYY-MM-DD'),
    };
    // updateUserProfile(newData).then((res) => {});
    console.log(newData);
  };

  const onCancel = () => {
    form.setFieldsValue({ ...userBeforeEdit, dob: dayjs(userBeforeEdit.dob) });
  };

  const avatarUrl = `${process.env.REACT_APP_API_BASE}${user?.image}`;
  return (
    <>
      <PageWrapper style={containerStyles}>
        <Flex vertical gap={8} align="center" style={{ marginBottom: '32px' }}>
          <Avatar size={260} src={avatarUrl} />
          <AvatarLoader user={user!} />
        </Flex>

        <Form
          layout="horizontal"
          labelCol={{ span: 4, offset: 1 }}
          wrapperCol={{ span: 18, offset: 1 }}
          form={form}
          initialValues={user}
          onFinish={onSubmit}
          size="large"
          autoComplete="off"
          style={{ maxWidth: '400px', width: '100%' }}
        >
          <Form.Item
            name="first_name"
            label="Name"
            rules={[{ min: 2, message: 'Name must be at least 2 characters' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="last_name"
            label="Surname"
            rules={[{ min: 2, message: 'Surname must be at least 2 characters' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,6}$/,
                message: 'Email is not valid',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="gender" label="Gender">
            <Select placeholder="Select a gender" allowClear>
              <Select.Option value="M">Male</Select.Option>
              <Select.Option value="F">Female</Select.Option>
              <Select.Option value="O">Other</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="dob" label="Birthday">
            <DatePicker maxDate={dayjs()} />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 8, offset: 10 }}>
            <Flex gap={8}>
              <Button type="primary" danger style={{ width: '100%' }} onClick={onCancel}>
                Cancel
              </Button>
              <SubmitButton form={form}>Save</SubmitButton>
            </Flex>
          </Form.Item>
        </Form>
        <BackdropLoading loading={isLoading} />
      </PageWrapper>
    </>
  );
}
