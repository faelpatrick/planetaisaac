<template>
  <div class="operacao-container">
    <div class="d-flex justify-evenly">
      <Voltar />

      <div>
        <label for="nivel">Selecionar nível:</label>
          <select id="nivel" v-model="nivelSelecionado" @change="gerarPergunta" class=" ml-1 pl-2 bg-white rounded">
          <option v-for="nivel in niveis" :key="nivel" :value="nivel">
            Até {{ nivel }}
          </option>
          </select>
      </div>

      <div class="ml-8">
        Recorde: {{ recorde }}
      </div>
      </div>

    <div class="display-placar">
      Pontos:
      <div class="placar">{{ placar }}</div>
    </div>

    <div class="display-pergunta">
      {{ num1 }} + {{ num2 }} =
      <span>{{ resposta !== -1 ? resposta : '?' }}</span>
    </div>

    <div class="botoes">~
      <div class="botoes-resposta">
        <button
          v-for="i in 10"
          :key="i - 1"
          class="btn-resposta"
          @click="escreverResposta(i - 1)">
          {{ i - 1 }}
        </button>
      </div>
    
      <div class="d-flex">
        <button class="btn-resposta btn-largo btn-apagar  px-6" @click="apagarResposta()">« <small class="ml-2">APAGAR</small></button>
        <button class="btn-resposta btn-largo  px-6" @click="verificarResposta()">= <small class="ml-2">RESPOSTA</small> </button>
      </div>
    </div>
    <Modal />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import Voltar from '@/components/Voltar.vue'
import Modal, { abrirModal } from '@/components/Modal.vue'

const pagina = 'adicao'

const placar = ref(0)
const recorde = ref(0)
const resposta = ref(-1)
const num1 = ref(0)
const num2 = ref(0)

const niveis = [10, 20, 30, 50, 100]

// inicia com valor salvo ou 10
const nivelSelecionado = ref(10)

function carregarConfiguracoesSalvas() {
  const salvoNivel = localStorage.getItem(`nivel-${pagina}`)
  const salvoRecorde = localStorage.getItem(`recorde-${pagina}`)

  if (salvoNivel && !isNaN(parseInt(salvoNivel))) {
    nivelSelecionado.value = parseInt(salvoNivel)
  }

  if (salvoRecorde && !isNaN(parseInt(salvoRecorde))) {
    recorde.value = parseInt(salvoRecorde)
  }
}

// observa alterações no nível e salva
watch(nivelSelecionado, (val) => {
  localStorage.setItem(`nivel-${pagina}`, val.toString())
  gerarPergunta()
})

function gerarPergunta() {
  const limite = nivelSelecionado.value
  let n1 = Math.floor(Math.random() * limite)
  let n2 = Math.floor(Math.random() * limite)

  while (n1 + n2 > limite) {
    n1 = Math.floor(Math.random() * limite)
    n2 = Math.floor(Math.random() * limite)
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
  const correta = num1.value + num2.value
  if (resposta.value === correta) {
    placar.value++
    if (placar.value > recorde.value) {
      recorde.value = placar.value
      localStorage.setItem(`recorde-${pagina}`, recorde.value.toString())
    }
    abrirModal('Parabéns, você acertou!', 'green')
  } else {
    abrirModal('Infelizmente, você errou', 'red')
  }
  gerarPergunta()
}

onMounted(() => {
  carregarConfiguracoesSalvas()
  gerarPergunta()
})
</script>
