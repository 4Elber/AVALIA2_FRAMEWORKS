<template>
  <v-container class="mt-5">
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 font-weight-bold text-deep-purple-accent-4">
          Dashboard
        </h1>
        <p class="text-subtitle-1 text-grey-darken-1">
          Bem-vindo ao seu gerenciador de tarefas.
        </p>
      </v-col>
    </v-row>

    <v-row class="mt-4">
      <v-col cols="12" md="6">
        <v-card class="h-100 elevation-2" border>
          <v-card-item>
            <template v-slot:prepend>
              <v-avatar size="64" color="grey-lighten-2">
                <v-img 
                  v-if="user?.user_metadata?.avatar_url" 
                  :src="user.user_metadata.avatar_url"
                ></v-img>
                <v-icon v-else icon="mdi-account" size="large"></v-icon>
              </v-avatar>
            </template>
            <v-card-title>{{ user?.user_metadata?.name || 'Usuário' }}</v-card-title>
            <v-card-subtitle>{{ user?.email }}</v-card-subtitle>
          </v-card-item>
          
          <v-card-text class="pt-4">
            Você está autenticado via Google. Sua sessão está ativa e segura.
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card class="h-100 elevation-2 bg-deep-purple-lighten-5" border>
          <v-card-item>
            <template v-slot:prepend>
              <v-icon icon="mdi-playlist-check" size="48" color="deep-purple-accent-4"></v-icon>
            </template>
            <v-card-title>Minhas Tarefas</v-card-title>
            <v-card-subtitle>Gerencie suas atividades</v-card-subtitle>
          </v-card-item>

          <v-card-text>
            Acesse a lista completa de tarefas para criar, editar ou excluir itens pendentes.
          </v-card-text>

          <v-card-actions>
            <v-btn 
              variant="elevated" 
              color="deep-purple-accent-4" 
              block 
              to="/tarefas"
            >
              Ir para Tarefas
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-6">
      <v-col cols="12">
        <v-alert
          icon="mdi-information"
          title="Sobre o Sistema"
          text="Este sistema utiliza Vue.js 3, Pinia para estado global, Vuetify para interface e um Backend Express integrado ao Supabase."
          variant="tonal"
          color="info"
        ></v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { computed } from 'vue';
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();

// Usamos computed para reagir caso o usuário demore um milissegundo para carregar no Pinia
const user = computed(() => authStore.user);
</script>