<template>
  <v-img
    :src="loadGoalIcon"
    :height="height"
    :width="width"
    max-height="225"
    max-width="225"
    :cover="cover"
  >
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
  name: 'TheGoalImage',
  props: {
    goalCode: {
      type: String,
      required: true,
    },
    cover: {
      type: Boolean,
      required: false,
      default: false,
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
      return '/img/ods-icons/pt-br/SDG-' + this.goalCode + '.svg'
    },
  },
}
</script>
