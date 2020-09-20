<template lang="pug">
.crearTodo
	modal(name="todo-modal", :adaptive="true")
		h1 Crear nuevo To-Do
		form(@submit.prevent="submitCreateTodo()")
			input.inputstyle(placeholder="Nuevo to-do", required, v-model="newToDo.name")
			p Fecha de Finalización
			date-picker(v-model="newToDo.endDate", format="YYYY-MM-DD", type="date", placeholder="Seleccionar fecha", required, :editable="false", :clearable="false")
			button.boton(type="submit") Crear
			//- input(type="datetime-local", required, v-model="newToDo.endDate")
</template>

<script>
import { mapActions, mapState } from "vuex";
import { firebase } from "@/firebase";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
export default {
	name: "CrearTodo",
	components: { DatePicker },
	data() {
		return {
			value1: new Date(),
			newToDo: {
				name: "",
				check: false,
				startDate: firebase.firestore.Timestamp.fromDate(new Date()),
				endDate: firebase.firestore.Timestamp.fromDate(new Date()),
			},
		};
	},
	computed: {
		...mapState(["todos"]),
	},
	methods: {
		...mapActions(["createTodo", "getTodos"]),
		hideTodoModal() {
			this.$modal.hide("todo-modal");
		},
		async submitCreateTodo() {
			await this.createTodo(this.newToDo);
			this.hideTodoModal();
			this.newToDo.name = "";
			await this.getTodos();
		},
	},
};
</script>

<style lang="sass">
@import '@/assets/sass/main'
.crearTodo
	button
		margin-left: 10px
</style>