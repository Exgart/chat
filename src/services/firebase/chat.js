import {
  collection,
  setDoc,
  addDoc,
  doc,
  serverTimestamp,
  deleteDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
} from 'firebase/firestore'
import { firestoreDB } from '.'

async function addMessage(roomId, { username, text, imgSrc = null }) {
  const roomMessagesRef = collection(firestoreDB, 'rooms', roomId, 'messages')

  try {
    await addDoc(roomMessagesRef, {
      username,
      createdAt: serverTimestamp(),
      text,
      imgSrc,
    })
  } catch (error) {
    console.log(error)
  }
}

async function removeMessage(roomId, messageId) {
  try {
    await deleteDoc(doc(firestoreDB, 'rooms', roomId, 'messages', messageId))
  } catch (error) {
    console.log(error)
  }
}

async function addUserToRoom(roomId, username) {
  const roomRef = doc(firestoreDB, 'rooms', roomId)

  try {
    await updateDoc(roomRef, {
      members: arrayUnion(username),
    })
  } catch (error) {
    await setDoc(roomRef, {
      members: arrayUnion(username),
    })
  }
}

async function removeUserFromRoom(roomId, username) {
  const roomRef = doc(firestoreDB, 'rooms', roomId)

  try {
    await updateDoc(roomRef, {
      members: arrayRemove(username),
    })
  } catch (error) {
    console.log(error)
  }
}

async function getRoomMembers(roomId) {
  const roomRef = doc(firestoreDB, 'rooms', roomId)

  try {
    const room = await getDoc(roomRef)
    const roomData = room.data()

    if (roomData?.members) {
      return roomData.members
    }

    return null
  } catch (error) {
    console.log(error)
  }
}

async function isUserARoomMember(roomId, username) {
  try {
    const members = await getRoomMembers(roomId)

    if (members) {
      return !!members.find((name) => name === username)
    }

    return false
  } catch (error) {
    console.log(error)
  }
}

async function isRoomExists(roomId) {
  const roomRef = doc(firestoreDB, 'rooms', roomId)  
  const room = await getDoc(roomRef)
  return room.exists()
}

export {
  addMessage,
  addUserToRoom,
  removeUserFromRoom,
  getRoomMembers,
  removeMessage,
  isUserARoomMember,
  isRoomExists
}
