import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  IconButton,
  Typography,
} from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import vava from 'assets/map.png';
import { IEvent } from 'types/events';

interface iProps {
  event: IEvent;
  expanded: boolean;
  handleExpandClick: () => void;
}

export default function EventCard({ expanded, handleExpandClick, event }: iProps) {
  return (
    <Card elevation={4}>
      <CardHeader
        avatar={<EventIcon color="primary" />}
        title={event.title}
        subheader={dayjs(event.date).utc(true).format('MMMM DD, YYYY, hh:mmA')}
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardMedia
          component="img"
          height="134"
          image={event.image as string | undefined || vava}
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2">{event.description}</Typography>
        </CardContent>
      </Collapse>
      <CardActions disableSpacing>
        <Link to={`/event/edit/${event.id}`}>
          <IconButton aria-label="edit" color="primary">
            <EditIcon />
          </IconButton>
        </Link>
        <IconButton aria-label="delete" color="error">
          <DeleteIcon />
        </IconButton>
        <IconButton
          aria-expanded={expanded}
          aria-label="show more"
          onClick={handleExpandClick}
          sx={{
            marginLeft: 'auto',
            transform: !expanded ? 'rotate(0deg)' : 'rotate(180deg)',
            transition: 'transform .3s ease',
          }}
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
