<template>
  <div>
    <v-card>
      <v-card-title> Sobre o mapa </v-card-title>
      <hr />
      <v-card-text class="text--primary">
        <p>
          A Universidade Federal do Espírito Santo (UFES) possui diversas ações
          e projetos relacionados com os Objetivos de Desenvolvimento
          Sustentável (ODS) definidos pela ONU na Agenda 2030, sendo de vital
          importância sua identificação e valorização.
        </p>
        <p>
          Este <em>site</em> é uma demonstração de como é possível realizar o
          monitoramento dessas práticas de forma colaborativa.
        </p>
        <p>
          A ideia é que a comunidade acadêmica, constituída pelos docentes,
          discentes e servidores técnico-administrativos, utilize o
          <em>login</em>
          único para acesso à página de inserção de dados e participe ativamente
          da alimentação desse mapa interativo, através do preenchimento de um
          formulário, que será posteriormente validado por uma equipe.
        </p>
        <p>
          Além disso, qualquer pessoa com acesso à internet poderá escolher um
          dos
          <em>campi</em> da UFES e visualizar as iniciativas realizadas.
        </p>
        <p>
          O mapa representa, portanto, uma alternativa diferenciada e
          transparente de comunicação, com participação coletiva e, ao mesmo
          tempo, uma análise espacial da consolidação dos ODS dentro da UFES.
        </p>
      </v-card-text>
      <v-row>
        <v-spacer />
        <v-img
          src="/logos/ods-ufes-banner.png"
          max-height="200"
          max-width="550"
          alt="Banner com logotipo da ufes e o texto 'objetivos de desenvolvimento sustentável'"
        ></v-img>
        <v-spacer />
      </v-row>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'AboutPage',
}
</script>
