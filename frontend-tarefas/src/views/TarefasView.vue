<template>
  <v-container class="mt-5">
    <v-row>
      <v-col cols="12" class="d-flex justify-space-between align-center">
        <h1 class="text-h4 font-weight-bold text-deep-purple-accent-4">Gerenciar Tarefas</h1>
        <v-btn color="deep-purple-accent-4" prepend-icon="mdi-plus" @click="openDialog()">
          Nova Tarefa
        </v-btn>
      </v-col>
    </v-row>

    <v-card class="mt-4 elevation-2">
      <v-data-table
        :headers="headers"
        :items="tarefas"
        :loading="loading"
        no-data-text="Nenhuma tarefa encontrada."
      >
        <template v-slot:item.concluida="{ item }">
          <v-chip
            :color="item.concluida ? 'green' : 'orange'"
            class="text-uppercase font-weight-bold"
            size="small"
            label
          >
            {{ item.concluida ? 'Concluída' : 'Pendente' }}
          </v-chip>
        </template>

        <template v-slot:item.actions="{ item }">
          <div class="d-flex gap-2">
            <v-btn icon="mdi-pencil" size="small" color="blue" variant="text" @click="openDialog(item)"></v-btn>
            <v-btn icon="mdi-delete" size="small" color="red" variant="text" @click="deleteTarefa(item.id)"></v-btn>
            <v-btn 
              :icon="item.concluida ? 'mdi-undo' : 'mdi-check'" 
              size="small" 
              :color="item.concluida ? 'grey' : 'green'" 
              variant="text" 
              title="Alternar Status"
              @click="toggleStatus(item)"
            ></v-btn>
          </div>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title class="bg-deep-purple-accent-4 text-white">
          {{ editedItem.id ? 'Editar Tarefa' : 'Nova Tarefa' }}
        </v-card-title>

        <v-card-text class="pt-4">
          <v-form ref="form" v-model="valid">
            <v-text-field
              v-model="editedItem.titulo"
              label="Título da Tarefa"
              :rules="[v => !!v || 'Título é obrigatório']"
              variant="outlined"
              required
            ></v-text-field>
            
            <v-textarea
              v-model="editedItem.descricao"
              label="Descrição"
              variant="outlined"
              rows="3"
            ></v-textarea>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey-darken-1" variant="text" @click="closeDialog">Cancelar</v-btn>
          <v-btn color="deep-purple-accent-4" variant="elevated" @click="save">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// Estado
const tarefas = ref([]);
const loading = ref(true);
const dialog = ref(false);
const valid = ref(false);

// Configuração da Tabela
const headers = [
  { title: 'ID', key: 'id', width: '80px' },
  { title: 'Título', key: 'titulo' },
  { title: 'Descrição', key: 'descricao' },
  { title: 'Status', key: 'concluida', width: '120px' },
  { title: 'Ações', key: 'actions', sortable: false, align: 'end' },
];

// Objeto padrão para formulário
const defaultItem = {
  id: null,
  titulo: '',
  descricao: '',
  concluida: false
};
const editedItem = ref({ ...defaultItem });

// URL da API (Backend Express)
const API_URL = 'http://localhost:3000/api/tarefas';

// --- MÉTODOS CRUD ---

// 1. READ (Buscar todas)
const fetchTarefas = async () => {
  loading.value = true;
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Erro ao buscar tarefas');
    tarefas.value = await response.json();
  } catch (error) {
    console.error(error);
    alert('Erro ao conectar com o backend. Verifique se o server.js está rodando.');
  } finally {
    loading.value = false;
  }
};

// 2. CREATE & UPDATE (Salvar)
const save = async () => {
  // Validação simples
  if (!editedItem.value.titulo) return alert('Preencha o título!');

  try {
    let method = 'POST';
    let url = API_URL;
    let body = { ...editedItem.value };

    // Se tem ID, é Edição (PUT)
    if (editedItem.value.id) {
      method = 'PUT';
      url = `${API_URL}/${editedItem.value.id}`;
    }

    const response = await fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (response.ok) {
      fetchTarefas(); // Recarrega a lista
      closeDialog();
    } else {
      alert('Erro ao salvar tarefa');
    }
  } catch (error) {
    console.error(error);
  }
};

// 3. DELETE (Excluir)
const deleteTarefa = async (id) => {
  if (!confirm('Tem certeza que deseja excluir esta tarefa?')) return;

  try {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchTarefas(); // Recarrega a lista
  } catch (error) {
    console.error('Erro ao excluir:', error);
  }
};

// 4. Mudar Status (Concluída/Pendente)
const toggleStatus = async (item) => {
  try {
    const novoStatus = !item.concluida;
    await fetch(`${API_URL}/${item.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...item, concluida: novoStatus })
    });
    fetchTarefas();
  } catch (error) {
    console.error('Erro ao atualizar status:', error);
  }
};

// Controle do Modal
const openDialog = (item = null) => {
  if (item) {
    editedItem.value = { ...item }; // Modo Edição
  } else {
    editedItem.value = { ...defaultItem }; // Modo Criação
  }
  dialog.value = true;
};

const closeDialog = () => {
  dialog.value = false;
  editedItem.value = { ...defaultItem };
};

// Carregar dados ao entrar na tela
onMounted(() => {
  fetchTarefas();
});
</script>