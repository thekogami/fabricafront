import { createRouter, createWebHistory } from "vue-router";
import AppAbrirChamado from "src/components/AppAbrirChamado.vue";
import AppRequisicoes from "src/components/AppRequisicoes.vue";
import AppRelatorioGeral from "src/components/AppRelatorioGeral.vue";

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      { path: "/abrir-chamado", component: AppAbrirChamado },
      { path: "/requisicoes", component: AppRequisicoes },
      { path: "/relatorio", component: AppRelatorioGeral },
    ],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;