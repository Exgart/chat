import {
  Badge,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  ListItemSecondaryAction 
} from '@mui/material'
import { ref, query, orderByChild, equalTo } from 'firebase/database'
import { useEffect, useState } from 'react'
import { useList } from 'react-firebase-hooks/database'
import { realtimeDB } from 'services/firebase'
import PulsatingDots from 'components/UI/PulsatingDots/FlashingDots'
import UserAvatar from 'components/UserAvatar/UserAvatar'

function UsersListItem({ username }) {
  const [userData, setUserData] = useState()
  const [user, loading] = useList(
    query(ref(realtimeDB, 'users'), orderByChild('username'), equalTo(username))
  )

  useEffect(() => {
    console.log(user);
    if (!loading && user) {
      setUserData(user[0].val())
    }
  }, [user, loading])

  return (
    <ListItem sx={{ opacity: userData?.status === 'offline' ? 0.5 : 1 }}>
      <ListItemAvatar>
        <Badge
          overlap='circular'
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant='dot'
          color={userData?.status === 'offline' ? 'error' : 'success'}
          sx={{
            '.MuiBadge-dot': {
              border: '1px solid',
              borderColor: 'background.paper',
            },
          }}
        >
          <UserAvatar
            username={username}
            img={userData?.img}
          />
        </Badge>
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography
            component='div'
            variant='body2'
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
            title={username}
          >
            {username}
          </Typography>
        }
      />
      <ListItemSecondaryAction>{userData?.isTyping ? <PulsatingDots /> : ' '}</ListItemSecondaryAction>
    </ListItem>
  )
}

export default UsersListItem
