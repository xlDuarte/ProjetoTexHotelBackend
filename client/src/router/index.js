import { createRouter, createWebHashHistory } from "vue-router";
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
    component: () => import("../../adm/src/views/HomeAdmView.vue"),
  },
  {
    path: "/RelatorioConsumoAdm",
    name: "relatorio",
    component: () => import("../../adm/src/views/reservas/RelatorioView.vue"),
  },
  {
    path: "/ServicosAdm",
    name: "servicos",
    component: () => import("../../adm/src/views/reservas/ServicosView.vue"),
  },
  {
    path: "/editServico/:id",
    name: "EditServicos",
    component: () => import("../../adm/src/views/reservas/ServicosView.vue"),
  },
  {
    path: "/ReservasAdm",
    name: "reservasAdm",
    component: () => import("../../adm/src/views/reservas/ReservasView.vue"),
  },

  {
    path: "/Usuarios",
    name: "usuarios",
    component: () => import("../../adm/src/views/usuarios/UsuariosView.vue"),
  },
  {
    path: "/editUsuario/:id",
    name: "editUsuarios",
    component: () => import("../../adm/src/views/usuarios/EditUsuario.vue"),
  },
  {
    path: "/Consumos",
    name: "consumos",
    component: () => import("../../adm/src/views/consumos/ConsumosView.vue"),
  },
  {
    path: "/editConsumo/:id",
    name: "editConsumos",
    component: () => import("../../adm/src/views/consumos/EditConsumo.vue"),
  },
  {
    path: "/AcomodacaoAdm",
    name: "acomodacaoAdm",
    component: () =>
      import("../../adm/src/views/acomodacoes/AcomodacoesView.vue"),
  },
  {
    path: "/ComentariosAdm",
    name: "comentariosAdm",
    component: () =>
      import("../../adm/src/views/reservas/ComentariosView.vue"),
  },
  {
    path: "/editAcomodacao/:id",
    name: "editAcomodacao",
    component: () =>
      import("../../adm/src/views/acomodacoes/EditAcomodacao.vue"),
  },
  {
    path: "/resetpwd/:token",
    name: "NovaSenha",
    component: () => import("../views/NovaSenha.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
