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
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import vava from 'assets/map.png';

interface iProps {
  event: any;
  expanded: boolean;
  handleExpandClick: () => void
}

export default function EventCard({ expanded, handleExpandClick, event }: iProps) {
  return (
    <Card elevation={4}>
      <CardHeader
        avatar={<EventIcon color="primary" />}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardMedia component="img" height="134" image={vava} alt="Paella dish" />
        <CardContent>
          <Typography variant="body2">
            This impressive paella is a perfect party dish and a fun meal to cook
            together with your guests. Add 1 cup of frozen peas along with the
            mussels, if you like.
          </Typography>
        </CardContent>
      </Collapse>
      <CardActions disableSpacing>
        <IconButton aria-label="edit" color="primary">
          <EditIcon />
        </IconButton>
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
