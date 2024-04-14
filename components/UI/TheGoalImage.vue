<template>
  <v-img :src="loadGoalIcon" height="100" width="100" cover></v-img>
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
      return '/img/ods_icons/' + this.goalId + '.png'
    },
  },
}
</script>
