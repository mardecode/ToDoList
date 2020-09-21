<template lang="pug">
.buscador
	input.inputstyle(type="text", placeholder="Buscar")
</template>

<script>
export default {
	name: "Buscador",
};
</script>

<style lang="sass">
@import '@/assets/sass/main'
.buscador
    margin-top: 15px
    margin-bottom: 15px
    text-align: center
</style>
