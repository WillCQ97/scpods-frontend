const user = useUser()

export default defineNuxtRouteMiddleware((to, from) => {
  console.log('[MIDDLEWARE] Just Auth')
  if (!user.isAdmin) {
    return navigateTo({ path: '/' })
  }
})
