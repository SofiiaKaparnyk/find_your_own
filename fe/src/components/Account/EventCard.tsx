import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import vava from 'assets/map.png';
import { IEvent } from 'types/events';
import { Button, Card } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';


interface IProps {
  event: IEvent;
  onDelete: (id: number) => void;
}

export default function EventCard({ event, onDelete }: IProps) {
  const handleDelete = () => {
    onDelete(event.id as number);
  };
  return (
    <Card
      hoverable
      cover={
        <img
          alt="card cover"
          style={{ width: '100%', height: '100px', objectFit: 'cover' }}
          src={(event.image as string | undefined) || vava}
        />
      }
      style={{ display: 'grid', gridAutoRows: 'auto 1fr auto' }}
      actions={[
        <Link to={`/event/edit/${event.id}`}>
          <Button
            aria-label="edit"
            ghost
            type="primary"
            shape="circle"
            icon={<EditOutlined />}
          />
        </Link>,
        <Button
          aria-label="delete"
          danger
          shape="circle"
          onClick={handleDelete}
          icon={<DeleteOutlined />}
        />,
      ]}
    >
      <Card.Meta
        title={event.title}
        description={dayjs(event.date).utc(true).format('MMMM DD, YYYY, hh:mmA')}
      />
      <Card.Meta
        style={{ marginTop: '16px', height: '100%', wordBreak: 'break-word' }}
        description={event.description}
      />
    </Card>
  );
}
