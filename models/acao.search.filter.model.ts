export interface AcaoSearchFilterInterface {
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
): AcaoSearchFilterInterface {
  return { codigoUnidade: codigoUnidade }
}
