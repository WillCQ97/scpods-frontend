<!-- TODO: FINALIZAR ESTE TEMPLATE-->
<template>
  <v-row>
    <v-spacer />
    <v-col>
      <v-card width="95vh">
        <v-card-title>Faça o login</v-card-title>
        <v-card-text>
          <v-list>
            <v-list-item>
              Nós não armazenamos seu login para nenhum propósito
            </v-list-item>
            <v-list-item>
              Esta informação será utilizada apenas para garantir que você faz
              parte da comunidade acadêmica da UFES.
            </v-list-item>
          </v-list>
          <v-text-field label="Informe seu CPF"></v-text-field>
          <v-text-field label="Informe sua senha da UFES"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn> Validar Login </v-btn>
          <v-btn @click="navigateTo('/')"> Cancelar </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-spacer />
  </v-row>
</template>
