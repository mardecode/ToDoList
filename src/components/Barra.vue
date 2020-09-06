<template lang="pug">
    div.barra
        input(type='date' id=0)
        //- p 1 de Septiembre del 2020
</template>
<script>
export default {
    name:'Barra'
}
</script>

<style lang="sass">
    @import '@/assets/sass/main'
    .barra
        display: flex
        padding: 15px 10px
        background-color: $color-primario
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15)
        input
            background-color: $color-primario
            border: 0 solid
            // margin: 0 30px 0 5px
            outline: none
            // margin-right: 5px

</style>