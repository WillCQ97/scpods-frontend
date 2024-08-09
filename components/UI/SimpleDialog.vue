<template>
  <!-- TEMPLATE DO DIÁLOGO -->
  <v-dialog v-model="isDialogVisible" width="500">
    <v-card>
      <v-card-title>{{ title }}</v-card-title>
      <the-card-divider />
      <v-card-text class="dialog">
        <v-icon
          :icon="isError ? 'mdi-alert-circle' : 'mdi-check-circle'"
          :color="isError ? 'error' : 'success'"
          size="90"
        ></v-icon>
        <br /><br />
        {{ message }}
      </v-card-text>

      <the-card-divider />

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="isDialogVisible = false">OK</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import TheCardDivider from './TheCardDivider.vue'

export default {
  name: 'SimpleDialog',
  components: { TheCardDivider },

  props: {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    isError: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      isDialogVisible: true,
    }
  },

  methods: {
    close() {
      this.isDialogVisible = false
    },
  },
}
</script>
<style scoped>
.dialog {
  text-align: center;
  font-size: 20px !important;
}
</style>
