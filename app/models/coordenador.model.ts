export interface CoordenadorInterface {
  id?: number
  nome: string
  email?: string // campo presente apenas nas submissões

  tipoVinculo: string
  descricaoVinculo: string | null
}

export function CoordenadorInterfaceBuilder(): CoordenadorInterface {
  return { nome: '', email: '', tipoVinculo: '', descricaoVinculo: '' }
}
