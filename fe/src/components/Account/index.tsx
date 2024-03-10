import { useState, useEffect } from 'react';
import { Button, Container, Paper, Typography } from '@mui/material';
import EventCard from './EventCard';
import { axiosInstance } from 'utils/axios';
import { Endpoints } from 'constants/index';
import handleError from 'utils/errorHandler';

export default function Account() {
  const [events, setEvents] = useState([1, 2]);
  const [expandedIndex, setExpanded] = useState(-1);

  useEffect(() => {
    const getEvents = async () => {
      // axiosInstance.get<any[]>(Endpoints.EVENTS)
      //   .then(res => {
      //     if (res.statusText === 'OK') {
      //       setEvents(res.data);
      //     }
      //   })
      //   .catch(handleError);
      // setEvents([])
    };

    getEvents();
  }, []);

  const handleExpandClick = (index: number) => {
    if (expandedIndex === index) {
      setExpanded(-1);
      return;
    }
    setExpanded(index);
  };

  return (
    <Container
      sx={{
        position: 'relative',
        minWidth: '100%',
        height: '100%',
        padding: 3,
        display: 'grid',
        gridTemplateColumns: '1fr 350px',
        gap: '32px',
      }}
    >
      <Paper sx={{ p: 2 }}>
        <Typography>Account</Typography>
      </Paper>
      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h5" textAlign="center" sx={{ color: 'var(--lightBlue)' }}>
          My events
        </Typography>
        {!events.length && (
          <Typography variant="body1" textAlign="center" sx={{ color: 'lightgray' }}>
            No events
          </Typography>
        )}
        {events.map((event, index) => {
          return (
            <EventCard
              expanded={index === expandedIndex}
              handleExpandClick={() => handleExpandClick(index)}
              event={event}
            />
          );
        })}
        <Button variant="outlined" sx={{ mt: 'auto', mx: 'auto' }}>
          Create event
        </Button>
      </Paper>
    </Container>
  );
}
