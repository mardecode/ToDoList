<template lang="pug">
.inicio
	Barra
	Buscador
	.creacion
		button.boton(@click="showTodoModal") New to-do
		button.boton(@click="showHabitModal") New Habit
	h2.container5 To-dos

	template(v-for="todo in todos")
		Todo(:texto="todo.name", :isChecked="todo.check", :id="todo.id", tipo="todo", :item="todo")

	h2.container5 Habits
	template(v-for="h in habits")
		Todo(:texto="h.name", :isChecked="h.check", :id="h.id", tipo="habit", :item="h")

	CreateHabit
	CreateTodo

	EditarTodo
	EditarHabit

	h4.logout(@click="logout()") Logout
</template>

<script>
import { mapState, mapActions } from "vuex";
import EditarTodo from "@/components/EditarTodo.vue";
import EditarHabit from "@/components/EditarHabit.vue";

import Barra from "@/components/Barra.vue";
import Buscador from "@/components/Buscador.vue";
import CreateHabit from "@/components/CreateHabit.vue";
import CreateTodo from "@/components/CreateTodo.vue";
import Todo from "@/components/Todo.vue";

export default {
	name: "Inicio",
	data() {
		return {};
	},
	components: {
		Barra,
		Buscador,
		Todo,
		CreateHabit,
		CreateTodo,
		EditarTodo,
		EditarHabit,
	},

	mounted() {
		this.getHabits();
		this.getTodos();
	},

	methods: {
		...mapActions(["getHabits", "getTodos", "logout"]),
		showHabitModal() {
			this.$modal.show("habit-modal");
		},
		showTodoModal() {
			this.$modal.show("todo-modal");
		},
	},
	computed: {
		...mapState(["usuario", "habits", "todos"]),
	},
};
</script>

<style lang="sass">
@import '@/assets/sass/main'
.about
	background-color: $color-primario

.creacion
	margin-right: 30px
	margin-left: 30px
	display: grid
	grid-template-columns: 1fr 1fr
	// justify-items: center
	align-items: center
	grid-gap: 15px

.logout
	position: fixed
	bottom: 5px
	display: flex
	width: 100%
	justify-content: center
</style>
