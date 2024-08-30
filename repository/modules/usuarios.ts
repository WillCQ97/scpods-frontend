import FetchFactory from '../factory'

class UsuariosModule extends FetchFactory {
  private RESOURCE = '/usuarios'

  async validarAdmin(username: string, password: string) {
    const authHeader = `Basic ${encodeBasicAuth(username, password)}`
    const httpHeader = new Headers({
      Authorization: authHeader,
    })

    return this.call<void>('GET', `${this.RESOURCE}/validar-admin`, undefined, {
      headers: httpHeader,
    })
  }

  async validarMembroAcademico(username: string, password: string) {
    return this.call<void>('POST', `${this.RESOURCE}/validar-login-ufes`, {
      username: username,
      password: password,
    })
  }
}

export default UsuariosModule
