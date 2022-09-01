import { Divider } from '@mui/material'
import { observer } from 'mobx-react-lite'
import userStore from 'store/userStore'
import Avatar from './components/Avatar'
import Username from './components/Username'

function ProfileSettings() {
  const { user, update } = userStore

  return (
    <>
      <Avatar
        user={user}
        update={update}
      />
      <Divider sx={{ mt: 2, mb: 3 }} />
    </>
  )
}

export default observer(ProfileSettings)
