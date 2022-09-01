import { Box, CircularProgress, List } from '@mui/material'
import { collection } from 'firebase/firestore'
import { useCollection } from 'react-firebase-hooks/firestore'
import { firestoreDB } from 'services/firebase'
import RoomsItem from './RoomsItem'

function RoomsList() {
  const [rooms, loading] = useCollection(collection(firestoreDB, 'rooms'))

  if (loading) {
    return (
      <Box sx={{ display: 'flex', height: 100 }}>
        <CircularProgress sx={{ m: 'auto' }} />
      </Box>
    )
  }
  return (
    <List>
      {rooms.docs.map((room) => {
        const {name, members} = room.data()
        
        return (
          <RoomsItem
            key={room.id}
            roomId={room.id}
            name={name}
            membersCount={members?.length || 0}
          />
        )
      })}
    </List>
  )
}

export default RoomsList
