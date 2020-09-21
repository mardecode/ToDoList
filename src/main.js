import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { auth } from "./firebase";
import VModal from "vue-js-modal";

Vue.config.productionTip = false;
Vue.use(VModal);

auth.onAuthStateChanged((user) => {
	store.commit("newUser", user);
	new Vue({
		router,
		store,
		render: (h) => h(App),
	}).$mount("#app");

	if (user) {
		store.dispatch("setUser", user);
	}
});
