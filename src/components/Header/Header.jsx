import { AppBar, Container } from '@mui/material'
import { forwardRef } from 'react'

function Header({ children }, ref) {
  return (
    <AppBar
      sx={{ py: 2 }}
      position='static'
      ref={ref}
    >
      <Container sx={{ display: 'flex', alignItems: 'center' }}>
        {children}
      </Container>
    </AppBar>
  )
}

export default forwardRef(Header)
