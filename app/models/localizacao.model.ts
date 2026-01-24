export default interface LocalizacaoInterface {
  type: string
  coordinates: [number, number]
}

export function LocalizacaoInterfaceBuilder() {
  return { type: '', coordinates: [0, 0] }
}
