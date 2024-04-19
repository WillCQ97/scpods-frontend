import type { Local } from '~/models/local.model'
import type { Unidade } from '~/models/unidade.model'

interface Marker {
  id: number
  coordinates: number[]
  content: string
}

type State = {
  unidade: Unidade
}

const odsStore = useObjetivoStore()

export const useUnidadeStore = defineStore('unidadeStore', {
  state: () => ({ unidade: {} }) as State,

  getters: {
    getInfo: ({ unidade }) => unidade,

    getLocaisComProjetosAtivos({ unidade }): Local[] {
      return unidade.locais.filter((local) => local.projetosAtivos > 0)
    },

    getMarkers(): Marker[] {
      return this.getLocaisComProjetosAtivos.map((local: Local) => ({
        ...local,
        id: local.id,
        coordinates: local.localizacao.coordinates.reverse(),
        content:
          '<div class="popup">' +
          '<img class="popup_img" src="' +
          '/img/ods-icons/pt-br/SDG-' +
          local.objetivosAtendidos +
          '.svg' +
          '"><br>' +
          '<div class="popup_text">' +
          '<strong>' +
          local.nomePrincipal +
          '</strong>' +
          '<br/>Número de Projetos Ativos: ' +
          local.projetosAtivos +
          '<br/>Objetivos atendidos: ' +
          local.objetivosAtendidos +
          '<br/>Objetivo mais atendido: ' +
          '<br/>' +
          odsStore.getTituloObjetivoById(local.idObjetivoComMaisProjetos) +
          '</div></div>',
      }))
    },
  },

  actions: {
    async fetchInfo(campus: string) {
      try {
        const response = await useFetch('campus/info', {
          baseURL: 'http://localhost:8080/acoes-ods/v1/',
          method: 'get',
          query: { campus: campus },
        })
        this.unidade = response.data
        //console.log(response.data)
        //console.log('=====')
        //console.log(this.$state)
      } catch (error) {
        console.log('ERRO:', error)
        return error
      }
    },

    async fetchLocais() {
      try {
        const response = await useFetch('campus/info', {
          baseURL: 'http://localhost:8080/acoes-ods/v1/',
          method: 'get',
          query: { campus: campus },
        })
        this.infos = response.data
      } catch (error) {
        console.log('ERRO:', error)
        return error
      }
    },
  },
})
