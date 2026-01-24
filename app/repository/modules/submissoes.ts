import type { AcaoInterface } from '~/models/acao.model'
import type { AcaoSearchInterface } from '~/models/acao.search.model'
import type { AcaoSearchOptionsInterface } from '~/models/acao.search.options.model'
import FetchFactory from '../factory'

class SubmissoesModule extends FetchFactory {
  private RESOURCE = '/submissoes'

  private mountAuthHeader() {
    const userStore = useUserStore()
    const authHeader = `Basic ${encodeBasicAuth(userStore.admin.username, userStore.admin.password)}`
    return new Headers({
      Authorization: authHeader,
      'Content-Type': 'application/json',
    })
  }

  async findById(id: number) {
    return this.call<AcaoInterface>(
      'GET',
      `${this.RESOURCE}/${id}`,
      undefined,
      { headers: this.mountAuthHeader() },
    )
  }

  async search(searchFilter: AcaoSearchOptionsInterface) {
    return this.call<AcaoSearchInterface[]>(
      'POST',
      `${this.RESOURCE}/search`,
      searchFilter,
      { headers: this.mountAuthHeader() },
    )
  }

  async aceitar(id: number) {
    return this.call<void>('PATCH', `${this.RESOURCE}/aceitar`, undefined, {
      params: { id },
      headers: this.mountAuthHeader(),
    })
  }

  async rejeitar(id: number) {
    return this.call<void>('DELETE', `${this.RESOURCE}/rejeitar`, undefined, {
      params: { id },
      headers: this.mountAuthHeader(),
    })
  }
}

export default SubmissoesModule
