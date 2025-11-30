// src/stores/auth.js
import { defineStore } from 'pinia'
import { supabase } from '../supabase'
import router from '../router'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null, // Armazena dados do usuário (nome, email, foto)
  }),
  actions: {
    async loginWithGoogle() {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      })
      if (error) console.error('Erro no login:', error)
    },
    async logout() {
      await supabase.auth.signOut()
      this.user = null
      router.push('/login') // Redireciona para login após sair [cite: 50]
    },
    setUser(sessionUser) {
      this.user = sessionUser
    }
  }
})