import type { LocalInfo } from '~/models/local.model'
import type Marker from '~/models/props/marker.model'
import type { Unidade, UnidadeInfo } from '~/models/unidade.model'

type State = {
  unidades: Unidade[] // armazenar a listagem dos locais para o formulário
  unidadeInfo: UnidadeInfo // armazernar a info de uma certa unidade (será substituída ao trocar de página)
}

const odsStore = useObjetivoStore()

export const useUnidadeStore = defineStore('unidadeStore', {
  state: () => ({ unidades: [], unidadeInfo: {} as UnidadeInfo }) as State,

  getters: {
    getInfo: ({ unidades, unidadeInfo: info }) => info,

    getLocaisComProjetosAtivos({ unidades, unidadeInfo: info }): LocalInfo[] {
      return info.locais?.filter((local) => local.projetosAtivos > 0)
    },

    getMarcadores(): Marker[] {
      /*
       * As classes css utilizadas no html abaixo são definidas em main.css
       */
      if (this.getLocaisComProjetosAtivos === undefined) return []

      return this.getLocaisComProjetosAtivos.map((local: LocalInfo) => ({
        ...local,
        id: local.id,
        coordinates: local.localizacao.coordinates.reverse(),
        content:
          '<div class="map_popup">' +
          '<img class="map_popup_img" src="' +
          '/img/ods-icons/pt-br/SDG-' +
          local.idObjetivoComMaisProjetos +
          '.svg' +
          '"><br>' +
          '<div class="map_popup_text">' +
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

    getUnidades({ unidades, unidadeInfo }) {
      return unidades
    },
  },

  actions: {
    async fetchCampusOptions() {
      try {
        const response = await $fetch('unidades/opcoes-campus', {
          baseURL: 'http://localhost:8080/acoes-ods/v1/',
          method: 'get',
          lazy: true,
          server: false,
        })
        return response
      } catch (error) {
        console.log('ERRO:', error)
        return error
      }
    },

    async fetchInfo(codigoUnidade: string) {
      const path = 'unidades/' + codigoUnidade + '/info'

      try {
        const response = await $fetch(path, {
          baseURL: 'http://localhost:8080/acoes-ods/v1/',
          method: 'get',
          lazy: true,
          server: false,
        })
        this.unidadeInfo = response
      } catch (error) {
        console.log('ERRO:', error)
        return error
      }
    },

    async fetchLocais() {
      try {
        const response = await $fetch('unidades/', {
          baseURL: 'http://localhost:8080/acoes-ods/v1/',
          method: 'get',
          lazy: true,
          server: false,
        })
        this.unidades = response
      } catch (error) {
        console.log('ERRO:', error)
        return error
      }
    },
  },
})
