export default defineNuxtRouteMiddleware((to, from) => {
  console.log('[MIDDLEWARE] Verificando autenticação?!')

  const user = useUserStore()
  // APENAS O ADMIN PODE ACESSAR A PÁGINA PARA AVALIAR AS SUBMISSÕES
  if (to.path === '/admin/avaliar-submissoes') {
    if (!user.isAdmin) {
      console.log('O usuário não é administrador, redirecionando para /')
      return navigateTo({ path: '/' })
    }
  }

  // APENAS USUÁRIOS LOGADOS PODEM ACESSÁR O FORMULÁRIO DE SUBMISSÃO
  if (to.path === '/sugerir-acao/formulario') {
    if (!user.isLoggedIn) {
      console.log(
        'O usuário não está logado, redirecionando para /sugerir-acao',
      )
      return navigateTo({ path: '/sugerir-acao' })
    }
  }
})
