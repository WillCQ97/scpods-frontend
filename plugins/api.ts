import { $fetch, type FetchOptions } from 'ofetch'
import AcaoRepository from '~/repository/modules/acao'
import ObjetivoRepository from '~/repository/modules/objetivo'

interface IApiInstance {
  acaoModule: AcaoRepository
  objetivoRepository: ObjetivoRepository
}

export default defineNuxtPlugin({
  setup() {
    const config = useRuntimeConfig()

    const fetchOptions: FetchOptions = {
      baseURL: config.public.apiBaseUrl,
      //onRequestError()
      //onResponse
    }

    const apiFetcher = $fetch.create(fetchOptions)

    const modules: IApiInstance = {
      acaoModule: new AcaoRepository(apiFetcher),
      objetivoRepository: new ObjetivoRepository(apiFetcher),
    }

    return { provide: { api: modules } }
  },
})
