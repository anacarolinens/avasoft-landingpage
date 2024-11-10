import { createRouter, createWebHistory } from "vue-router";
import HomeView from "./views/HomeView.vue";
import HomePatientView from "./views/HomePatientView.vue";
import PainelPatient from "./components/PainelPatient.vue";
import LoginPatientModal from "./components/LoginPatientModal.vue";
import ConfigPatient from "./components/ConfigPatient.vue";


const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { showNavbar: false },
  },
  {
    path: "/homePatient",
    name: "homePatient",
    component: HomePatientView,
    meta: { showNavbar: false },
  },
  {
    path: "/login",
    name: "LoginPatientModal",
    component: LoginPatientModal,
    meta: { showNavbar: false },
  },
  {
    path: "/PainelPatient",
    name: "PainelPatient",
    component: PainelPatient,
    meta: { requiresAuth: true },
  },
  {
    path: "/patient:id",
    name: "ConfigPatient",
    component: ConfigPatient,
    meta: { requiresAuth: true },
  }, 
  {
    path: '/reset-password-confirm/:resetToken',
    component: PasswordResetConfirm,
    name: 'PasswordResetConfirm',
    meta: { hideHeader: true }
  },
  {
    path: '/PasswordReset',
    component: PasswordReset,
    name: 'PasswordReset',
    meta: { hideHeader: true }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Guardião de rota para verificar autenticação
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const token = localStorage.getItem("authToken");
    if (!token) {
      next({ name: "LoginPatientModal" });
    }
    else {
      next();
    }
  } else {
    next();
  }
});



export default router;
