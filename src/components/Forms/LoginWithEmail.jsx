import { Box, Button, TextField } from '@mui/material'
import PasswordField from 'components/UI/Inputs/Password'
import Snackbar from 'components/UI/Snackbar/Snackbar'
import { useState } from 'react'
import { signInWithEmail } from 'services/firebase/auth'
import { object, string } from 'yup'

const loginSchema = object({
  email: string().required().email(),
  password: string().required(),
})

function LoginWithEmail() {
  const [submiting, setSubmiting] = useState(false)
  const [values, setValues] = useState({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    auth: '',
  })

  function handleSubmit(event) {
    event.preventDefault()

    try {
      loginSchema.validateSync(values, { abortEarly: false })
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

    signInWithEmail(values.email, values.password)
      .catch((e) => setErrors({ auth: 'Invalid email or password' }))
      .finally(() => setSubmiting(false))
  }

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

  return (
    <>
      <Snackbar
        open={!!errors.auth}
        severity='error'
        children={errors.auth}
        autoHideDuration={3000}
        onClose={() => setErrors({ ...errors, auth: '' })}
      />
      <Box
        component='form'
        onSubmit={handleSubmit}
        autoComplete='off'
        noValidate
        flexDirection='column'
      >
        <TextField
          value={values.email}
          variant='standard'
          placeholder='Email'
          fullWidth
          onChange={handleChange('email')}
          sx={{ mb: 2 }}
          autoFocus
          error={!!errors.email}
          helperText={errors.email || ' '}
        />

        <PasswordField
          onChange={handleChange('password')}
          value={values.password}
          error={!!errors.password}
          errorText={errors.password}
          helperText=' '
        />

        <Button
          variant='contained'
          fullWidth
          type='submit'
          sx={{ mt: 6 }}
          disabled={submiting}
          color='success'
        >
          Login
        </Button>
      </Box>
    </>
  )
}

export default LoginWithEmail
