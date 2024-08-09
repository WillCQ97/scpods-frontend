export function obrigatorioValidator(value: any) {
  return !!value || 'Este campo é obrigatório.'
}

export function naoVazioValidator(value: string) {
  return value.trim() !== '' || 'Este campo não pode estar vazio!'
}

export function formatoDataValidator(value: string) {
  if (!value) return true

  const match = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/)
  if (!match) {
    return 'Formato de data inválido. Use dd/MM/aaaa.'
  }

  const day = parseInt(match[1], 10)
  const month = parseInt(match[2], 10)
  const year = parseInt(match[3], 10)

  if (
    day < 1 ||
    day > 31 ||
    month < 1 ||
    month > 12 ||
    year < 1000 ||
    year > 9999
  ) {
    return 'Data inválida.'
  }

  const date = new Date(year, month - 1, day)
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return 'Data inválida.'
  }

  return true
}

export function emailValidator(value: string) {
  const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  return emailPattern.test(value) || 'Por favor, insira um email válido.'
}
