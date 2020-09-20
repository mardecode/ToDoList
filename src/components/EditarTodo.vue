<template lang="pug">
.editarTodo
	modal(name="edit-modal", :adaptive="true", :height="200", v-if="itemSelected.existe && itemSelected.tipo === 'todo'")
		h1 
		form(@submit.prevent="submitEditTodo()")
			input.inputstyle(v-model="itemSelected.name", required)
			p Fecha de finalización
			date-picker(v-model="fechaa", format="YYYY-MM-DD", type="date", placeholder="Seleccionar fecha", required, :editable="false", :clearable="false")
			button.boton(type="submit") Editar
</template>

<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import { firebase } from "@/firebase";

import { mapState, mapActions, mapGetters } from "vuex";
export default {
	name: "EditarTodo",
	data() {
		return {
			// fecha: new Date(),
		};
	},
	computed: {
		...mapState(["itemSelected"]),
		...mapGetters(["getDateTodo"]),
		fechaa: {
			get() {
				return this.getDateTodo;
			},
			set(value) {
				if (value != null) this.$store.state.itemSelected.endDate = firebase.firestore.Timestamp.fromDate(value);
			},
		},
	},
	components: { DatePicker },
	methods: {
		...mapActions(["editTodo", "getTodos"]),
		hideTodoModal() {
			this.$modal.hide("edit-modal");
		},
		async submitEditTodo() {
			await this.editTodo();
			this.hideTodoModal();
			await this.getTodos();
		},
	},
};
</script>

<style lang="sass">
@import '@/assets/sass/main'
.editarTodo
	button
		margin-left: 10px
</style>