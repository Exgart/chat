import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Box, LinearProgress } from '@mui/material'

const LoginPage = lazy(() => import('pages/Login'))
const RegistrationPage = lazy(() => import('pages/Register'))
const HomePage = lazy(() => import('pages/Home'))
const RoomPage = lazy(() => import('pages/Room'))

const routes = {
  login: '/login',
  register: '/register',
}

function AuthRoutes() {
  return (
    <Suspense 
      fallback={
        <Box>
          <LinearProgress />
        </Box>
      }>
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='rooms/:roomId' element={<RoomPage />}/>
        <Route path='*' element={<Navigate replace to='/' />} />
      </Routes>
    </Suspense>
  )
}

function UnauthRoutes() {
  return (
    <Suspense
      fallback={
        <Box>
          <LinearProgress />
        </Box>
      }>
      <Routes>
        <Route path={routes.login} element={<LoginPage/>} />
        <Route path={routes.register} element={<RegistrationPage/>} />
        <Route path='*' element={<Navigate replace to={routes.login} />} />
      </Routes>
    </Suspense>
  )
}

export { routes, AuthRoutes, UnauthRoutes }
