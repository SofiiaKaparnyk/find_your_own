import { useEffect, useState } from 'react';
import { useAuth } from 'context/AuthProvider';
import MapContainer from '../map/MapContainer';
import UserMarkers from './UserMarkers';
import EventMarkers from './EventMarkers';
import { IEvent } from 'types/events';
import { IUser } from 'types/users';
import { getEvents, getUsers } from 'services';
import { useLoading } from 'context/LoadingContext';
import { Select } from 'antd';

type Filters = 'all' | 'users' | 'events';

export default function MainMap() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [events, setEvents] = useState<IEvent[]>([]);
  const [filter, setFilter] = useState<Filters>('all');
  const [infoWindowIndex, setInfoWindowIndex] = useState(-1);
  const [eventWindowIndex, setEventWindowIndex] = useState(-1);
  const { user } = useAuth();
  const { setIsLoading } = useLoading();

  useEffect(() => {
    setIsLoading(true);

    Promise.all([getUsers(), getEvents()])
      .then((data) => {
        if (data[0]) {
          setUsers(data[0]);
        }

        if (data[1]) {
          setEvents(data[1]);
        }
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div style={{ position: 'relative', height: '100%' }}>
      <MapContainer
        defaultCenter={user ? { lat: user?.latitude, lng: user?.longitude } : undefined}
      >
        {(filter === 'all' || filter === 'users') && (
          <UserMarkers
            users={users}
            infoWindowIndex={infoWindowIndex}
            setInfoWindowIndex={setInfoWindowIndex}
          />
        )}
        {(filter === 'all' || filter === 'events') && (
          <EventMarkers
            events={events}
            eventWindowIndex={eventWindowIndex}
            setEventWindowIndex={setEventWindowIndex}
          />
        )}
      </MapContainer>
      <Select
        id="gender-simple-select"
        value={filter}
        onChange={(value) => setFilter(value)}
        size="large"
        style={{ position: 'absolute', top: 10, left: 200, width: '100px' }}
      >
        <Select.Option value="all">All</Select.Option>
        <Select.Option value="users">Users</Select.Option>
        <Select.Option value="events">Events</Select.Option>
      </Select>
    </div>
  );
}
