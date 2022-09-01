import { Box, IconButton, TextField, useMediaQuery } from '@mui/material'
import { Send } from '@mui/icons-material'
import { useEffect, useRef, useState } from 'react'

function MessageInput({ onChange, onSubmit }) {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'))
  const textFieldRef = useRef()
  const [value, setValue] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()

    if (value.trim()) {
      if (onSubmit) onSubmit(value)
      setValue('')
    }
  }

  const keyDownHandler = (e) => {
    if (!isMobile && !e.ctrlKey && e.key === 'Enter') {
      submitHandler(e)
    }

    // line breake on ctrl+enter
    if (e.ctrlKey && e.key === 'Enter') {
      const { selectionStart, selectionEnd } = e.target
      const start = e.target.value.substring(0, selectionStart)
      const end = e.target.value.substring(selectionEnd)
      const val = start + '\r\n' + end
      e.target.value = val
      setValue(val)
    }
  }

  useEffect(() => {
    if (!onChange) return
    onChange(value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return (
    <Box
      component='form'
      sx={{
        bgcolor: '#212121',
        display: 'flex',
        minHeight: '100%',
      }}
      onSubmit={submitHandler}
    >
      <TextField
        inputRef={textFieldRef}
        value={value}
        variant='standard'
        placeholder='Type a message...'
        InputProps={{
          disableUnderline: true,
        }}
        sx={{ p: 1, height: '100%' }}
        minRows={3}
        maxRows={8}
        multiline
        fullWidth
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={keyDownHandler}
      />
      <IconButton
        sx={{
          width: { xs: 50, md: 100 },
          borderRadius: 0,
          bgcolor: 'primary.main',
        }}
        type='submit'
        onClick={() => textFieldRef.current.focus()}
      >
        <Send />
      </IconButton>
    </Box>
  )
}

export default MessageInput
