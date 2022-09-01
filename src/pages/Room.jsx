import PeopleIcon from '@mui/icons-material/People'
import {
  Box,
  CircularProgress,
  Divider,
  Drawer,
  IconButton,
  useMediaQuery,
} from '@mui/material'
import Chat from 'components/Chat/Chat'
import Layout from 'components/Layout/Layout'
import UsersList from 'components/UsersList/UsersList'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { isRoomExists } from 'services/firebase/chat'
import userStore from 'store/userStore'

function Room() {
  const [existenceChecking, setExistenceChecking] = useState(true)
  const [mobileUserListOpen, setMobileUserListOpen] = useState(false)
  const { user, isLoading: isUserLoading } = userStore
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'))
  const navigate = useNavigate()
  const { roomId } = useParams()

  const handleMobileUserListToggle = () => {
    setMobileUserListOpen(!mobileUserListOpen)
  }

  useEffect(() => {
    isRoomExists(roomId).then((exists) => {
      if (!exists) {
        navigate('/', { replace: true })
      } else {
        setExistenceChecking(false)
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (existenceChecking) {
    return (
      <Box sx={{ height: '100%', display: 'flex' }}>
        <CircularProgress sx={{ m: 'auto' }} />
      </Box>
    )
  }

  return (
    <Layout>
      <Box sx={{ height: '100%', display: 'flex', gap: 2 }}>
        {/* ASIDE */}

        {isMobile ? (
          <Drawer
            open={mobileUserListOpen}
            onClose={handleMobileUserListToggle}
            sx={{ '& .MuiDrawer-paper': { width: '60%' } }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            <AsideContent roomId={roomId} />
          </Drawer>
        ) : (
          <Box
            sx={{
              width: { sm: '35%', lg: '25%' },
              height: '100%',
              bgcolor: 'background.paper',
              display: isMobile ? 'none' : 'block',
            }}
          >
            <AsideContent roomId={roomId} />
          </Box>
        )}

        {/* CONTENT */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            width: { xs: '100%', md: 'auto' },
            height: '100%',
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            boxShadow: 8,
          }}
        >
          {isMobile && (
            <Box
              sx={{
                width: '100%',
                bgcolor: 'background.default',
              }}
            >
              <IconButton
                aria-label='room users list'
                color='secondary'
                onClick={() => setMobileUserListOpen(true)}
              >
                <PeopleIcon fontSize='small' />
              </IconButton>
            </Box>
          )}
          <Box
            sx={{
              height: { xs: 'calc(100% - 36px)', md: '100%' },
              bgcolor: '#263238',
            }}
          >
            {!isUserLoading && user && (
              <Chat
                roomId={roomId}
                user={user}
              />
            )}
          </Box>
        </Box>
      </Box>
    </Layout>
  )
}

function AsideContent({ roomId }) {
  return (
    <>
      <Box sx={{p: 1}}>
        <PeopleIcon />
      </Box>
      <Divider sx={{ mb: 2 }} />
      <Box
        sx={{ height: '100%', overflowY: 'scroll' }}
        className='hide-scrollbar'
      >
        <UsersList roomId={roomId} />
      </Box>
    </>
  )
}

export default observer(Room)
