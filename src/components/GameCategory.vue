<template>
  <section>
    <h2>{{ category }}</h2>
    <!-- Lista de jogos, mapeando os 'games' para thumbnails futuramente -->
  </section>
</template>

<script setup>
defineProps({
  category: String,
  games: Array
})
</script>
