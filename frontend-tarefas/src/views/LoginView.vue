<template>
  <v-container class="fill-height bg-grey-lighten-4" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="5" lg="4">
        
        <v-card class="elevation-10 rounded-lg">
          
          <v-card-item class="bg-deep-purple-accent-4 text-center py-10">
            <v-icon icon="mdi-checkbox-multiple-marked-circle" size="80" color="white" class="mb-4"></v-icon>
            <div class="text-h4 font-weight-bold text-white">Task Manager</div>
            <div class="text-subtitle-1 text-white mt-2">Segunda Avaliação FMDS</div>
          </v-card-item>

          <v-card-text class="pa-8 text-center">
            <p class="mb-8 text-medium-emphasis text-body-1">
              Gerencie suas tarefas de forma eficiente. Faça login para acessar seu painel.
            </p>

            <v-btn
              block
              color="red-darken-1"
              size="x-large"
              variant="flat"
              prepend-icon="mdi-google"
              @click="handleLogin"
              :loading="loading"
              class="text-none"
            >
              Entrar com Google
            </v-btn>
          </v-card-text>

        </v-card>

        <div class="text-center mt-6 text-caption text-grey-darken-1">
          Frameworks Modernos para Desenvolvimento de Sistemas
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();
const loading = ref(false);

const handleLogin = async () => {
  loading.value = true;
  // Chama a ação do Pinia que configuramos anteriormente
  await authStore.loginWithGoogle();
  // O redirecionamento é tratado pelo Supabase Auth (callback)
};
</script>