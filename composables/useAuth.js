import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuth = defineStore('auth', () => {
  const pubkey = useCookie('mesprit', { maxAge: 3600, sameSite: 'strict' })
  const picture = ref(null)
  const username = ref(null)
  const loggedIn = ref(false)

  async function login (pubkey, returnURL = '/global') {
    const response = await fetchData('/api/login/' + pubkey)
    setUser(response.metadata, returnURL)
  }

  function setUser (metaData, returnURL = '/global') {
    try {
      pubkey.value = metaData.pubkey
      // store user details and jwt in local storage to keep user logged in between page refreshes
      /* localStorage.setItem('user', metaData.pubkey); */
      username.value = metaData.name
        ? metaData.name
        : metaData.pubkey.slice(0, 10)
      try {
        picture.value = metaData.picture
          ? encodeURI(metaData.picture)
          : 'https://api.dicebear.com/5.x/avataaars/svg?seed=' +
            metaData.pubkey.slice(0, 10)
      } catch {
        picture.value =
          'https://api.dicebear.com/5.x/avataaars/svg?seed=' +
          metaData.pubkey.slice(0, 10)
      }
    } catch {
      console.log('invalid metadata')
    }
    // redirect to previous url or default to home page
    loggedIn.value = true
    return navigateTo(returnURL === '/' ? '/global' : returnURL)
  }

  function isAuthenticated () {
    if (pubkey.value !== undefined) {
      return true
    } else {
      return false
    }
  }

  function logout () {
    pubkey.value = null
    return navigateTo('/login')
  }

  return { pubkey, picture, username, login, logout, isAuthenticated }
})
