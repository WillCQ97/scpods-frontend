import type { Local, LocalInfo } from './local.model'

interface IUnidadeBase {
  id: number
  nome: string
  codigo: string
  campus: string

  locais?: Local[] //
}

export interface IUnidade extends IUnidadeBase {
  locais: Local[]
}

export interface IUnidadeAcao extends IUnidadeBase {}

export interface IUnidadeInfo extends IUnidadeBase {
  locais: LocalInfo[]
}
