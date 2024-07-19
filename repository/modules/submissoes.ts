import type { AcaoInterface } from '~/models/acao.model'
import type { AcaoSearchFilterInterface } from '~/models/acao.search.filter.model'
import FetchFactory from '../factory'
import { encodeBasicAuth } from '@/utils/encodeAuth'

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

  async search(searchFilter: AcaoSearchFilterInterface) {
    return this.call<AcaoInterface[]>(
      'POST',
      `${this.RESOURCE}/search`,
      searchFilter,
      { headers: this.mountAuthHeader() },
    )
  }

  async aceitar(id: number) {
    return this.call<AcaoInterface>(
      'PATCH',
      `${this.RESOURCE}/aceitar`,
      undefined,
      {
        params: { id },
        headers: this.mountAuthHeader(),
      },
    )
  }

  async rejeitar(id: number) {
    return this.call<AcaoInterface>(
      'DELETE',
      `${this.RESOURCE}/rejeitar`,
      undefined,
      {
        params: { id },
        headers: this.mountAuthHeader(),
      },
    )
  }
}

export default SubmissoesModule
