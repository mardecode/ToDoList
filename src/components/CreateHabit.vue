<template lang="pug">
div
	modal(name="habit-modal", :adaptive="true")
		form(@submit.prevent="submitCreateHabit()")
			h1 Crear Habit
			input(placeholder="Nombre", v-model="newHabit.name", required)
			div
				button(type="button", @click="clickDia('D')", v-bind:class="{ btnActive: this.newHabit.confDays['D'] }") D

				button(type="button", @click="clickDia('L')", v-bind:class="{ btnActive: this.newHabit.confDays['L'] }") L

				button(type="button", @click="clickDia('M')", v-bind:class="{ btnActive: this.newHabit.confDays['M'] }") M

				button(type="button", @click="clickDia('X')", v-bind:class="{ btnActive: this.newHabit.confDays['X'] }") X

				button(type="button", @click="clickDia('J')", v-bind:class="{ btnActive: this.newHabit.confDays['J'] }") J

				button(type="button", @click="clickDia('V')", v-bind:class="{ btnActive: this.newHabit.confDays['V'] }") V

				button(type="button", @click="clickDia('S')", v-bind:class="{ btnActive: this.newHabit.confDays['S'] }") S

			//- input(type="time")
			input(type="date", v-model="newHabit.fechaInicio", required)
			input(type="date", v-model="newHabit.fechaFin", required)
			br
			button(type="submit") Guardar
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
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

	methods: {
		...mapActions(["createHabit", "getHabits"]),

		clickDia(dia) {
			// console.log("aaaa");
			this.newHabit.confDays[dia] = !this.newHabit.confDays[dia];
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
};
</script>
