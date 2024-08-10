import type { ObjetivoAcaoInterface } from './objetivo.model'

export interface MetaInterface {
  id: number
  codigo: string
  descricao: string

  objetivo?: ObjetivoAcaoInterface
}

export interface MetaAcaoInterface extends MetaInterface {
  objetivo: ObjetivoAcaoInterface
}
