import { Box, IconButton, Typography, Fade } from '@mui/material'
import { Delete } from '@mui/icons-material'
import { useState } from 'react'
import UserAvatar from 'components/UserAvatar/UserAvatar'
import { useList } from 'react-firebase-hooks/database'
import { ref, query, orderByChild, equalTo } from 'firebase/database'
import { realtimeDB } from 'services/firebase'

function Message({ username, text, time, isOwnMessage, onDeleteClick }) {
  const [isToolsOpen, toggleToolsOpen] = useState(false)
  const [user, loading] = useList(
    query(ref(realtimeDB, 'users'), orderByChild('username'), equalTo(username))
  )

  const showTools = () => {
    if (isOwnMessage) toggleToolsOpen(true)
  }
  const hideTools = () => toggleToolsOpen(false)

  const contextMenuHandler = (e) => {
    e.preventDefault()
    if (isOwnMessage) showTools()
  }

  return (
    <Box
      onMouseEnter={showTools}
      onMouseLeave={hideTools}
      onContextMenu={contextMenuHandler}
      sx={{
        mb: 5,
        pr: 4,
        position: 'relative',
        maxWidth: 'max-content',
        width: '100%',
      }}
    >
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ mt: 'auto', mr: 1, width: 40, height: 40 }}>
          {!loading && user && (
            <UserAvatar
              username={username}
              img={user[0].val()?.img}
            />
          )}
        </Box>

        <Box
          sx={{
            bgcolor: `${isOwnMessage ? 'primary.dark' : '#37474f'}`,
            px: 2,
            py: 1,
            borderRadius: '16px 16px 16px 0',
            maxWidth: 540,
          }}
        >
          <Typography
            color={isOwnMessage ? 'primary.light' : 'secondary'}
            mb={0.5}
            fontSize='small'
          >
            {isOwnMessage ? 'You' : username}
          </Typography>
          <Typography
            sx={{ fontSize: { xs: 14, md: 16 }, wordBreak: 'break-word' }}
          >
            {text}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ position: 'absolute', bottom: -25, left: 50 }}>
        <Typography variant='caption'>
          {time.h && `${time.h}:${time.m} `}
        </Typography>
      </Box>

      <Fade in={isToolsOpen}>
        <Box
          sx={{
            bgcolor: 'background.paper',
            borderRadius: 4,
            position: 'absolute',
            top: 0,
            right: 0,
          }}
        >
          <IconButton
            onClick={onDeleteClick}
            size='small'
          >
            <Delete fontSize='small' />
          </IconButton>
        </Box>
      </Fade>
    </Box>
  )
}

export default Message
