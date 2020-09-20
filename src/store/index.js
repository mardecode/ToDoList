import Vue from "vue";
import Vuex from "vuex";
import { firebase, auth, db } from "@/firebase";

import router from "@/router";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		usuario: "",
		habits: [],
		todos: [],
		date: new Date(),
		itemSelected: { endDate: firebase.firestore.Timestamp.fromDate(new Date()), existe: false },
	},
	getters: {
		getDateTodo(state) {
			return state.itemSelected.endDate.toDate();
		},
		getDateString(state) {
			return state.date.toISOString().slice(0, 10);
		},
		getDateLetra(state) {
			console.log(state.date.toISOString());
			const dia = state.date.getDay();
			if (dia === 0) return "D";
			else if (dia === 1) return "L";
			else if (dia === 2) return "M";
			else if (dia === 3) return "X";
			else if (dia === 4) return "J";
			else if (dia === 5) return "V";
			else if (dia === 6) return "S";
			else {
				console.log("ERROR FECHA NO VALIDA ", "getDateLetra()");
			}
		},
	},
	mutations: {
		newUser(state, payload) {
			if (payload === null) {
				state.usuario = "";
			} else {
				state.usuario = payload;
			}
		},
		setHabits(state, payload) {
			state.habits = payload;
		},
		setTodos(state, payload) {
			state.todos = payload;
		},
		setDeleteTodo(state, payload) {
			state.todos = state.todos.filter((item) => item.id != payload);
		},
		setDeleteItem(state, payload) {
			state.habits = state.habits.filter((item) => item.id != payload);
		},
		setEditItem(state, payload) {
			state.itemSelected = payload;
			// console.log("se ingresó a setEditITem");
			// console.log(state.itemSelected);
			// console.log("el que no pone prints no sabe programar");
		},
	},
	actions: {
		callEditItem({ commit }, item) {
			commit("setEditItem", item);
		},

		async setUser({ commit }, user) {
			try {
				const doc = await db
					.collection("usuarios")
					.doc(user.uid)
					.get();
				if (doc.exists) {
					commit("newUser", doc.data());
				} else {
					const usuario = {
						nombre: user.displayName,
						email: user.email,
						uid: user.uid,
						foto: user.photoURL,
					};
					await db
						.collection("usuarios")
						.doc(usuario.uid)
						.set(usuario);
					console.log("Usuario Guardado");
					commit("newUser", usuario);
				}
			} catch (error) {
				console.log(error);
			}
		},
		async google(context) {
			console.log("botsdon de ingreso");
			const provider = new firebase.auth.GoogleAuthProvider();
			firebase.auth().languageCode = "es";
			try {
				const result = await firebase.auth().signInWithPopup(provider);
				const user = result.user;
				console.log(user);
				context.dispatch("setUser", user);
				router.push({ name: "Inicio" });
			} catch (error) {
				console.log(error);
			}
		},
		async createHabit(context, newHabit) {
			try {
				// console.log(newHabit);
				const createdHabit = await db
					.collection("habits")
					.doc(this.state.usuario.uid)
					.collection("list")
					.add(newHabit);
				console.log(createdHabit);
			} catch (error) {
				console.log(error);
			}
		},
		async getHabits(ctx) {
			try {
				// console.log("aaaaaaa", this.state.usuario.uid);

				//Obtiene los Referencias a los habitos segun el dia de la semana ( getDateLetra )
				const listHabits = await db
					.collection("habits")
					.doc(this.state.usuario.uid)
					.collection("list")
					.where("confDays." + ctx.getters.getDateLetra, "==", true)
					.get();
				
				console.log(listHabits);

				const newlistHabits = [];

				//obtiene una referencia para el día actual ( getDateString [fecha] )

				listHabits.forEach(async (doc) => {
					const n_habit = await doc.ref
						.collection("dias")
						.doc(ctx.getters.getDateString)
						.get();
					// console.log(n_habit.data());
					if (n_habit.data()) newlistHabits.push({ id: doc.id, ...doc.data(), check: n_habit.data().check });
					else newlistHabits.push({ id: doc.id, ...doc.data(), check: false });
				});
				ctx.commit("setHabits", newlistHabits);
			} catch (error) {
				console.log(error);
			}
		},
		async getTodos(ctx) {
			try {
				const listTodos = await db
					.collection("todos")
					.doc(this.state.usuario.uid)
					.collection("list")
					.orderBy("endDate", "asc")
					.get();
				const newlistTodos = [];
				listTodos.forEach((doc) => {
					// console.log({ id: doc.id, ...doc.data() });
					newlistTodos.push({ id: doc.id, ...doc.data() });
				});
				ctx.commit("setTodos", newlistTodos);
			} catch (error) {
				console.log(error);
				console.log("hola hola");
			}
		},
		async editTodo(context) {
			try {
				await db
					.collection("todos")
					.doc(this.state.usuario.uid)
					.collection("list")
					.doc(this.state.itemSelected.id)
					.update({ name: this.state.itemSelected.name, endDate: this.state.itemSelected.endDate });
			} catch (error) {
				console.log(error);
			}
		},
		async editHabit(context) {
			try {
				// console.log(context.state.itemSelected);
				await db
					.collection("habits")
					.doc(this.state.usuario.uid)
					.collection("list")
					.doc(this.state.itemSelected.id)
					.update(this.state.itemSelected);
				// console.log(createdHabit);
			} catch (error) {
				console.log(error);
			}
		},
		async createTodo(context, newTodo) {
			try {
				const createTodo = await db
					.collection("todos")
					.doc(this.state.usuario.uid)
					.collection("list")
					.add(newTodo);
			} catch (error) {
				console.log(error);
			}
		},
		async checkTodo(context, todo) {
			try {
				db.collection("todos")
					.doc(this.state.usuario.uid)
					.collection("list")
					.doc(todo.id)
					.update({
						check: todo.check,
					});
			} catch (error) {
				console.log(error);
			}
		},
		async checkHabit(context, habit) {
			console.log(habit, context.getters.getDateString);
			try {
				//Solo sobrescribe "check"
				await db
					.collection("habits")
					.doc(this.state.usuario.uid)
					.collection("list")
					.doc(habit.id)
					.collection("dias")
					.doc(context.getters.getDateString)
					.set(
						{
							check: habit.check,
						},
						{ merge: true }
					);
			} catch (error) {
				console.log(error);
			}
		},
		async deleteTodo({ commit }, itemid) {
			// console.log("llegó correctamente" + itemid);
			try {
				await db
					.collection("todos")
					.doc(this.state.usuario.uid)
					.collection("list")
					.doc(itemid)
					.delete();
				commit("setDeleteTodo", itemid);
			} catch (error) {
				console.log(error);
			}
		},
		async deleteHabit({ commit }, itemid) {
			// console.log("llegó correctamente" + itemid);
			try {
				await db
					.collection("habits")
					.doc(this.state.usuario.uid)
					.collection("list")
					.doc(itemid)
					.delete();
				commit("setDeleteItem", itemid);
			} catch (error) {
				console.log(error);
			}
		},
	},

	modules: {},
});
