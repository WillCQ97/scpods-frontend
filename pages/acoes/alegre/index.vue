<template>
  <div>
    <h1>Página para alegre</h1>
    <p>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit ut
      laudantium iusto, magnam culpa ipsam, alias amet natus dolore error ad quo
      eaque, reiciendis labore in optio iure. Unde, incidunt.
    </p>
    <p>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi rerum
      vitae accusamus repudiandae saepe quos. Facilis perferendis nemo fugiat
      quasi quos autem neque quidem, tenetur totam eaque at qui pariatur.
    </p>
    <!--TODO: COLOCAR ALGUNS CARDS INFORMATIVOS SOBRE OS PROJETOS DE FORMA GERAL
    O QUE SERIA OUTRO COMPONENTE (DASHBOARD?) -->
    <VisualMap :bounds="bounds" :center="center" :feature="feature"/>
  </div>
</template>

<script>
// TODO: CORRIGIR DIFERENÇA ENTRE O GEOJSON E A LAYER DO MAPA
import alegreFeature from '~/assets/features/alegre_min.json';

export default {
  name: 'AlegrePage',

  data() {
    return {
      // TODO: UTILIZAR UMA ÁREA MENOR EM VOLTA DO CAMPUS
      bounds: [
        [-20.75885, -41.53911],
        [-20.76464, -41.53211],
      ],
      center: [-20.76161, -41.536],
      feature: alegreFeature,
    }
  },
}
</script>
