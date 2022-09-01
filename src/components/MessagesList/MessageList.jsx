import { ArrowDownward } from '@mui/icons-material'
import { Box, IconButton } from '@mui/material'
import Message from 'components/Message/Message'
import { collection, orderBy, query } from 'firebase/firestore'
import { useEffect, useRef, useState, memo } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { firestoreDB } from 'services/firebase'
import { removeMessage } from 'services/firebase/chat'

function MessageList({ roomId, user }) {
  const [canScrollToLastMessage, setCanScrollToLastMessage] = useState(true)
  const [hideScrollDownArrow, setHideScrollDownArrow] = useState(true)
  const [messages, messagesIsLoading] = useCollection(
    query(
      collection(firestoreDB, 'rooms', roomId, 'messages'),
      orderBy('createdAt')
    )
  )
  const containerRef = useRef()

  const scrollToLastMessage = () => {
    const { current } = containerRef
    current.scrollTo(0, current.scrollHeight)
  }

  const handleMessagesScroll = (e) => {
    const { target } = e
    const scrollFromBottom = Math.abs(target.scrollTop - target.scrollHeight + target.clientHeight)
    
    if (scrollFromBottom > target.clientHeight) {
      setHideScrollDownArrow(false)
      setCanScrollToLastMessage(false)
    } else {
      setHideScrollDownArrow(true)
      setCanScrollToLastMessage(true)
    }
  }

  useEffect(() => {
    if (!messagesIsLoading && messages && canScrollToLastMessage) {
      scrollToLastMessage()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages, messagesIsLoading])

  return (
    <Box
      sx={{
        p: { xs: 1, md: 3 },
        overflowY: 'scroll',
        position: 'relative',
        flexGrow: 1,
      }}
      className='hide-scrollbar'
      ref={containerRef}
      onScroll={handleMessagesScroll}
    >
      <Box>
        {user &&
          !messagesIsLoading &&
          messages &&
          messages.docs.map((message) => {
            const { username, text, createdAt } = message.data()
            const time = { h: '', m: '' }

            if (createdAt) {
              const d = new Date(createdAt.seconds * 1000)
              const m = d.getMinutes()
              const h = d.getHours()
              time.h = h < 10 ? `0${h}` : h
              time.m = m < 10 ? `0${m}` : m
            }

            return (
              <Message
                key={message.id}
                username={username}
                text={text}
                time={time}
                isOwnMessage={user.username === username}
                onDeleteClick={() => removeMessage(roomId, message.id)}
              />
            )
          })}
      </Box>

      <IconButton
        sx={{
          bgcolor: 'primary.main',
          p: 2,
          position: 'sticky',
          left: 'calc(100% - 60px)',
          bottom: 40,
          opacity: .5,
        }}
        hidden={hideScrollDownArrow}
        onClick={scrollToLastMessage}
      >
        <ArrowDownward />
      </IconButton>
    </Box>
  )
}

export default memo(MessageList)
