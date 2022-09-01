import { Box, Button } from '@mui/material'
import { Google } from '@mui/icons-material'
import { signInWithGoogle } from 'services/firebase/auth'

const buttons = [
  {
    icon: <Google />,
    onClick: signInWithGoogle,
    text: 'Google',
  },
]

function LoginWithProviders() {
  return (
    <Box flexDirection='column'>
      {buttons.map((btn, i) => (
        <Button
          key={i}
          onClick={btn.onClick}
          startIcon={btn.icon}
          variant='outlined'
          fullWidth
        >
          {btn.text}
        </Button>
      ))}
    </Box>
  )
}

export default LoginWithProviders
