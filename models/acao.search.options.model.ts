export interface AcaoSearchOptionsInterface {
  titulo?: string
  campus?: string

  dataInicial?: string
  dataFinal?: string

  nomeCoordenador?: string
  nomeLocal?: string
  nomeUnidade?: string

  siglaLotacao?: string
  codigoObjetivo?: string
  codigoUnidade?: string
}

export function AcaoSearchOptionsBuilder(
  codigoUnidade: string,
): AcaoSearchOptionsInterface {
  return { codigoUnidade: codigoUnidade }
}
