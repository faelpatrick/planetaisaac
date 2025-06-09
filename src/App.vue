<template>
  <div id="app">
    <RouterView />
  </div> 
  <footer>
      Planeta Isaac – Desenvolvido por
      <a href="https://linktr.ee/faelpatrick" target="_blank"> Rafael Patrick</a>
    </footer>
</template>

<script setup>
import { RouterView } from 'vue-router'
import './App.css'
</script>

<style>
body {
  margin: 0;
  font-family: 'Segoe UI', sans-serif;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
