import { Box, Container } from '@mui/material'
import Header from 'components/Header/Header'
import ProfileSettingsModal from 'components/Modals/ProfileSettingsModal/ProfileSettingsModal'
import AccountMenu from 'components/AccountMenu/AccountMenu'
import { useEffect, useRef, useState } from 'react'

function Layout({ children }) {
  const headerRef = useRef()
  const [headerHeight, setHeaderHeight] = useState(0)

  useEffect(() => {
    setHeaderHeight(getComputedStyle(headerRef.current).height)
  }, [])

  return (
    <>
      <Header ref={headerRef}>
        <AccountMenu />
      </Header>
      <Box sx={{ height: `calc(100% - ${headerHeight})` }}>
        <Container sx={{ height: '100%' }}>{children}</Container>
      </Box>

      <ProfileSettingsModal />
    </>
  )
}

export default Layout
