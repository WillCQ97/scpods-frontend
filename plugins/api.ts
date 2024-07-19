// 3rd's
import { $fetch, type FetchOptions } from 'ofetch'
// locals
import ObjetivosModule from '~/repository/modules/objetivos'
import UnidadesModule from '~/repository/modules/unidades'

interface IApiInstance {
  objetivos: ObjetivosModule
  unidades: UnidadesModule
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
    unidades: new UnidadesModule(apiFetcher),
  }

  return { provide: { api: modules } }
})
