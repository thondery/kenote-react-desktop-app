
const storage = process.env.ELECTRON 
              ? require('electron-json-storage') 
              : require('localforage')

export const getItem = (key) => {
  if (process.env.ELECTRON) {
    return new Promise((resolve, reject) => {
      storage.get(key, (error, data) => {
        if (error) {
          reject(error)
        }
        else {
          resolve(data)
        }
      })
    })
  }
  else {
    return storage.getItem(key)
  }
}

export async function setItem (key, value) {
  if (value === null) return Promise.reject('StorageService Error: value should not be null or undefined')
  if (process.env.ELECTRON) {
    return await new Promise((resolve, reject) => {
      storage.set(key, value, error => {
        if (error) {
          reject(error)
        }
      })
    })
  }
  else {
    return await storage.setItem(key, value)
  }
}

export async function removeItem (key) {
  if (process.env.ELECTRON) {
    return await new Promise((resolve, reject) => {
      storage.remove(key, error => {
        if (error) {
          reject(error)
        }
      })
    })
  }
  else {
    return await storage.removeItem(key)
  }
}

export async function clear () {
  if (process.env.ELECTRON) {
    return await new Promise( (resolve, reject) => {
      storage.clear( error => {
        if (error) {
          reject(error)
        }
      })
    })
  }
  else {
    return await storage.clear()
  }
}