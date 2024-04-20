import { useEffect, useState } from 'react';
import { Avatar, Button, Empty, Flex, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import PageWrapper from 'components/common/PageWrapper';
import EventCard from './EventCard';
import { IEvent } from 'types/events';
import { IUserProfile } from 'types/users';
import { deleteEvent, getEvents, getUserProfile } from 'services';
import { useLoading } from 'context/LoadingContext';

const containerStyles = {
  display: 'grid',
  gridTemplateColumns: 'auto 1fr',
  placeItems: 'start center',
  gap: '32px',
};

export default function Account() {
  const [user, setUser] = useState<IUserProfile>();
  const [events, setEvents] = useState<IEvent[]>([]);
  const { setIsLoading } = useLoading();

  useEffect(() => {
    setIsLoading(true);
    Promise.all([getUserProfile(), getEvents()])
      .then((data) => {
        if (data[0]) {
          setUser(data[0]);
        }

        if (data[1]) {
          setEvents(data[1]);
        }
      })
      .finally(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeleteEvent = async (id: number) => {
    setIsLoading(true);
    await deleteEvent(id);

    getEvents()
      .then((data) => {
        if (data) {
          setEvents(data);
        }
      })
      .finally(() => setIsLoading(false));
  };

  // 'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg'
  const avatarUrl = user ? `${process.env.REACT_APP_API_BASE}${user?.image}` : '';

  return (
    <>
      <PageWrapper style={containerStyles}>
        <Flex vertical gap={8} align="center" style={{ marginBottom: '32px' }}>
          <Avatar size={160} src={avatarUrl} />
          <Flex vertical gap={0} align="center">
            <Typography.Text
              strong
            >{`${user?.first_name} ${user?.last_name}`}</Typography.Text>
            <Typography.Text type="secondary">{user?.email}</Typography.Text>
          </Flex>
        </Flex>

        <div
          style={{
            width: '100%',
            height: '100%',
            overflowY: 'auto',
            padding: '0 16px 16px',
          }}
        >
          <Flex justify="space-between" style={{ marginBottom: '16px' }}>
            <Typography.Title level={4}>My events</Typography.Title>
            <Link to="/event/create">
              <Button
                type="primary"
                shape="circle"
                title="Add event"
                icon={<PlusOutlined />}
              />
            </Link>
          </Flex>
          {!events.length && (
            <Empty
              image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
              imageStyle={{ height: 60 }}
              description={<span>No events</span>}
            >
              <Button type="primary">Create Now</Button>
            </Empty>
          )}
          <div
            style={{
              display: 'grid',
              gap: '16px',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            }}
          >
            {events.map((event, index) => {
              return <EventCard key={index} event={event} onDelete={handleDeleteEvent} />;
            })}
          </div>
        </div>
      </PageWrapper>
    </>
  );
}
