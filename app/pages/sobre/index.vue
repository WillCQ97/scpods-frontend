<template>
  <v-row>
    <v-col>
      <!-- ROW PARA O CARD -->
      <v-row>
        <v-spacer />
        <v-col cols="10">
          <v-card>
            <v-card-title> Sobre o mapa </v-card-title>
            <the-card-divider />
            <v-card-text class="text--primary">
              <p>
                A Universidade Federal do Espírito Santo (Ufes) possui diversas
                ações e projetos relacionados com os Objetivos de
                Desenvolvimento Sustentável (ODS) definidos pela ONU na Agenda
                2030, sendo de vital importância sua identificação e
                valorização.
              </p>
              <br />
              <p>
                Este <em>site</em> é uma demonstração de como é possível
                realizar o monitoramento dessas práticas de forma colaborativa.
              </p>
              <br />
              <p>
                A ideia é que a comunidade acadêmica, constituída pelos
                docentes, discentes e servidores técnico-administrativos,
                utilize o
                <em>login</em>
                único para acesso à página de inserção de dados e participe
                ativamente da alimentação desse mapa interativo, através do
                preenchimento de um formulário, que será posteriormente validado
                por uma equipe.
              </p>
              <br />
              <p>
                Além disso, qualquer pessoa com acesso à internet poderá
                escolher um dos
                <em>campi</em> da Ufes e visualizar as iniciativas realizadas.
              </p>
              <br />
              <p>
                O mapa representa, portanto, uma alternativa diferenciada e
                transparente de comunicação, com participação coletiva e, ao
                mesmo tempo, uma análise espacial da consolidação dos ODS dentro
                da Ufes.
              </p>
            </v-card-text>
          </v-card>
        </v-col>
        <v-spacer />
      </v-row>

      <!-- ROW PARA A IMAGEM DE BANNER -->
      <v-row>
        <v-spacer />
        <v-col cols="8">
          <v-img
            id="ufes-banner"
            src="/img/banner-ods-ufes.png"
            max-width="550px"
            alt="Banner com logotipo da Ufes e o texto 'Objetivos de Desenvolvimento Sustentável'"
          ></v-img>
        </v-col>
        <v-spacer />
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import TheCardDivider from '~/components/UI/TheCardDivider.vue'

export default {
  name: 'PaginaSobre',
  components: { TheCardDivider },
}
</script>

<style scoped>
#ufes-banner {
  margin-left: auto;
  margin-right: auto;
}
</style>
