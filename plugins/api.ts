// 3rd's
import { $fetch, type FetchOptions } from 'ofetch'
import AcoesModule from '~/repository/modules/acoes'
import LotacoesModule from '~/repository/modules/lotacoes'
// locals
import ObjetivosModule from '~/repository/modules/objetivos'
import SubmissoesModule from '~/repository/modules/submissoes'
import UnidadesModule from '~/repository/modules/unidades'

interface IApiInstance {
  acoes: AcoesModule
  objetivos: ObjetivosModule
  lotacoes: LotacoesModule
  submissoes: SubmissoesModule
  unidades: UnidadesModule
}

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()

  const fetchOptions: FetchOptions = {
    baseURL: config.public.apiBaseUrl,
  }

  // Create a new instance of $fecther with custom option
  const apiFetcher = $fetch.create(fetchOptions)

  // An object containing all repositories we need to expose
  const modules: IApiInstance = {
    acoes: new AcoesModule(apiFetcher),
    objetivos: new ObjetivosModule(apiFetcher),
    lotacoes: new LotacoesModule(apiFetcher),
    submissoes: new SubmissoesModule(apiFetcher),
    unidades: new UnidadesModule(apiFetcher),
  }

  return { provide: { api: modules } }
})
