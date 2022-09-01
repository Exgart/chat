import { useRef, useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  Input,
} from '@mui/material'

function PasswordField({
  value,
  helperText,
  error = false,
  errorText,
  onChange,
}) {
  const [showPassword, setShowPassword] = useState(false)
  const inputRef = useRef()

  const iconButtonClickHandler = () => {
    setShowPassword(!showPassword)
    inputRef.current.focus()
  }

  return (
    <FormControl
      fullWidth
      margin='dense'
      error={!!error}
    >
      <Input
        inputRef={inputRef}
        id='password'
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        placeholder='Password'
        endAdornment={
          <InputAdornment position='end'>
            <IconButton
              aria-label='toggle password visibility'
              onClick={iconButtonClickHandler}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
      {(helperText || errorText) && (
        <FormHelperText variant='standard'>
          {errorText || helperText}
        </FormHelperText>
      )}
    </FormControl>
  )
}

export default PasswordField
