<!-- TODO: FIX quando clicar no botão, sem ser clicar no link ir para a página em questão -->
<template>
  <div>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title> A agenda 2030 e os ODS </v-card-title>
          <v-card-subtitle>
            Saiba mais sobre os Objetivos de Desenvolvimento Sustentável
          </v-card-subtitle>
          <hr />
          <v-card-text>
            A Agenda 2030 consiste em um plano de ação global para governos,
            sociedade, empresas, academias e pessoas, no qual foram definidos 17
            objetivos e 169 metas para o fomento de um desenvolvimento mais
            sustentável das atividades humanas nos próximos anos.
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn>
              <!--TODO: ESTE LINK NO MOMENTO ESTÁ FORA DO AR -->
              <a href="http://www.agenda2030.com.br/sobre/" target="_blank">
                Veja mais
              </a>
            </v-btn>
            <v-spacer />
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col>
        <v-card>
          <v-card-title> A Ufes faz parte dessa iniciativa </v-card-title>
          <v-card-subtitle> e conta com você! </v-card-subtitle>
          <hr />
          <v-card-text>
            A Agenda 2030 é uma oportunidade de a Ufes incorporar os princípios
            dos ODS nas suas diferentes frentes de atuação (ensino, pesquisa,
            extensão, assistência e gestão), fortalecendo vínculos e criando
            conexão entre essas áreas.
            <br />
            Em 2020, teve início o projeto institucional de integração dos ODS
            da Agenda 2030 na Ufes, visando dar transparência às ações de
            sustentabilidade realizadas pela instituição.
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn>
              <a href="https://ods.ufes.br/" target="_blank"> Veja mais </a>
            </v-btn>
            <v-spacer />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title> Cadastre sua contribuição </v-card-title>
          <hr />
          <v-card-text>
            O mapeamento permitirá o planejamento de ações futuras, o
            monitoramento dos <em>campi</em> e facilitará a divulgação das boas
            práticas.
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
            <!-- TODO: ADICIONAR UMA EXPLICAÇÃO PARA COMO É REALIZADA A SUGESTÃO -->
            <v-btn>
              <nuxt-link to="/sobre"> Saiba como </nuxt-link>
            </v-btn>
            <v-spacer />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
}
</script>
