<template lang="pug">
.todo.container5
	i.far.fa-square.todo__check(v-bind:class="{ nomostrar: check }", v-on:click="cambiar")
	i.fas.fa-check-square.todo__check(v-bind:class="{ nomostrar: !check }", v-on:click="cambiar")
	.todo__item(v-bind:class="{ todo__hecho: check }")
		p.todo__item__texto(v-on:click="showEditModal(item)") {{ texto }}
		i.fas.fa-trash.todo__item__basura(@click="deleteItemview(id)")
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
	name: "Todo",
	props: {
		id: String,
		texto: String,
		isChecked: Boolean,
		tipo: String,
		item: Object,
	},

	data() {
		return {
			check: this.isChecked,
		};
	},
	computed: {
		...mapState(["itemSelected"]),
	},
	components: {
		// Editar,
	},
	methods: {
		...mapActions(["callEditItem", "checkTodo", "checkHabit", "deleteTodo", "deleteHabit"]),
		showEditModal(todocompleto) {
			if (this.tipo === "todo") {
				this.callEditItem({ tipo: "todo", existe: true, ...todocompleto });
				this.$modal.show("edit-modal");
			} else if (this.tipo === "habit") {
				this.callEditItem({ tipo: "habit", existe: true, ...todocompleto });
				this.$modal.show("edit-habit-modal");
			}
			console.log("haciendo click en texto");
			console.log(todocompleto);
		},

		deleteItemview(itemid) {
			if (this.tipo === "todo") {
				this.deleteTodo(itemid);
			} else if (this.tipo === "habit") {
				this.deleteHabit(itemid);
			} else {
				console.log("error: tipo no conocido");
			}
		},
		cambiar() {
			// console.log("si hace click");
			this.check = !this.check;

			if (this.tipo === "todo") this.checkTodo({ id: this.id, check: this.check });
			else if (this.tipo === "habit") this.checkHabit({ id: this.id, check: this.check });
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
	&__hecho
		// color: red
		opacity: 0.5
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
