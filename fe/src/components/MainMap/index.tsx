import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { useAuth } from 'context/AuthProvider';
import MapContainer from '../map/MapContainer';
import UserMarkers from './UserMarkers';
import EventMarkers from './EventMarkers';
import { IEvent } from 'types/events';
import { IUser } from 'types/users';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

type Filters = 'all' | 'users' | 'events';

export default function MainMap() {
  const [filter, setFilter] = useState<Filters>('all');
  const [infoWindowIndex, setInfoWindowIndex] = useState(-1);
  const [eventWindowIndex, setEventWindowIndex] = useState(-1);
  const { user } = useAuth();
  const loaderData = useLoaderData();
  const { users = [], events = [] } = loaderData as unknown as { users: IUser[] | undefined; events: IEvent[] | undefined };

  return (
    <MapContainer
      style={{ height: 'var(--containerHeight)' }}
      defaultCenter={user ? { lat: user?.latitude, lng: user?.longitude } : undefined}
    >
      {(filter === 'all' || filter === 'users') && <UserMarkers
        users={users}
        infoWindowIndex={infoWindowIndex}
        setInfoWindowIndex={setInfoWindowIndex}
      />}
      {(filter === 'all' || filter === 'events') && <EventMarkers
        events={events}
        eventWindowIndex={eventWindowIndex}
        setEventWindowIndex={setEventWindowIndex}
      />}

      <div>
        <FormControl sx={{ position: 'absolute', top: '110px', left: '10px', minWidth: '100px'}}>
          <InputLabel id="gender-select-label">Filters</InputLabel>
          <Select
            labelId="gender-select-label"
            id="gender-simple-select"
            label="Gender"
            value={filter}
            onChange={e => setFilter(e.target.value as Filters)}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="users">Users</MenuItem>
            <MenuItem value="events">Events</MenuItem>
          </Select>
        </FormControl>
      </div>
    </MapContainer>
  );
}
