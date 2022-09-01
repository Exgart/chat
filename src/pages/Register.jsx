import { Box, Container, Divider, Link, Paper, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import RegisterWithEmail from 'components/Forms/RegisterWithEmail'
import { routes } from 'routes'

function Register() {
  return (
    <Container sx={{ display: 'flex', minHeight: '100%' }}>
      <Paper sx={{ m: 'auto', maxWidth: 360 }}>
        <Box sx={{ p: 3 }}>
          <Typography
            variant='h3'
            component='h1'
            textAlign='center'
          >
            Create new account
          </Typography>
        </Box>

        <Divider />

        <Box p={5}>
          <RegisterWithEmail />

          <Typography
            textAlign='center'
            mt={2}
          >
            Already have one?{' '}
            <Link
              to={routes.login}
              component={RouterLink}
              underline='none'
            >
              Sign in
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  )
}

export default Register
