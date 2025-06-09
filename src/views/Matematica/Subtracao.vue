<template>
  <div class="operacao-container">
    <Voltar />

    <div style="margin-bottom: 2rem">
      <label for="nivel">Selecionar nível:</label>
      <select id="nivel" v-model="nivelSelecionado" @change="gerarPergunta">
        <option v-for="nivel in niveis" :key="nivel" :value="nivel">
          Até {{ nivel }}
        </option>
      </select>
    </div>

    <div class="display-placar">
      Pontos:
      <div class="placar">{{ placar }}</div>
    </div>

    <div class="display-pergunta">
      {{ num1 }} - {{ num2 }} =
      <span>{{ resposta !== -1 ? resposta : '?' }}</span>
    </div>

    <div class="botoes">
      <div class="botoes-resposta">
        <button
          v-for="i in 10"
          :key="i - 1"
          class="btn-resposta"
          @click="escreverResposta(i - 1)"
        >
          {{ i - 1 }}
        </button>
      </div>

      <div class="d-flex">
        <button class="btn-resposta btn-largo btn-apagar px-6" @click="apagarResposta()">« <small class="ml-2">APAGAR</small></button>
        <button class="btn-resposta btn-largo px-6" @click="verificarResposta()">= <small class="ml-2">RESPOSTA</small></button>
      </div>
    </div>

    <Modal />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Voltar from '@/components/Voltar.vue'
import Modal, { abrirModal } from '@/components/Modal.vue'

const placar = ref(0)
const resposta = ref(-1)
const num1 = ref(0)
const num2 = ref(0)

const niveis = [10, 20, 30, 50, 100]
const nivelSelecionado = ref(10)

function gerarPergunta() {
  const limite = nivelSelecionado.value
  let n1 = Math.floor(Math.random() * limite)
  let n2 = Math.floor(Math.random() * limite)

  // garante que o resultado da subtração não seja negativo
  if (n2 > n1) {
    [n1, n2] = [n2, n1]
  }

  num1.value = n1
  num2.value = n2
  resposta.value = -1
}

function escreverResposta(num) {
  if (resposta.value === -1) {
    resposta.value = num
  } else {
    const nova = resposta.value.toString() + num.toString()
    if (nova.length <= 3) {
      resposta.value = parseInt(nova)
    }
  }
}

function apagarResposta() {
  if (resposta.value >= 10) {
    resposta.value = parseInt(resposta.value.toString().slice(0, -1))
  } else {
    resposta.value = -1
  }
}

function verificarResposta() {
  if (resposta.value === num1.value - num2.value) {
    placar.value++
    abrirModal('Parabéns, você acertou!', 'green')
  } else {
    abrirModal('Infelizmente, você errou', 'red')
  }
  gerarPergunta()
}

onMounted(gerarPergunta)
</script>
