<template>
  <div class="operacao-container">
    <Voltar />

    <div class="game-links">
      <h1>Escolha uma atividade de Matemática:</h1>

      <RouterLink to="/segundo-ano/matematica/leitura-extenso" class="game-button">
        🔢 <b>Leitura</b> por extenso até 1000
      </RouterLink>

      <RouterLink to="/segundo-ano/matematica/escrita-extenso" class="game-button">
        🔢 <b>Escrita</b> por extenso até 1000
      </RouterLink>

      <!-- próximos links:
      <RouterLink to="/segundo-ano/matematica/graficos" class="game-button">
        📊 Gráficos e Tabelas
      </RouterLink>
      -->
    </div>
  </div>
</template>

<script setup>
import Voltar from '@/components/Voltar.vue'
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.game-links {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: stretch;
  max-width: 800px;
  margin: 0 auto;
  margin-top: 5rem;
}

.game-button {
  padding: 1rem 2rem;
  font-size: 1.5rem;
  background-color: #4caf50;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  transition: 0.3s;
  text-align: center;
}

.game-button:hover {
  background-color: #388e3c;
}
</style>
