// TODO: testando esse plugin para verificar o problema ao acessar uma página que carrega a store pela primeira vez
// /sugerir-acao/ por exemplo usa o useUser() e resulta em erro
import { useUser } from '~/stores/User'

export default defineNuxtPlugin(({ $pinia }) => {
  return {
    provide: {
      store: useUser($pinia),
    },
  }
})
