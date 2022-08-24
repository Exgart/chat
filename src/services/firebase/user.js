import { auth, database } from '.'
import {
  ref,
  get,
  query,
  orderByChild,
  equalTo,
  update,
  onValue,
  onDisconnect,
} from 'firebase/database'

async function getUserByUsername(username) {
  const q = query(
    ref(database, 'users'),
    orderByChild('username'),
    equalTo(username)
  )
  const result = await get(q)

  return result.val()
}

async function getUserById(id) {
  const result = await get(ref(database, `users/${id}`))

  return result.val()
}

async function updateUser(id, values) {
  const user = `users/${id}`

  try {
    return await update(ref(database, user), values)
  } catch (error) {
    throw error
  }
}

function initCurrentUserStatusObserver() {
  const id = auth.currentUser?.uid
  const connectedRef = ref(database, '.info/connected')
  const statusRef = ref(database, `users/${id}/status`)

  onValue(connectedRef, (snap) => {
    if (snap.val()) {
      onDisconnect(statusRef).set('offline')
      updateUser(id, { status: 'online' })
    } else {
      updateUser(id, { status: 'offline' })
    }
  })
}

async function getCurrentUserData() {
  if (!auth.currentUser?.uid) return null
  return await getUserById(auth.currentUser.uid)
}

async function updateCurrentUser(values) {
  if (!auth.currentUser?.uid) return null
  return await updateUser(auth.currentUser.uid, values)
}

export {
  getUserByUsername,
  getUserById,
  updateUser,
  initCurrentUserStatusObserver,
  getCurrentUserData,
  updateCurrentUser,
}
