import { useState } from 'react';
import { Button, Paper, Typography } from '@mui/material';
import { Link, useLoaderData } from 'react-router-dom';
import PageWrapper from 'components/PageWrapper';
import EventCard from 'components/Account/EventCard';
import { IEvent } from 'types/events';
import { IUserProfile } from 'types/users';

const containerStyles = {
  display: 'grid',
  gridTemplateColumns: '1fr 350px',
  alignItems: 'start',
  gap: '32px',
};

export default function Account() {
  const [expandedIndex, setExpanded] = useState(-1);
  const loaderData = useLoaderData();
  const { user, events } = loaderData as unknown as { user: IUserProfile; events: IEvent[] };

  const handleExpandClick = (index: number) => {
    if (expandedIndex === index) {
      setExpanded(-1);
      return;
    }
    setExpanded(index);
  };

  return (
    <PageWrapper style={containerStyles}>
      <Paper sx={{ p: 2 }}>
        <Typography>Account</Typography>
      </Paper>
      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h5" textAlign="center" sx={{ color: 'var(--lightBlue)' }}>
          My events
        </Typography>
        {!(events as IEvent[]).length && (
          <Typography variant="body1" textAlign="center" sx={{ color: 'lightgray' }}>
            No events
          </Typography>
        )}
        {(events as IEvent[]).map((event, index) => {
          return (
            <EventCard
              key={index}
              expanded={index === expandedIndex}
              handleExpandClick={() => handleExpandClick(index)}
              event={event}
            />
          );
        })}
        <Link to="/event/create" style={{ marginTop: 'auto', margin: 'auto auto 0' }}>
          <Button variant="outlined">Create event</Button>
        </Link>
      </Paper>
    </PageWrapper>
  );
}
