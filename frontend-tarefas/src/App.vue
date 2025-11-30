<template>
  <v-app>
    <v-app-bar v-if="authStore.user" color="deep-purple-accent-4" density="compact">
      <v-app-bar-title>Minhas Tarefas</v-app-bar-title>
      
      <v-spacer></v-spacer>

      <v-btn to="/" variant="text">Dashboard</v-btn>
      <v-btn to="/tarefas" variant="text">Tarefas</v-btn>

      <v-divider vertical class="mx-2 my-auto" inset></v-divider>

      <div class="d-flex align-center ml-2">
        <v-avatar size="32" class="mr-2">
          <v-img :src="authStore.user.user_metadata.avatar_url" alt="Avatar"></v-img>
        </v-avatar>
        <span class="mr-4 text-caption hidden-sm-and-down">
          {{ authStore.user.user_metadata.name }}
        </span>
        <v-btn icon="mdi-logout" @click="authStore.logout" title="Sair"></v-btn>
      </div>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { onMounted } from 'vue';
import { useAuthStore } from './stores/auth';
import { supabase } from './supabase';

const authStore = useAuthStore();

// Verifica a sessão ao carregar a aplicação (Persistência)
onMounted(async () => {
  const { data: { session } } = await supabase.auth.getSession();
  if (session) {
    authStore.setUser(session.user);
  }

  // Escuta mudanças na autenticação (login/logout em outras abas, etc.)
  supabase.auth.onAuthStateChange((_, session) => {
    if (session) {
      authStore.setUser(session.user);
    } else {
      authStore.user = null;
    }
  });
});
</script>