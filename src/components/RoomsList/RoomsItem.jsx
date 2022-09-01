import { Group } from '@mui/icons-material'
import {
  Badge,
  ListItem,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from '@mui/material'
import { Link } from 'react-router-dom'

function RoomsItem({ roomId, name, membersCount }) {
  return (
    <ListItem disablePadding>
      <ListItemButton
        LinkComponent={Link}
        to={`rooms/${roomId}`}
      >
        <ListItemText
          primary={
            <Typography
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                pr: 2.5,
              }}
              title={name}
            >
              {name}
            </Typography>
          }
        />
        <ListItemSecondaryAction>
          <Badge 
            sx={{color: 'primary.main'}}
            badgeContent={membersCount}
            showZero={true}
            max={99}
          >
            <Group sx={{color: 'primary.dark'}} />
          </Badge>
        </ListItemSecondaryAction>
      </ListItemButton>
    </ListItem>
  )
}

export default RoomsItem
