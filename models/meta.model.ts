import type { ObjetivoAcaoInterface } from './objetivo.model'

export interface MetaInterface {
  id: number
  codigo: string
  descricao: string
}

export interface MetaAcaoInterface extends MetaInterface {
  objetivo: ObjetivoAcaoInterface
}
