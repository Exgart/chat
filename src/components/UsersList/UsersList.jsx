import { List } from '@mui/material'
import { doc } from 'firebase/firestore'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { firestoreDB } from 'services/firebase'
import UsersListItem from './UsersListItem'

function UsersList({ roomId }) {
  const [roomData, loading] = useDocumentData(doc(firestoreDB, 'rooms', roomId))

  return (
    <List>
      {!loading &&
        roomData &&
        roomData.members &&
        roomData.members.map((username) => (
          <UsersListItem
            key={username}
            username={username}
          />
        ))}
    </List>
  )
}



export default UsersList
