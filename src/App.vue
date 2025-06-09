<template>
  <div id="app">
    <RouterView />
  </div>
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
