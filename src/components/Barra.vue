<template lang="pug">
.barra
	date-picker( @input="changeDate(value1)" v-model="value1", format="YYYY-MM-DD", type="date", placeholder="Seleccionar fecha"  :editable="false", :clearable="false")
</template>
<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import { mapActions } from "vuex";

export default {
	name: "Barra",
	components: { DatePicker },
	data() {
		return {
			value1: new Date(),
		};
	},
	methods: {
		...mapActions(["callSetDate", "getTodos", "getHabits"]),
		async changeDate(fecha) {
			await this.callSetDate(fecha);
			// console.log("hola bola");
			// console.log(fecha);
			await this.getTodos();
			await this.getHabits();
		},
	},
};
</script>

<style lang="sass">
@import '@/assets/sass/main'
.barra
    // display: flex
    padding: 15px 10px
    text-align: center
    background-color: $color-primario
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15)

    input
        // background-color: $color-primario
        border: 0 solid
        // margin: 0 30px 0 5px
        outline: none
        // margin-right: 5px
    p
        margin: 0
        color: white
        font-weight: 600
</style>
