import { Box, Container, Divider, Link, Paper, Typography } from '@mui/material'
import LoginWithEmail from 'components/Forms/LoginWithEmail'
import LoginWithProviders from 'components/Forms/LoginWithProviders'
import { Link as RouterLink } from 'react-router-dom'
import { routes } from 'routes'

function Login() {
  return (
    <Container sx={{ display: 'flex', minHeight: '100%' }}>
      <Paper sx={{ m: 'auto', maxWidth: 360 }}>

        <Box sx={{ p: 3 }}>
          <Typography
            variant='h3'
            component='h1'
            textAlign='center'
          >
            Welcome
          </Typography>
        </Box>

        <Divider />

        <Box p={5}>
          <LoginWithEmail />

          <Typography
            textAlign='center'
            mt={2}
          >
            Don&apos;t have an account?{' '}
            <Link
              to={routes.register}
              component={RouterLink}
              underline='none'
            >
              Register
            </Link>
          </Typography>

          <Divider
            component='div'
            sx={{ m: 2, opacity: 0.5 }}
          >
            or sign in with
          </Divider>
          
          <LoginWithProviders />
        </Box>
      </Paper>
    </Container>
  )
}

export default Login
