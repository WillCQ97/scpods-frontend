import type { AcaoInterface } from '~/models/acao.model'
import type { AcaoSearchFilterInterface } from '~/models/acao.search.filter.model'
import FetchFactory from '../factory'
import { encodeBasicAuth } from '@/utils/auth'

class SubmissoesModule extends FetchFactory {
  private RESOURCE = '/submissoes'

  private username = 'willcq'
  private password = 'admin.123'

  async findById(id: number) {
    const authHeader = `Basic ${encodeBasicAuth(this.username, this.password)}`
    const headers = new Headers({
      Authorization: authHeader,
      'Content-Type': 'application/json',
    })
    return this.call<AcaoInterface[]>(
      'GET',
      `${this.RESOURCE}/${id}`,
      undefined,
      {
        headers,
      },
    )
  }

  async search(searchFilter: AcaoSearchFilterInterface) {
    const authHeader = `Basic ${encodeBasicAuth(this.username, this.password)}`
    const headers = new Headers({
      Authorization: authHeader,
      'Content-Type': 'application/json',
    })

    return this.call<AcaoInterface[]>(
      'POST',
      `${this.RESOURCE}/search`,
      searchFilter,
      {
        headers,
      },
    )
  }

  async aceitar(id: number) {
    return this.call<AcaoInterface>(
      'PATCH',
      `${this.RESOURCE}/aceitar`,
      undefined,
      {
        params: { id },
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
      },
    )
  }
}

export default SubmissoesModule
