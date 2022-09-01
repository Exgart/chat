import { makeAutoObservable } from 'mobx'

class ModalsStore {
  isProfileSettingsOpen = false

  constructor() {
    makeAutoObservable(this)
  }

  openProfileSettings = () => {
    this.isProfileSettingsOpen = true
  }

  closeProfileSettings = () => {
    this.isProfileSettingsOpen = false
  }
}

const modalsStore = new ModalsStore()

export default modalsStore
