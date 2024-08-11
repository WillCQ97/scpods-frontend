export default interface LocalizacaoInterface {
  type: string
  coordinates: number[]
}

export function LocalizacaoInterfaceBuilder() {
  return { type: '', coordinates: [] }
}
