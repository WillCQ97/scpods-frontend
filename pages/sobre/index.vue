<template>
  <div>
    <v-row>
      <v-spacer />
      <v-col cols="10">
        <v-card>
          <v-card-title> Sobre o mapa </v-card-title>
          <hr />
          <v-card-text class="text--primary">
            <p>
              A Universidade Federal do Espírito Santo (UFES) possui diversas
              ações e projetos relacionados com os Objetivos de Desenvolvimento
              Sustentável (ODS) definidos pela ONU na Agenda 2030, sendo de
              vital importância sua identificação e valorização.
            </p>
            <br />
            <p>
              Este <em>site</em> é uma demonstração de como é possível realizar
              o monitoramento dessas práticas de forma colaborativa.
            </p>
            <br />
            <p>
              A ideia é que a comunidade acadêmica, constituída pelos docentes,
              discentes e servidores técnico-administrativos, utilize o
              <em>login</em>
              único para acesso à página de inserção de dados e participe
              ativamente da alimentação desse mapa interativo, através do
              preenchimento de um formulário, que será posteriormente validado
              por uma equipe.
            </p>
            <br />
            <p>
              Além disso, qualquer pessoa com acesso à internet poderá escolher
              um dos
              <em>campi</em> da UFES e visualizar as iniciativas realizadas.
            </p>
            <br />
            <p>
              O mapa representa, portanto, uma alternativa diferenciada e
              transparente de comunicação, com participação coletiva e, ao mesmo
              tempo, uma análise espacial da consolidação dos ODS dentro da
              UFES.
            </p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-spacer />
    </v-row>

    <v-row>
      <v-spacer />
      <v-col cols="8">
        <v-img
          id="ufes-banner"
          src="img/banner-ods-ufes.png"
          max-width="550px"
          alt="Banner com logotipo da UFES e o texto 'objetivos de desenvolvimento sustentável'"
        ></v-img>
      </v-col>
      <v-spacer />
    </v-row>
  </div>
</template>

<script lang="ts">
export default {
  name: 'AboutPage',
}
</script>

<style scoped>
#ufes-banner {
  margin-left: auto;
  margin-right: auto;
}
</style>
