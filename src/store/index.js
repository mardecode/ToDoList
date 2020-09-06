import Vue from "vue";
import Vuex from "vuex";
import { firebase, auth, db } from "@/firebase";

import router from "@/router";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		usuario: "",
	},
	mutations: {
		newUser(state, payload) {
			if (payload === null) {
				state.usuario = "";
			} else {
				state.usuario = payload;
			}
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
	},

	modules: {},
});
