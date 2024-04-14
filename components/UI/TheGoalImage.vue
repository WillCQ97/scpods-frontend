<template>
  <v-img :src="loadGoalIcon" :height="height" :width="width" cover>
    <template #placeholder>
      <div class="d-flex align-center justify-center fill-height">
        <v-progress-circular
          color="grey-lighten-4"
          indeterminate
        ></v-progress-circular>
      </div>
    </template>
  </v-img>
</template>

<script>
export default {
  name: 'TheGoalImageComponent',
  props: {
    goalId: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: false,
      default: undefined,
    },
    width: {
      type: Number,
      required: false,
      default: undefined,
    },
  },
  computed: {
    loadGoalIcon() {
      return '/img/ods-icons/pt-br/SDG-' + this.goalId + '.svg'
    },
  },
}
</script>
