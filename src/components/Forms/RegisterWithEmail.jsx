import { Box, Button, TextField } from '@mui/material'
import PasswordField from 'components/UI/Inputs/Password'
import { useState } from 'react'
import { object, string } from 'yup'
import { createNewUserWithEmail } from 'services/firebase/auth'
import { getUserByUsername } from 'services/firebase/user'

const registerSchema = object({
  username: string().min(3, 'Username to short').required(),
  email: string().required().email(),
  password: string().min(6).required(),
})

function RegisterWithEmail() {
  const [submiting, setSubmiting] = useState(false)
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
  })

  function handleChange(prop) {
    return (event) => {
      setValues({
        ...values,
        [prop]: event.target.value.trim(),
      })
      setErrors({
        ...errors,
        [prop]: '',
      })
    }
  }

  function handleSubmit(event) {
    event.preventDefault()

    try {
      registerSchema.validateSync(values, { abortEarly: false })
    } catch (e) {
      const validationErrors = {}

      for (const errorInfo of e.inner) {
        validationErrors[errorInfo.path] = errorInfo.message
      }

      setErrors({
        ...errors,
        ...validationErrors,
      })

      return
    }

    setSubmiting(true)

    getUserByUsername(values.username)
      .then((user) => {
        if (user) {
          setErrors({ username: `${values.username} is busy` })
        } else {
          createNewUserWithEmail({ ...values }).catch((e) => {
            switch (e.code) {
              case 'auth/invalid-email':
                setErrors({ email: 'Invalid email' })
                break

              default:
                break
            }
          })
        }
      })
      .finally(() => setSubmiting(false))
  }

  return (
    <Box
      component='form'
      onSubmit={handleSubmit}
      autoComplete='off'
      noValidate
      flexDirection='column'
    >
      <TextField
        value={values.username}
        variant='standard'
        placeholder='Username'
        fullWidth
        onChange={handleChange('username')}
        sx={{ mb: 1 }}
        autoFocus
        error={!!errors.username}
        helperText={errors.username || ' '}
      />
      <TextField
        value={values.email}
        variant='standard'
        placeholder='Email'
        type='email'
        fullWidth
        onChange={handleChange('email')}
        sx={{ mb: 1 }}
        error={!!errors.email}
        helperText={errors.email || ' '}
      />
      <PasswordField
        onChange={handleChange('password')}
        value={values.password}
        error={!!errors.password}
        errorText={errors.password}
        helperText='Minimum length is 6 characters.'
      />

      <Button
        variant='contained'
        fullWidth
        type='submit'
        sx={{ mt: 4 }}
        disabled={submiting}
        color='success'
      >
        Register
      </Button>
    </Box>
  )
}

export default RegisterWithEmail