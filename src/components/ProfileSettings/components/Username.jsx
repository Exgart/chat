import { PublishedWithChanges } from '@mui/icons-material'
import {
  Box,
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { getUserByUsername } from 'services/firebase/user'

function Username({ user, update }) {
  const [value, setValue] = useState(user.username)
  const [error, setError] = useState()

  function handleChange(e) {
    setValue(e.target.value)
    setError('')
  }

  function handleClick() {
    if (value === user.username) return

    getUserByUsername(value).then((result) => {
      if (!result) {
        update({ username: value })
      } else {
        setError('Username is busy')
      }
    })
  }

  return (
    <Box>
      <Typography
        mb={1}
        sx={{ opacity: 0.5, mb: 0 }}
      >
        Username
      </Typography>
      <FormControl
        fullWidth
        error={!!error}
      >
        <Input
          sx={{ p: .5 }}
          variant='standard'
          onChange={handleChange}
          defaultValue={user.username}
          endAdornment={
            <InputAdornment position='end'>
              <IconButton onClick={handleClick}>
                <PublishedWithChanges />
              </IconButton>
            </InputAdornment>
          }
        />

        <FormHelperText variant='standard'>{error || ' '}</FormHelperText>
      </FormControl>
    </Box>
  )
}

export default Username
