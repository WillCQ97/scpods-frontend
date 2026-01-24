export interface LotacaoInterface {
  id?: number
  descricao: string
  sigla: string
  campus: string
}

export function LotacaoInterfaceBuilder(): LotacaoInterface {
  return { descricao: '', sigla: '', campus: '' }
}
