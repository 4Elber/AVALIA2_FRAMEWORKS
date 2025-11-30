// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const port = process.env.PORT || 3000;

// Configuração do Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Middlewares
app.use(cors());
app.use(express.json());

// --- ROTAS DA API REST  ---

// 1. READ: Listar todas as tarefas [cite: 36]
app.get('/api/tarefas', async (req, res) => {
  const { data, error } = await supabase
    .from('tarefas')
    .select('*')
    .order('id', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// 2. CREATE: Criar nova tarefa [cite: 35]
app.post('/api/tarefas', async (req, res) => {
  const { titulo, descricao } = req.body;
  
  const { data, error } = await supabase
    .from('tarefas')
    .insert([{ titulo, descricao }])
    .select();

  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data); // 201 Created
});

// 3. UPDATE: Atualizar tarefa (ex: marcar como concluída) [cite: 37]
app.put('/api/tarefas/:id', async (req, res) => {
  const { id } = req.params;
  const { titulo, descricao, concluida } = req.body;

  const { data, error } = await supabase
    .from('tarefas')
    .update({ titulo, descricao, concluida })
    .eq('id', id)
    .select();

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// 4. DELETE: Excluir tarefa [cite: 38]
app.delete('/api/tarefas/:id', async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase
    .from('tarefas')
    .delete()
    .eq('id', id);

  if (error) return res.status(400).json({ error: error.message });
  res.status(204).send(); // 204 No Content
});

// Iniciar Servidor
app.listen(port, () => {
  console.log(`Backend rodando em http://localhost:${port}`);
});