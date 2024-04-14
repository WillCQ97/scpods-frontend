<template>
  <v-img :src="loadGoalIcon" cover></v-img>
</template>

<script>
export default {
  name: 'TheGoalImageComponent',
  props: {
    goalId: {
      type: Number,
      required: true,
    },
  },
  computed: {
    loadGoalIcon() {
      return '/img/ods-icons/pt-br/SDG-' + this.goalId + '.svg'
    },
  },
}
</script>
