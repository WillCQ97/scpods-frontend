export interface ObjetivoAcaoInterface {
  id?: number
  codigo: string
  titulo: string
  descricao: string
}

export function ObjetivoAcaoInterfaceBuilter(): ObjetivoAcaoInterface {
  return { codigo: '', titulo: '', descricao: '' }
}
