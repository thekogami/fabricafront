import AppAbrirChamado from "src/components/AppAbrirChamado.vue";
import AppAssistencia from "src/components/AppAssistencia.vue";
import AppRequisicoes from "src/components/AppRequisicoes.vue";
import AppChamadoAberto from "src/components/AppChamadoAberto.vue";
import AppRelatorioGeral from "src/components/AppRelatorioGeral.vue";

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      { path: "/abrir-chamado", component: AppAbrirChamado },
      { path: "/requisicoes", component: AppRequisicoes },
      { path: "/assistencia", component: AppAssistencia },
      { path: "/relatorio", component: AppRelatorioGeral},
      {
        path: '/chamado/:id',
        name: 'AppChamadoAberto',
        component: AppChamadoAberto,
        props: route => ({ chamado: route.params.chamado })
      }
    ],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
