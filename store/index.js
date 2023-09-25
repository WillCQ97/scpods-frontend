import { Store } from 'vuex'

import listaObjetivos from '~/assets/data/ods_goals'

import listaAcoesAlegre from '~/assets/data/alegre_actions'
import listaInfoAlegre from '~/assets/data/alegre_info'

const createStore = () => {
  return new Store({
    state: {
      objetivos: [],
      acoesAlegre: {},
      infosAlegre: {},
    },

    mutations: {
      setObjetivos(state, objetivos) {
        state.objetivos = objetivos
      },

      setAcoesAlegre(state, acoes) {
        state.acoesAlegre = acoes
      },
      setInfoAlegre(state, infos) {
        state.infosAlegre = infos
      },
    },

    actions: {
      nuxtServerInit(vuexContext, context) {
        return new Promise((resolve, reject) => {
          vuexContext.commit('setObjetivos', listaObjetivos)

          vuexContext.commit('setAcoesAlegre', listaAcoesAlegre)
          vuexContext.commit('setInfoAlegre', listaInfoAlegre)

          resolve()
        })
      },
    },

    getters: {
      getObjetivos(state) {
        return state.objetivos
      },
      getObjetivoById: (state) => (id) => {
        return state.objetivos.find((objetivo) => objetivo.id === id)
      },
      getMetaById: (state) => (id) => {
        // const idObjetivo = parseInt(id)
        // const metas = this.getters.getObjetivoById(idObjetivo).metas
        const objetivo = state.objetivos.find((objetivo) => objetivo.id === id)
        const metas = objetivo.metas
        return metas.find((meta) => meta.id === id)
      },

      getAcoesAlegre(state) {
        return state.acoesAlegre
      },
      getInfoAlegre(state) {
        return state.infosAlegre
      },
      createMarkersInfoAlegre: (state) => (local) => {
        const markers = state.infosAlegre[local].map((resumo) => ({
          id: resumo.id,
          coord: resumo.local.coord,
          content:
            '<div class="popup">' +
            '<img class="popup_img" src="' +
            require('~/assets/ods_icons/' + resumo.id_ods_principal + '.png') +
            '"><br>' +
            '<div class="popup_text">' +
            '<strong>' +
            resumo.local.nome +
            '</strong>' +
            '<br/>Total de Projetos: ' +
            resumo.qtd_projetos_totais +
            '<br/>Total de Projetos Ativos: ' +
            resumo.qtd_projetos_ativos +
            '<br/>Total de ODS atendidos: ' +
            resumo.qtd_ods +
            '<br/>ODS Principal Atendido: ' +
            resumo.id_ods_principal +
            '</div></div>',
        }))
        return markers
      },
    },
  })
}

export default createStore
