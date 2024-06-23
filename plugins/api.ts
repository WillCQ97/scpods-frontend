// 3rd's
import { $fetch, type FetchOptions } from 'ofetch'
// locals
import ObjetivosModule from '~/repository/modules/objetivos'

interface IApiInstance {
  objetivos: ObjetivosModule
}

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()

  const fetchOptions: FetchOptions = {
    baseURL: config.public.apiBase,
  }

  // Create a new instance of $fecther with custom option
  const apiFetcher = $fetch.create(fetchOptions)

  // An object containing all repositories we need to expose
  const modules: IApiInstance = {
    objetivos: new ObjetivosModule(apiFetcher),
  }

  return { provide: { api: modules } }
})
