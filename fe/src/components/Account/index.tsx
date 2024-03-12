import { useState } from 'react';
import { Button, Container, Paper, Typography } from '@mui/material';
import EventCard from './EventCard';
import { Link, useLoaderData } from 'react-router-dom';
import { IEvent } from 'types/events';

const containerStyles = {
  position: 'relative',
  minWidth: '100%',
  height: 'var(--containerHeight)',
  overflowY: 'scroll',
  padding: 3,
  display: 'grid',
  gridTemplateColumns: '1fr 350px',
  alignItems: 'start',
  gap: '32px',
};

export default function Account() {
  const [expandedIndex, setExpanded] = useState(-1);
  const events = useLoaderData();

  const handleExpandClick = (index: number) => {
    if (expandedIndex === index) {
      setExpanded(-1);
      return;
    }
    setExpanded(index);
  };

  return (
    <Container sx={containerStyles}>
      <Paper sx={{ p: 2 }}>
        <Typography>Account</Typography>
      </Paper>
      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h5" textAlign="center" sx={{ color: 'var(--lightBlue)' }}>
          My events
        </Typography>
        {!(events as unknown as IEvent[]).length && (
          <Typography variant="body1" textAlign="center" sx={{ color: 'lightgray' }}>
            No events
          </Typography>
        )}
        {(events as unknown as IEvent[]).map((event, index) => {
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
    </Container>
  );
}
