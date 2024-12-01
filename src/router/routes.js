import AppAbrirChamado from "src/components/AppAbrirChamado.vue";
import AppAssistencia from "src/components/AppAssistencia.vue";
import AppRequisicoes from "src/components/AppRequisicoes.vue";

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") },
      { path: '/abrir-chamado', component: AppAbrirChamado },
      { path: '/requisicoes', component: AppRequisicoes },
      { path: '/assistencia', component: AppAssistencia },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
