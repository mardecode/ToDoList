<template lang="pug">
    div.inicio
        Barra
        Buscador
        br
        h1 Bienvenida {{usuario.nombre}} as
        button.boton New to-do
        br
        br
        Todo(texto='No procrastinar' isChecked=true)
        Todo(texto='No procrastinar' isChecked=false)
        

  
    
</template>

<script>
import Barra from "@/components/Barra.vue";
import Buscador from "@/components/Buscador.vue";
import Todo from "@/components/Todo.vue";
import { mapState } from "vuex";

export default {
	name: "Inicio",
	components: {
		Barra,
		Buscador,
		Todo,
	},
	methods: {},
	computed: {
		...mapState(["usuario"]),
	},
};
</script>

<style lang="sass">
@import '@/assets/sass/main'
.about
  background-color: $color-primario
</style>
