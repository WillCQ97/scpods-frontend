import type { NitroFetchRequest, $Fetch } from 'nitropack'

import type { AcaoInterface } from '~/models/acao.model'

export const repository = <T>(fetch: $Fetch<T, NitroFetchRequest>) => ({
  async get(codigoUnidade: string): Promise<AcaoInterface[]> {
    return $fetch<AcaoInterface[]>('/acoes/')
  },
})
