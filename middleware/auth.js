export default defineNuxtRouteMiddleware((to, from) => {
  const pubkey = useCookie('mesprit')

  if (pubkey.value !== undefined) {
    const { login } = useAuth()
    login(pubkey.value, to.fullPath)
  } else {
    return '/login/'
  }
})
