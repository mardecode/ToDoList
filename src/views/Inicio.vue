<template lang="pug">
.inicio
	Barra
	Buscador
	br
	h1 Bienvenida {{ usuario.nombre }} as
	button.boton New to-do
	button.boton(@click="showHabitModal") New Habit

	Todo(texto="No procrastinar", isChecked)
	Todo(texto="No procrastinar", isChecked=false)

	h2 Habits
	template(v-for="h in habits")
		Todo(:texto="h.name", isChecked=false)

	CreateHabit
	
</template>

<script>
import Barra from "@/components/Barra.vue";
import Buscador from "@/components/Buscador.vue";
import CreateHabit from "@/components/CreateHabit.vue";
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
		CreateHabit
	},

	mounted() {
		this.getHabits();
	},

	methods: {
		...mapActions(["getHabits"]),
		showHabitModal() {
			this.$modal.show("habit-modal");
		},
	},
	computed: {
		...mapState(["usuario", "habits"]),
	},
};
</script>

<style lang="sass">
@import '@/assets/sass/main'
.about
	background-color: $color-primario
.btnActive
	background-color: $color-primario
</style>
