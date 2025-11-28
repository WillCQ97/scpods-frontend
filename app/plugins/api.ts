// 3rd's
import { $fetch, type FetchOptions } from 'ofetch'
// locals
import AcoesModule from '~/repository/modules/acoes'
import LotacoesModule from '~/repository/modules/lotacoes'
import ObjetivosModule from '~/repository/modules/objetivos'
import SubmissoesModule from '~/repository/modules/submissoes'
import UnidadesModule from '~/repository/modules/unidades'
import UsuariosModule from '~/repository/modules/usuarios'

interface ApiInstanceInterface {
  acoes: AcoesModule
  objetivos: ObjetivosModule
  lotacoes: LotacoesModule
  submissoes: SubmissoesModule
  unidades: UnidadesModule
  usuarios: UsuariosModule
}

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()

  const fetchOptions: FetchOptions = {
    baseURL: config.public.apiBaseUrl,
  }

  // Create a new instance of $fecther with custom option
  const apiFetcher = $fetch.create(fetchOptions)

  // An object containing all repositories we need to expose
  const modules: ApiInstanceInterface = {
    acoes: new AcoesModule(apiFetcher),
    objetivos: new ObjetivosModule(apiFetcher),
    lotacoes: new LotacoesModule(apiFetcher),
    submissoes: new SubmissoesModule(apiFetcher),
    unidades: new UnidadesModule(apiFetcher),
    usuarios: new UsuariosModule(apiFetcher),
  }

  return { provide: { api: modules } }
})
