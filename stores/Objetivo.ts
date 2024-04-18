//import { useRuntimeConfig } from "#app"
//import { useFetch } from '#app'

const config = useRuntimeConfig()

export const useObjetivo = defineStore('objetivo', {
  state: () => {
    objetivos: []
  },

  actions: {
    async fetchObjetivos() {
      try {
        this.$state.objetivos = await useFetch('objetivos', {
          baseURL: config.public.apiBase as string,
          method: 'get',
        })
      } catch (error) {
        console.log('ERRO:')
        console.log(error)
        return error
      }
    },
  },
})
