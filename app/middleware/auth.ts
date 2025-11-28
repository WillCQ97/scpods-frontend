export default defineNuxtRouteMiddleware((to, from) => {
  console.debug('[MIDDLEWARE] Verificando autenticação?!')

  const userStore = useUserStore()
  // APENAS O ADMIN PODE ACESSAR A PÁGINA PARA AVALIAR AS SUBMISSÕES
  if (to.path === '/admin/avaliar-submissoes') {
    if (!userStore.admin.isLoggedIn) {
      console.debug('O usuário não é administrador, redirecionando para /')
      return navigateTo({ path: '/' })
    }
  }

  // APENAS USUÁRIOS LOGADOS PODEM ACESSAR O FORMULÁRIO DE SUBMISSÃO
  if (to.path === '/sugerir-acao/formulario') {
    if (!userStore.isLoggedIn && !userStore.admin.isLoggedIn) {
      console.debug(
        'O usuário não está logado, redirecionando para /sugerir-acao',
      )
      return navigateTo({ path: '/sugerir-acao' })
    }
  }
})
