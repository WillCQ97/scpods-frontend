<template>
  <v-row>
    <v-col>
      <!-- ROW PARA O PRIMEIRO E SEGUNDO CARDS -->
      <v-row>
        <v-col>
          <v-card>
            <v-card-item>
              <v-card-title> A agenda 2030 e os ODS </v-card-title>
              <v-card-subtitle>
                Saiba mais sobre os Objetivos de Desenvolvimento Sustentável
              </v-card-subtitle>
            </v-card-item>
            <the-card-divider />
            <v-card-text>
              <p>
                A Agenda 2030 consiste em um plano de ação global para governos,
                sociedade, empresas, academias e pessoas, no qual foram
                definidos 17 objetivos e 169 metas para o fomento de um
                desenvolvimento mais sustentável das atividades humanas nos
                próximos anos.
              </p>
            </v-card-text>

            <v-card-actions>
              <v-spacer />
              <a href="https://brasil.un.org/pt-br/sdgs" target="_blank">
                <v-btn
                  small
                  color="primary"
                  text="Veja mais"
                  append-icon="mdi-open-in-new"
                >
                </v-btn>
              </a>
              <v-spacer />
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col>
          <v-card>
            <v-card-item>
              <v-card-title> A Ufes faz parte dessa iniciativa </v-card-title>
              <v-card-subtitle> e conta com você! </v-card-subtitle>
            </v-card-item>
            <the-card-divider />
            <v-card-text>
              <p>
                A Agenda 2030 é uma oportunidade de a Ufes incorporar os
                princípios dos ODS nas suas diferentes frentes de atuação
                (ensino, pesquisa, extensão, assistência e gestão), fortalecendo
                vínculos e criando conexão entre essas áreas.
              </p>
              <p>
                Em 2020, teve início o projeto institucional de integração dos
                ODS da Agenda 2030 na Ufes, visando dar transparência às ações
                de sustentabilidade realizadas pela instituição.
              </p>
            </v-card-text>

            <v-card-actions>
              <v-spacer />
              <a href="https://ods.ufes.br/" target="_blank">
                <v-btn
                  small
                  color="primary"
                  text="Veja mais"
                  append-icon="mdi-open-in-new"
                >
                </v-btn>
              </a>
              <v-spacer />
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <!-- ROW PARA O TERCEIRO CARD -->
      <v-row>
        <v-col>
          <v-card>
            <v-card-item>
              <v-card-title> Cadastre sua contribuição </v-card-title>
            </v-card-item>
            <the-card-divider />
            <v-card-text>
              O mapeamento permitirá o planejamento de ações futuras, o
              monitoramento dos <em>campi</em> e facilitará a divulgação das
              boas práticas.
              <br />
              Portanto se você coordenou alguma iniciativa que tenha contribuído
              com um dos ODS,
              <strong>
                cadastre sua ação no mapa e mostre sua contribuição nessa
                importante missão.
              </strong>
            </v-card-text>

            <v-card-actions>
              <v-spacer />
              <nuxt-link to="/sugerir-acao">
                <v-btn small color="primary" text="Sugerir ação"></v-btn>
              </nuxt-link>
              <v-spacer />
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import TheCardDivider from '~/components/UI/TheCardDivider.vue'

export default {
  name: 'PaginaInicial',
  components: { TheCardDivider },
}
</script>
