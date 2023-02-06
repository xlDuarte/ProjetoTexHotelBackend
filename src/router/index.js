import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/HomeView.vue"),
  },
  {
    path: "/Acomodacoes",
    name: "acomodacoes",
    component: () => import("../views/AcomodacoesView.vue"),
  },
  {
    path: "/Reservas",
    name: "reservas",
    component: () => import("../views/ReservasView.vue"),
  },
  {
    path: "/Cadastro",
    name: "cadastro",
    component: () => import("../views/CadastroView.vue"),
  },
  {
    path: "/Contato",
    name: "contato",
    component: () => import("../views/ContatoView.vue"),
  },
  {
    path: "/HomeAdm",
    name: "homeAdm",
    component: () => import("../views/HomeAdmView.vue"),
  },
  {
    path: "/ServicosAdm",
    name: "servicos",
    component: () => import("../../adm/src/views/reservas/ServicosView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
