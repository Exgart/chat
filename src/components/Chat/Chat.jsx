import MessageInput from 'components/MessageInput/MessageInput'
import MessageList from 'components/MessagesList/MessageList'
import {
  addMessage,
  addUserToRoom,
  isUserARoomMember,
} from 'services/firebase/chat'

import { useEffect, useRef, useState } from 'react'
import { Box, Button, CircularProgress } from '@mui/material'
import { updateCurrentUser } from 'services/firebase/user'

function Chat({ roomId, user }) {
  const [typing, setTyping] = useState(false)
  const typingTimeoutRef = useRef()
  const [isUserAMember, setIsUserAMember] = useState({
    loading: true,
    joined: null,
  })

  const messageInputSubmitHandler = (text) => {
    addMessage(roomId, {
      username: user.username,
      text,
    })
  }

  const messageInputChangeHandler = (val) => {
    clearTimeout(typingTimeoutRef.current)
    if (val.trim()) {
      setTyping(true)
      typingTimeoutRef.current = setTimeout(() => setTyping(false), 1000)
    } else {
      setTyping(false)
    }
  }

  useEffect(() => {
    if (typing) {
      updateCurrentUser({isTyping: true})
    } else {
      updateCurrentUser({isTyping: false})
    }
  }, [typing])

  const handleJoinClick = () => {
    addUserToRoom(roomId, user.username)
    setIsUserAMember({ ...isUserAMember, joined: true })
  }

  useEffect(() => {
    isUserARoomMember(roomId, user.username).then((result) => {
      setIsUserAMember({
        loading: false,
        joined: result,
      })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {user && (
        <MessageList
          roomId={roomId}
          user={user}
        />
      )}

      <Box sx={{ mt: 'auto' }}>
        {isUserAMember.loading && (
          <Box sx={{ display: 'flex', height: 100 }}>
            <CircularProgress sx={{ m: 'auto' }} />
          </Box>
        )}

        {!isUserAMember.loading && isUserAMember.joined && (
          <MessageInput
            onSubmit={messageInputSubmitHandler}
            onChange={messageInputChangeHandler}
          />
        )}

        {!isUserAMember.loading && !isUserAMember.joined && (
          <Button
            sx={{ height: { xs: 100, md: 150 } }}
            variant='contained'
            color='primary'
            fullWidth
            onClick={handleJoinClick}
          >
            Join the room
          </Button>
        )}
      </Box>
    </Box>
  )
}

export default Chat
