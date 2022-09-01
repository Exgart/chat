import { Avatar } from '@mui/material'
import { useEffect, useState } from 'react'

function UserAvatar({ img, username }) {
  const [avatarProps, setAvatarProps] = useState()

  useEffect(() => {
    if (!img) {
      setAvatarProps({
        sx: { bgcolor: 'secondary.main' },
        children: username[0].toUpperCase(),
      })
    } else {
      setAvatarProps({
        src: img,
        alt: username,
      })
    }
  }, [img, username])

  return <Avatar {...avatarProps} />
}

export default UserAvatar
