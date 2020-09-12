<template lang="pug">
.todo.container5
	i.far.fa-square.todo__check(v-bind:class="{ nomostrar: check }", v-on:click="cambiar")
	i.fas.fa-check-square.todo__check(v-bind:class="{ nomostrar: !check }", v-on:click="cambiar")
	.todo__item
		p.todo__item__texto {{ texto }}
		i.fas.fa-trash.todo__item__basura
</template>

<script>
import { mapActions } from "vuex";
export default {
	name: "Todo",
	props: {
		id: String,
		texto: String,
		isChecked: Boolean,
	},
	data() {
		return {
			check: this.isChecked,
		};
	},
	methods: {
		...mapActions(["checkTodo"]),
		cambiar() {
			// console.log("si hace click");
            this.check = !this.check;
            this.checkTodo({id:this.id,check: this.check})
		},
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
