<template lang="pug">
.createHabit
	modal(name="edit-habit-modal", :adaptive="true")
		form(@submit.prevent="submitEditHabit()", v-if="itemSelected.existe && itemSelected.tipo === 'habit'")
			h1 Editar Habit
			input.inputstyle(placeholder="Nombre", v-model="itemSelected.name", required)
			div
				button(type="button", @click="clickDia('D')", v-bind:class="[this.itemSelected.confDays['D'] ? 'btnActive' : ' btnNoActive']") D

				button(type="button", @click="clickDia('L')", v-bind:class="[this.itemSelected.confDays['L'] ? 'btnActive' : ' btnNoActive']") L

				button(type="button", @click="clickDia('M')", v-bind:class="[this.itemSelected.confDays['M'] ? 'btnActive' : ' btnNoActive']") M

				button(type="button", @click="clickDia('X')", v-bind:class="[this.itemSelected.confDays['X'] ? 'btnActive' : ' btnNoActive']") X

				button(type="button", @click="clickDia('J')", v-bind:class="[this.itemSelected.confDays['J'] ? 'btnActive' : ' btnNoActive']") J

				button(type="button", @click="clickDia('V')", v-bind:class="[this.itemSelected.confDays['V'] ? 'btnActive' : ' btnNoActive']") V

				button(type="button", @click="clickDia('S')", v-bind:class="[this.itemSelected.confDays['S'] ? 'btnActive' : ' btnNoActive']") S

			//- input(type="time")
			//- input(type="date", v-model="itemSelected.fechaInicio", required)
			date-picker(v-model="fechaInicio", format="YYYY-MM-DD", type="date", placeholder="Inicio", required)
			date-picker(v-model="fechaFin", format="YYYY-MM-DD", type="date", placeholder="Fin", required)
			//- input(type="date", v-model="newHabit.fechaFin", required)

			button.boton(type="submit") Guardar
</template>

<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import { firebase } from "@/firebase";

import { mapState, mapActions, mapGetters } from "vuex";
export default {
	name: "EditarHabit",
	data() {
		return {
			// fecha: new Date(),
		};
	},
	computed: {
		...mapState(["itemSelected"]),
		// ...mapGetters(["getDateTodo"]),
		fechaInicio: {
			get() {
				return this.itemSelected.fechaInicio.toDate();
			},
			set(value) {
				if (value != null) this.$store.state.itemSelected.fechaInicio = firebase.firestore.Timestamp.fromDate(value);
			},
		},

		fechaFin: {
			get() {
				return this.itemSelected.fechaFin.toDate();
			},
			set(value) {
				if (value != null) this.$store.state.itemSelected.fechaFin = firebase.firestore.Timestamp.fromDate(value);
			},
		},
	},
	components: { DatePicker },
	methods: {
		...mapActions(["editHabit", "getHabits"]),
		hideHabitModal() {
			this.$modal.hide("edit-habit-modal");
		},
		clickDia(dia) {
			console.log(dia);
			// console.log(this.$store.state.itemSelected);
			this.$store.state.itemSelected.confDays[dia] = !this.$store.state.itemSelected.confDays[dia];
		},
		async submitEditHabit() {
			await this.editHabit();
			this.hideHabitModal();
			await this.getHabits();
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