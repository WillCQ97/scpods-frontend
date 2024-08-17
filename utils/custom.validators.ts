export function cpfValidator(value: string) {
  value = value.replace(/[^\d]+/g, '')

  let numbers, sum, result
  const digits = value.substring(9)
  let equalDigits = 1

  if (value.length < 11) {
    return 'CPF informado contém menos de 11 caracteres.'
  }

  for (let i = 0; i < value.length - 1; i++) {
    if (value.charAt(i) !== value.charAt(i + 1)) {
      equalDigits = 0
      break
    }
  }

  if (!equalDigits) {
    numbers = value.substring(0, 9)
    sum = 0
    for (let i = 10; i > 1; i--) {
      sum += (<any>numbers).charAt(10 - i) * i
    }
    result = sum % 11 < 2 ? 0 : 11 - (sum % 11)
    if (result !== Number(digits.charAt(0))) {
      return 'Dígito verificador inválido'
    }

    numbers = value.substring(0, 10)
    sum = 0
    for (let i = 11; i > 1; i--) {
      sum += (<any>numbers).charAt(11 - i) * i
    }
    result = sum % 11 < 2 ? 0 : 11 - (sum % 11)
    if (result !== Number(digits.charAt(1))) {
      return 'Dígito verificador inválido'
    }

    return true
  }
  return 'CPF inválido'
}

export function emailValidator(value: string) {
  const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  return emailPattern.test(value) || 'Por favor, insira um email válido.'
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

export function naoVazioValidator(value: string) {
  return value.trim() !== '' || 'Este campo não pode estar vazio!'
}

export function obrigatorioValidator(value: any) {
  return !!value || 'Este campo é obrigatório.'
}

export function urlValidator(value: string) {
  const urlPattern =
    /^[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/
  return urlPattern.test(value) || 'A url informada não é válida!'
}
