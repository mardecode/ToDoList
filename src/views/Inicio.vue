<template lang="pug">
.inicio
	Barra
	br
	Buscador
	br
	br
	div.creacion
		button.boton(@click="showTodoModal") New to-do
		button.boton(@click="showHabitModal") New Habit
	h2.container5 To-dos

	template(v-for="todo in todos")
		Todo(:texto="todo.name", :isChecked="todo.check")


	h2.container5 Habits
	template(v-for="h in habits")
		Todo(:texto="h.name", isChecked=false)

	CreateHabit
	CreateTodo
	
</template>

<script>
import Barra from "@/components/Barra.vue";
import Buscador from "@/components/Buscador.vue";
import CreateHabit from "@/components/CreateHabit.vue";
import CreateTodo from "@/components/CreateTodo.vue";
import { mapState, mapActions } from "vuex";
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
	},

	mounted() {
		this.getHabits();
		this.getTodos();
	},

	methods: {
		...mapActions(["getHabits", "getTodos"]),
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
.btnActive
	background-color: $color-primario
.creacion
	margin-right: 30px
	margin-left: 30px
	display: grid
	grid-template-columns: 1fr 1fr
	// justify-items: center
	align-items: center
	grid-gap: 15px
</style>
