<template lang="pug">
.EditarTodo
	modal(name="edit-modal", :adaptive="true")
		h1 Editar
		form
			input.inputstyle(v-model="itemSelected.name", required)
			p Fecha de finalización
			date-picker(v-model="fecha", format="YYYY-MM-DD", type="date", placeholder="Seleccionar fecha", required)
			button.boton(type="submit") Crear
</template>

<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";

import { mapState, mapActions } from "vuex";
export default {
	name: "Editar",
	data() {
		return {
			fecha: new Date(),
		};
	},
	computed: {
		...mapState(["itemSelected"]),
	},
	beforeUpdate() {
		this.fecha = this.itemSelected.endDate.toDate();
		// console.log("before update");
		// console.log("este es el item");
		// console.log(this.itemSelected);
	},
	components: { DatePicker },
};
</script>