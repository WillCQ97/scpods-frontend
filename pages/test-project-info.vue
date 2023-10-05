<template>
  <div>
    <ProjectFormInfoComponent />
    <hr>
    <ProjectFormComponent />
  </div>
</template>
<script>
import ProjectFormInfoComponent from '~/components/ProjectInfo.vue'
import ProjectFormComponent from '~/components/ProjectForm.vue'
export default {
  components: { ProjectFormInfoComponent, ProjectFormComponent },
}
</script>