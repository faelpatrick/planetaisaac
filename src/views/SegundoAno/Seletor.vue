<template>
  <div class="operacao-container">
    <Voltar />

		<div class="game-links">

    <h1>Escolha um tema para começar:</h1>

      <RouterLink to="/segundo-ano/matematica" class="game-button">
        📐 Matemática
      </RouterLink>
      <RouterLink to="/segundo-ano/estudo-meio" class="game-button">
        🌱 Estudo do Meio
      </RouterLink>
      <RouterLink to="/segundo-ano/portugues" class="game-button">
        📘 Português
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import Voltar from '@/components/Voltar.vue'
import { RouterLink } from 'vue-router'
</script>



<style scoped>
.home-container {
  text-align: center;
  padding: 3rem 1rem;
}

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
