<template lang="pug">
    div.crearTodo
        modal(name='todo-modal' :adaptive='true')
            h1 Crear nuevo To-Do
            form(@submit.prevent='submitCreateTodo()')
                input(placeholder='Nuevo to-do' required v-model="newToDo.name")
                p Fecha de Finalización
                input(type='datetime-local' required v-model="newToDo.endDate")
                button(type='submit') Crear
</template>

<script>
import { mapActions, mapState } from "vuex";
import { firebase } from "@/firebase";
export default {
	name: "CrearTodo",
	data() {
		return {
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
			this.newToDo.endDate = firebase.firestore.Timestamp.fromDate(new Date(this.newToDo.endDate));
			// this.todos.push(this.newToDo);
			// console.log(this.newToDo);
			await this.createTodo(this.newToDo);
			this.hideTodoModal();
			this.newToDo.name = "";
			await this.getTodos();
		},
	},
};
</script>
