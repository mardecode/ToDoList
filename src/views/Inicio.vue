<template lang="pug">
.inicio
	Barra
	Buscador
	br
	h1 Bienvenida {{ usuario.nombre }} as
	button.boton New to-do
	button.boton(@click="showHabitModal") New Habit

	Todo(texto='No procrastinar' isChecked=true)
	Todo(texto='No procrastinar' isChecked=false)

	h2 Habits
	template(v-for="h in habits" )
		Todo(:texto='h.name' isChecked=false)



	modal(name="habit-modal", :adaptive="true")
		form(@submit.prevent="submitCreateHabit()")
			h1 Crear Habit
			input(placeholder="Nombre", v-model="newHabit.name", required)
			div
				button(
					type="button",
					@click="clickDia('D')",
					v-bind:class="{ btnActive: this.newHabit.confDays['D'] }"
				) D

				button(
					type="button",
					@click="clickDia('L')",
					v-bind:class="{ btnActive: this.newHabit.confDays['L'] }"
				) L

				button(
					type="button",
					@click="clickDia('M')",
					v-bind:class="{ btnActive: this.newHabit.confDays['M'] }"
				) M

				button(
					type="button",
					@click="clickDia('X')",
					v-bind:class="{ btnActive: this.newHabit.confDays['X'] }"
				) X

				button(
					type="button",
					@click="clickDia('J')",
					v-bind:class="{ btnActive: this.newHabit.confDays['J'] }"
				) J

				button(
					type="button",
					@click="clickDia('V')",
					v-bind:class="{ btnActive: this.newHabit.confDays['V'] }"
				) V

				button(
					type="button",
					@click="clickDia('S')",
					v-bind:class="{ btnActive: this.newHabit.confDays['S'] }"
				) S

			//- input(type="time")
			input(type="date", v-model="newHabit.fechaInicio", required)
			input(type="date", v-model="newHabit.fechaFin", required)
			br
			button(type="submit") Guardar

        
</template>

<script>
import Barra from "@/components/Barra.vue";
import Buscador from "@/components/Buscador.vue";
import { mapState, mapActions } from "vuex";
import Todo from "@/components/Todo.vue";

export default {
	name: "Inicio",
	data() {
		return {
			newHabit: {
				name: "",
				confDays: {
					L: false,
					M: false,
					X: false,
					J: false,
					V: false,
					S: false,
					D: false,
				},
				fechaInicio: "",
				fechaFin: "",
			},
		};
	},
	components: {
		Barra,
		Buscador,
		Todo,
	},

	mounted() {
		this.getHabits();
	},

	methods: {
		...mapActions(["createHabit", "getHabits"]),
		clickDia(dia) {
			// console.log("aaaa");
			this.newHabit.confDays[dia] = !this.newHabit.confDays[dia];
		},
		showHabitModal() {
			this.$modal.show("habit-modal");
		},
		hideHabitModal() {
			this.$modal.hide("habit-modal");
		},
		async submitCreateHabit() {
			await this.createHabit(this.newHabit);
			this.hideHabitModal();
			await this.getHabits();
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
