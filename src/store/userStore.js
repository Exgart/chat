import { makeAutoObservable } from 'mobx'
import { auth } from 'services/firebase'
import { getCurrentUserData, updateCurrentUser } from 'services/firebase/user'

class UserStore {
  isLoading = false
  user = null

  constructor() {
    makeAutoObservable(this)
    auth.onAuthStateChanged(() => {
      this._get()
    })
  }

  _get = async () => {
    try {
      this.isLoading = true
      this.user = await getCurrentUserData()
    } finally {
      this.isLoading = false
    }
  }

  update = async (values) => {
    try {
      this.isLoading = true
      await updateCurrentUser(values)
      await this._get()
    } catch (error) {
      throw error
    } finally {
      this.isLoading = false
    }
  }
}

const userStore = new UserStore()

export default userStore
