import Vue from "vue";
import VueRouter from "vue-router";

import { auth } from "@/firebase";

Vue.use(VueRouter);

const routes = [
	{
		path: "/ingresar",
		name: "Ingresar",
		component: () => import(/* webpackChunkName: "about" */ "../views/Ingresar.vue"),
	},
	{
		path: "/",
		name: "Inicio",
		component: () => import(/* webpackChunkName: "about" */ "../views/Inicio.vue"),
		meta: { requiresAuth: true },
	},
	{
		path: "/editar/:id",
		name: "Editar",
		component: () => import(/* webpackChunkName: "editar" */ "../components/Editar.vue"),
		meta: { requiresAuth: true },
	},
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

router.beforeEach((to, from, next) => {
	const usuario = auth.currentUser;
	if (to.matched.some((record) => record.meta.requiresAuth)) {
		if (usuario) {
			next();
		} else {
			next({ name: "Ingresar" });
		}
	} else {
		next();
	}
});

export default router;
