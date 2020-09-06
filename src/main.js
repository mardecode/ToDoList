import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { auth } from "./firebase";
import VModal from "vue-js-modal";

Vue.config.productionTip = false;
Vue.use(VModal);

auth.onAuthStateChanged(async (user) => {
	if (user) {
		await store.dispatch("setUser", user);
	} else {
		await store.dispatch("setUser", user);
	}

	new Vue({
		router,
		store,
		render: (h) => h(App),
	}).$mount("#app");
});
