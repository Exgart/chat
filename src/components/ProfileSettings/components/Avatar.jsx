import { CameraswitchOutlined } from '@mui/icons-material'
import {
  Box,
  ButtonBase,
  Chip,
  CircularProgress,
  Avatar as AvatarImg,
} from '@mui/material'
import Snackbar from 'components/UI/Snackbar/Snackbar'
import { useRef, useState } from 'react'
import { ref, getDownloadURL } from 'firebase/storage'
import { storage } from 'services/firebase'
import { useUploadFile } from 'react-firebase-hooks/storage'

const MAX_AVATAR_SIZE_MB = 1

function Avatar({user, update}) {
  const [fileSizeError, setFileSizeError] = useState(false)
  const inputRef = useRef()
  const [uploadFile, uploading] = useUploadFile()

  function handleChange(e) {
    const [file] = [...e.target.files]

    if (file.size > MAX_AVATAR_SIZE_MB * 1024 * 1024) {
      setFileSizeError(true)
      e.target.value = ''
      return
    }
    const fileRef = ref(storage, `users/${user.id}/${file.name}`)

    uploadFile(fileRef, file).then(() => {
      getDownloadURL(fileRef).then((imgUrl) => {
        update({ img: imgUrl })
      })
    })
  }

  return (
    <>
      <Snackbar
        open={fileSizeError}
        autoHideDuration={5000}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        onClose={() => setFileSizeError(false)}
        severity='warning'
      >
        Max size
        {
          <Chip
            label={`${(MAX_AVATAR_SIZE_MB).toFixed()} MB`}
            size='small'
          />
        }
      </Snackbar>

      <Box
        display='flex'
        justifyContent='center'
      >
        <Box
          sx={{
            width: 96,
            height: 96,
          }}
          position='relative'
        >
          <AvatarImg
            src={user?.img}
            sx={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '1px solid transparent',
              boxShadow: 4,
            }}
          />
          <Box
            sx={{
              width: 32,
              height: 32,
              right: 0,
              bottom: 0,
              borderRadius: '50%',
              backgroundColor: 'secondary.main',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            position='absolute'
          >
            <ButtonBase
              component='label'
              focusRipple
              onKeyDown={(e) => e.keyCode === 32 && inputRef.current?.click()}
            >
              <CameraswitchOutlined />
              <input
                ref={inputRef}
                type='file'
                hidden
                accept='image/*'
                onChange={handleChange}
              />
            </ButtonBase>
          </Box>

          {uploading && (
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <CircularProgress color='secondary' />
            </Box>
          )}
        </Box>
      </Box>
    </>
  )
}

export default Avatar
