<template lang="pug">
  div.inicio
    Barra
    Buscador
    br
    h1 Bienvenida {{usuario.nombre}} as
    button.boton New to-do
  
    
</template>

<script>
import Barra from '@/components/Barra.vue'
import Buscador from '@/components/Buscador.vue'
import { mapState } from "vuex";

export default {
  name: 'Inicio',
  components:{
    Barra, Buscador
  },
  methods: {
    },
  computed: {
    ...mapState(['usuario'])
  },

}
</script>

<style lang="sass">
  @import '@/assets/sass/main'
  .about
    background-color: $color-primario
</style>

