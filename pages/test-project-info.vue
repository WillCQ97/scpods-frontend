<template>
  <div>
    <ProjectFormInfoComponent />
    <hr />
    <NovaAcaoForm />
  </div>
</template>

<script>
/* TODO: VERIFICAR UTILIZADAÇÃO DESSA PÁGINA E REMOVÊ-LA
 * JUNTAMENTE COM O COMPONENTE PROJECTINFO E O JSON DE CAMPOS
 */

import ProjectFormInfoComponent from '~/components/ProjectInfo.vue'
import NovaAcaoForm from '~/components/Acoes/NovaAcaoForm.vue'

export default {
  components: { ProjectFormInfoComponent, NovaAcaoForm },
}
</script>
