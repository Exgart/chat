import { AuthRoutes, UnauthRoutes } from 'routes'
import { Box, LinearProgress } from '@mui/material'
import { auth } from 'services/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useEffect } from 'react'
import { initCurrentUserStatusObserver } from 'services/firebase/user'

function App() {
  const [user, loading] = useAuthState(auth)

  useEffect(() => {
    if (!user) return

    initCurrentUserStatusObserver()
  }, [user])

  if (loading) {
    return (
      <Box>
        <LinearProgress />
      </Box>
    )
  }

  return user ? <AuthRoutes /> : <UnauthRoutes />
}

export default App
