import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

// Importaremos os componentes que criaremos no próximo passo
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import TarefasView from '../views/TarefasView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', name: 'login', component: LoginView },
    { path: '/', name: 'dashboard', component: DashboardView, meta: { requiresAuth: true } },
    { path: '/tarefas', name: 'tarefas', component: TarefasView, meta: { requiresAuth: true } }
  ]
})

// Guarda de rota (Route Guard) para proteção [cite: 50]
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  // Verifica sessão ativa no Supabase se o Pinia estiver vazio
  if (!authStore.user) {
    const { data: { session } } = await import('../supabase').then(m => m.supabase.auth.getSession())
    if (session) {
        authStore.setUser(session.user)
    }
  }

  if (to.meta.requiresAuth && !authStore.user) {
    next('/login')
  } else {
    next()
  }
})

export default router