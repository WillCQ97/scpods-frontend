export interface CoordenadorAcaoInterface {
  id: number
  nome: string
  email?: string // campo presente apenas nas submissões

  tipoVinculo: string
  descricaoVinculo: string
}
