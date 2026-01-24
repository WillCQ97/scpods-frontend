export interface UnidadeAcaoInterface {
  id?: number
  nome: string
  campus: string
  codigo: string
}

export function UnidadeAcaoInterfaceBuilder(): UnidadeAcaoInterface {
  return { nome: '', campus: '', codigo: '' }
}
