import { IconButton, Modal, Box } from '@mui/material'
import { CloseOutlined } from '@mui/icons-material'
import { observer } from 'mobx-react-lite'
import modalsStore from 'store/modalsStore'
import { useEffect } from 'react'
import ProfileSettings from 'components/ProfileSettings/ProfileSettings'

const modalInnerStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 420,
  width: '100%',
  bgcolor: 'background.paper',
  boxShadow: 4,
  pt: 2,
  px: 4,
  pb: 3,
}

function ProfileSettingsModal() {  
  const { isProfileSettingsOpen, closeProfileSettings } = modalsStore

  return (
    <Modal open={isProfileSettingsOpen}>
      <Box sx={modalInnerStyle}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Settings
          <IconButton
            onClick={closeProfileSettings}
            sx={{ ml: 'auto' }}
          >
            <CloseOutlined />
          </IconButton>
        </Box>
        <Box>
          <ProfileSettings />
        </Box>
      </Box>
    </Modal>
  );
};

export default observer(ProfileSettingsModal)