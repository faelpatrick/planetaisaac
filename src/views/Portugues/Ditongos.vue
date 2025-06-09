<template>
  <div class="operacao-container">
    <Voltar />

    <div class="display-placar">
      Pontos:
      <div class="placar">{{ placar }}</div>
    </div>

    <div class="display-pergunta cursiva">
      {{ consoante }} + {{ vogal }} =
      <span>{{ resposta !== '?' ? resposta : '?' }}</span>
    </div>

    <div class="botoes-resposta">
      <button
        v-for="(vog, i) in vogais"
        :key="i"
        class="btn-resposta cursiva"
        @click="escreverResposta(consoante + vog)"
      >
        {{ consoante + vog }}
      </button>

      <button class="btn-resposta btn-apagar" @click="apagarResposta()">«</button>
      <button class="btn-resposta" @click="verificarResposta()">=</button>
    </div>

    <Modal />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Voltar from '@/components/Voltar.vue'
import Modal, { abrirModal } from '@/components/Modal.vue'

const consoantes = ['p', 't', 'l', 'd']
const vogais = ['a', 'e', 'i', 'o', 'u']

const consoante = ref('')
const vogal = ref('')
const resposta = ref('?')
const placar = ref(0)

function getRandomIndex(arr) {
  return Math.floor(Math.random() * arr.length)
}

function gerarPergunta() {
  consoante.value = consoantes[getRandomIndex(consoantes)]
  vogal.value = vogais[getRandomIndex(vogais)]
}

function escreverResposta(letra) {
  resposta.value = letra
}

function apagarResposta() {
  resposta.value = '?'
}

function verificarResposta() {
  if (resposta.value === consoante.value + vogal.value) {
    placar.value++
    abrirModal('Parabéns, você acertou!', 'green')
  } else {
    abrirModal('Infelizmente, você errou', 'red')
  }
  resposta.value = '?'
  gerarPergunta()
}

onMounted(() => {
  gerarPergunta()
})
</script>
