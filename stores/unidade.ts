import type Local from '~/models/local.model'
import type Marker from '~/models/marker.model'
import type Unidade from '~/models/unidade.model'

type State = {
  unidades: Unidade[] // armazenar a listagem dos locais para o formulário
  info: Unidade // armazernar a info de uma certa unidade (será substituída ao trocar de página)
}

const odsStore = useObjetivoStore()

export const useUnidadeStore = defineStore('unidadeStore', {
  state: () => ({ unidades: [], info: {} as Unidade }) as State,

  getters: {
    getInfo: ({ unidades, info }) => info,

    getLocaisComProjetosAtivos({ unidades, info }): Local[] {
      return info.locais?.filter((local) => local.projetosAtivos > 0)
    },

    getMarcadores(): Marker[] {
      if (this.getLocaisComProjetosAtivos === undefined) return []

      return this.getLocaisComProjetosAtivos.map((local: Local) => ({
        ...local,
        id: local.id,
        coordinates: local.localizacao.coordinates.reverse(),
        content:
          '<div class="popup">' +
          '<img class="popup_img" src="' +
          '/img/ods-icons/pt-br/SDG-' +
          local.idObjetivoComMaisProjetos +
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
    async fetchInfo(codigoUnidade: string) {
      const path = 'unidade/' + codigoUnidade + '/info'

      try {
        const response = await $fetch(path, {
          baseURL: 'http://localhost:8080/acoes-ods/v1/',
          method: 'get',
          lazy: true,
          server: false,
        })
        this.info = response
      } catch (error) {
        console.log('ERRO:', error)
        return error
      }
    },
  },
})
