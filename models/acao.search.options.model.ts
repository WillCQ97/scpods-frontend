export interface AcaoSearchOptionsInterface {
  id?: number
  titulo?: string
  dataCadastro?: string
  codigoObjetivo?: string
  codigoMeta?: string
  siglaLotacao?: string
  nomePrincipalLocal?: string
  nomeCoordenador?: string
  codigoUnidade?: string
}

export function AcaoSearchOptionsBuilder(
  codigoUnidade: string,
): AcaoSearchOptionsInterface {
  return { codigoUnidade: codigoUnidade }
}
