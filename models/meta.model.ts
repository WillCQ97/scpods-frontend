import type { IObjetivoAcao } from './objetivo.model'

export interface MetaInterface {
  id: number
  codigo: string
  descricao: string

  objetivo?: IObjetivoAcao
}

export interface IMetaAcao extends MetaInterface {
  objetivo: IObjetivoAcao
}
