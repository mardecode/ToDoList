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
	},
	actions: {
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
				const listHabits = await db
					.collection("habits")
					.doc(this.state.usuario.uid)
					.collection("list")
					.get();
				const newlistHabits = [];
				console.log(listHabits);
				listHabits.forEach((doc) => {
					newlistHabits.push(doc.data());
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
					newlistTodos.push(doc.data());
				});
				ctx.commit("setTodos", newlistTodos);
			} catch (error) {
				console.log(error);
				console.log("hola hola");
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
	},

	modules: {},
});
