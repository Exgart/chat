import { auth } from '.'
import { getUserById, updateCurrentUser, updateUser } from './user'
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth'

async function createNewUserWithEmail({ username, email, password }) {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password)
    return await updateUser(user.uid, {
      id: user.uid,
      username: username,
      email,
    })
  } catch (error) {
    throw error
  }
}

async function signInWithEmail(email, password) {
  try {
    return await signInWithEmailAndPassword(auth, email, password)
  } catch (error) {
    throw error
  }
}

async function signInWithGoogle() {
  const provider = new GoogleAuthProvider()
  try {
    const { user } = await signInWithPopup(auth, provider)
    const userFromDb = await getUserById(user.uid)

    if (!userFromDb) {
      updateUser(user.uid, {
        id: user.uid,
        username: user.displayName,
        email: user.email,
        img: user.photoURL
      })
    }
  } catch (error) {
    throw error
  }
}

function logout() {
  updateCurrentUser({status: 'offline'})
  signOut(auth)
}

export { createNewUserWithEmail, signInWithEmail, signInWithGoogle, logout }
