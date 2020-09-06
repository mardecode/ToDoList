<template lang="pug">
    div.todo.container5
        
        i(class='far fa-square todo__check' v-bind:class="{nomostrar:isChecked}")
        i.fas.fa-check-square.todo__check(v-bind:class="{nomostrar:!isChecked}")
        div.todo__item
            p.todo__item__texto {{texto}}
            i(class="fas fa-trash todo__item__basura")
</template>

<script>
export default {
	name: "Todo",
	props: {
		texto: String,
		isChecked: Boolean,
	},
};
</script>

<style lang="sass">
@import '@/assets/sass/main'

.todo
    display: flex
    // text-align: center
    align-items: center
    margin-bottom: 5px
    p
        margin: 0
    &__check
        color: $color-primario
    &__item
        margin-left: 10px
        width: 100%
        display: grid
        grid-template-columns: 80% 20%
        align-items: center
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25)
        border-radius: 10px
        padding: 6px

        &__basura
            justify-self: end



.fa-trash
    color: white
    background-color: $color-secundario
    padding: 6px
    border-radius: 14px
</style>
