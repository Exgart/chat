import { auth, realtimeDB } from '.'
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
    ref(realtimeDB, 'users'),
    orderByChild('username'),
    equalTo(username)
  )
  const result = await get(q)

  if (result.val()) {
    return Object.values(result.val())[0]
  } else {
    return null
  }
}

async function getUserById(id) {
  const result = await get(ref(realtimeDB, `users/${id}`))

  return result.val()
}

async function updateUser(id, values) {
  const user = `users/${id}`

  try {
    return await update(ref(realtimeDB, user), values)
  } catch (error) {
    throw error
  }
}

function initCurrentUserStatusObserver() {
  const id = auth.currentUser?.uid
  const connectedRef = ref(realtimeDB, '.info/connected')
  const statusRef = ref(realtimeDB, `users/${id}/status`)

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
