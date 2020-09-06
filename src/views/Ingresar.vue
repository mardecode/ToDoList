<template lang="pug">
.home
  h1 TAMA
  .home__intro
    p Hola ! me encanta la organización y durante mucho tiempo estuve buscando la app perfecta para anotar mis tareas, pero no encontré una que tuviera todo lo que deseo.
    p Así que dije <strong>"Yo soy programadora"</strong> por qué no lo hago yo ?!
    p Y así nació <strong>TAMA</strong>

    button.boton(@click="google") 
      span.iconify(data-icon="bx:bxl-google")
      span Entrar con Google

    p.home__aclaracion Aún se encuentra en desarrollo
    p.home__posdata Hecho con <3 by margarcuae
</template>

<script>
import { firebase, auth } from "@/firebase";
import { mapState, mapMutations, mapActions } from "vuex";
import router from "@/router";
export default {
  name: "Ingresar",
  methods: {
    ...mapActions(["setUser", "google"]),

    /* -------------------------------------------------------------------------- */
  },
};
</script>

<style lang="sass">
@import '@/assets/sass/main'
.home
  // background-color: red
  margin: 40% 20%
  text-align: center
  h1
    font-weight: 400
  p
    color: $color-plomo
    font-size: 13px
  button
    font-size: 20px

  &__intro
    text-align: center
  &__aclaracion
    margin: 250px 0 0 0
    font-size: 10px
  &__posdata
    margin: 0
    font-size: 10px
</style>