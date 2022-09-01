import {
  Logout,
  Menu as MenuIcon,
  Settings,
  FormatListBulleted,
} from '@mui/icons-material'
import {
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  useMediaQuery,
} from '@mui/material'
import { useRef, useState } from 'react'
import { logout } from 'services/firebase/auth'

import { observer } from 'mobx-react-lite'
import modalsStore from 'store/modalsStore'
import userStore from 'store/userStore'
import { useNavigate } from 'react-router-dom'

const menuPaperProps = {
  elevation: 0,
  sx: {
    overflow: 'visible',
    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
    mt: 1.5,
    '& .MuiAvatar-root': {
      width: 32,
      height: 32,
      ml: -0.5,
      mr: 1,
    },
    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      width: 10,
      height: 10,
      bgcolor: 'background.paper',
      transform: 'translateY(-50%) rotate(45deg)',
      zIndex: 0,
    },
  },
}

function AccountMenu() {
  const navigate = useNavigate()
  const matches = useMediaQuery('(max-width:1200px)')
  const anchorEl = useRef(null)
  const [open, toggleOpen] = useState(false)
  const { user } = userStore
  const { openProfileSettings } = modalsStore

  const handleClick = () => {
    toggleOpen(true)
  }

  const handleClose = () => {
    toggleOpen(false)
  }

  return (
    <>
      <Tooltip title='Account settings'>
        <IconButton
          ref={anchorEl}
          onClick={handleClick}
          size='small'
          color='inherit'
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
        >
          <MenuIcon />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl.current}
        id='account-menu'
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          ...menuPaperProps,
          ...{
            left: matches ? 28 : 'auto',
            right: !matches ? 14 : 'auto',
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <Avatar src={user && user?.img} /> {user && user.username}
        </MenuItem>
        <Divider />

        <MenuItem onClick={() => navigate('/', { replace: true })}>
          <ListItemIcon>
            <FormatListBulleted fontSize='small' />
          </ListItemIcon>
          Rooms
        </MenuItem>

        <MenuItem onClick={openProfileSettings}>
          <ListItemIcon>
            <Settings fontSize='small' />
          </ListItemIcon>
          Edit profile
        </MenuItem>

        <MenuItem onClick={logout}>
          <ListItemIcon>
            <Logout fontSize='small' />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  )
}

export default observer(AccountMenu)
