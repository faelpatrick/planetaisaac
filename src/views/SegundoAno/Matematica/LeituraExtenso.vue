<template>
  <div class="operacao-container">
    <Voltar />

    <div class="display-placar">
      Pontos:
      <div class="placar">{{ placar }}</div>
    </div>
		<h1>Como se escreve o número:</h1>
    <div class="display-pergunta mt-4">
      <h2>{{ numero }}</h2>
    </div>

    <input
      v-model="resposta"
      class="campo-resposta"
      placeholder="Digite por extenso"
      @keyup.enter="verificarResposta"
    />

    <div class="botoes-resposta">
      <button class="btn-largo px-2 btn-resposta" @click="verificarResposta">Verificar</button>
      <button class="btn-largo px-2 btn-resposta btn-apagar" @click="proximaPergunta">Pular</button>
    </div>

    <div style="margin-top: 2rem">Recorde: {{ recorde }}</div>

    <Modal />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Voltar from '@/components/Voltar.vue'
import Modal, { abrirModal } from '@/components/Modal.vue'
import { numeroPorExtenso } from '@/utils/porExtenso'

const pagina = 'leitura-extenso'
const placar = ref(0)
const recorde = ref(0)
const numero = ref(0)
const resposta = ref('')

function gerarNumero() {
  numero.value = Math.floor(Math.random() * 1000) + 1
  resposta.value = ''
}

function verificarResposta() {
  const correta = numeroPorExtenso(numero.value)
  if (resposta.value.trim().toLowerCase() === correta) {
    placar.value++
    if (placar.value > recorde.value) {
      recorde.value = placar.value
      localStorage.setItem(`recorde-${pagina}`, recorde.value)
    }
    abrirModal('Parabéns, você acertou!', 'green')
  } else {
    abrirModal(`Resposta errada! Era: "${correta}"`, 'red')
  }
  gerarNumero()
}

function proximaPergunta() {
  gerarNumero()
}

onMounted(() => {
  const salvo = parseInt(localStorage.getItem(`recorde-${pagina}`))
  if (!isNaN(salvo)) recorde.value = salvo
  gerarNumero()
})
</script>

<style scoped>
.campo-resposta {
  width: 100%;
  max-width: 90vw;
  padding: 1.5rem 1rem;
  font-size: 1.5rem;
  margin: 1rem auto;
  display: block;
  border-radius: 8px;
  border: 1px solid #ccc;
	background-color: #fff;
	color: #333;
}
</style>
