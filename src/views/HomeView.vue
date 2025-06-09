<template>
  <div class="home-container">
    <h1>Planeta Isaac 🌍</h1>
    <h2>Escolha um jogo</h2>

    <div class="game-links">
    <RouterLink to="/matematica/adicao" class="game-button">➕ Adição</RouterLink>
<RouterLink to="/matematica/subtracao" class="game-button">➖ Subtração</RouterLink>
<RouterLink to="/portugues/ditongos" class="game-button">🔤 Ditongos</RouterLink>

    </div>
  </div>
</template>

<script setup>
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
}

.game-button:hover {
  background-color: #388e3c;
}
</style>
