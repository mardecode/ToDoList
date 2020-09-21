<template lang="pug">
.createHabit
	modal(name="habit-modal", :adaptive="true")
		form(@submit.prevent="submitCreateHabit()")
			h1 Crear Habit
			input.inputstyle(placeholder="Nombre", v-model="newHabit.name", required)
			div
				button(type="button", @click="clickDia('D')", v-bind:class="[this.newHabit.confDays['D'] ? 'btnActive' : ' btnNoActive']") D

				button(type="button", @click="clickDia('L')", v-bind:class="[this.newHabit.confDays['L'] ? 'btnActive' : ' btnNoActive']") L

				button(type="button", @click="clickDia('M')", v-bind:class="[this.newHabit.confDays['M'] ? 'btnActive' : ' btnNoActive']") M

				button(type="button", @click="clickDia('X')", v-bind:class="[this.newHabit.confDays['X'] ? 'btnActive' : ' btnNoActive']") X

				button(type="button", @click="clickDia('J')", v-bind:class="[this.newHabit.confDays['J'] ? 'btnActive' : ' btnNoActive']") J

				button(type="button", @click="clickDia('V')", v-bind:class="[this.newHabit.confDays['V'] ? 'btnActive' : ' btnNoActive']") V

				button(type="button", @click="clickDia('S')", v-bind:class="[this.newHabit.confDays['S'] ? 'btnActive' : ' btnNoActive']") S

			//- input(type="time")
			//- input(type="date", v-model="newHabit.fechaInicio", required)
			date-picker(v-model="newHabit.fechaInicio", format="YYYY-MM-DD", type="date", placeholder="Inicio", required, :editable="false", :clearable="false")
			date-picker(v-model="newHabit.fechaFin", format="YYYY-MM-DD", type="date", placeholder="Fin", required, :editable="false", :clearable="false")
			//- input(type="date", v-model="newHabit.fechaFin", required)

			button.boton(type="submit") Guardar
</template>

<script>
import { mapActions } from "vuex";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
export default {
	components: { DatePicker },
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

<style lang="sass">
@import '@/assets/sass/main'
.btnActive
	background-color: $color-primario
.btnNoActive
	background-color: $color-secundario

.createHabit
	.mx-datepicker
		width: 120px
		margin-right: 5px
	button
		margin-right: 5px
		margin-top: 10px
		margin-bottom: 10px
		@include cuerpoboton()
</style>
