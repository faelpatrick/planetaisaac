<template>
  <button class="btn-voltar" @click="voltarParaHome">⬅️ Voltar</button>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
// const voltarParaHome = () => router.push('/')
// history.back() will take the user back to the previous page in the history stack
const voltarParaHome = () => {
  if (document.referrer) {
    window.history.back()
  } else {
    router.push('/')
  }
}
</script>

<style scoped>
.btn-voltar {
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1.5rem;
  font-weight: 600;
  border-radius: 10px;
  cursor: pointer;
  transition-duration: 0.4s;
  position: absolute;
  top: 20px;
  left: 20px;
}

.btn-voltar:hover {
  background-color: #3e8e41;
}

.btn-voltar:active {
  background-color: #3e8e41;
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}
</style>
