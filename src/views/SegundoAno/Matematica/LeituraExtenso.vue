<template>
  <div class="operacao-container">
    <Voltar />

    <div class="display-placar">
      Pontos:
      <div class="placar">{{ placar }}</div>
    </div>

    <h1>Lê em voz alta este número:</h1>

    <div class="display-pergunta mt-4">
      <h2>{{ numero }}</h2>
    </div>

    <div class="botoes-resposta">
      <button class="btn-largo px-2 btn-resposta" @click="mostrarResposta">
        Mostrar resposta
      </button>
      <button class="btn-largo px-2 btn-resposta btn-apagar" @click="proximaPergunta">
        Próximo número
      </button>
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

const pagina = 'leitura-extenso-oral'
const placar = ref(0)
const recorde = ref(0)
const numero = ref(0)

function gerarNumero() {
  numero.value = Math.floor(Math.random() * 1000) + 1
}

function mostrarResposta() {
  const resposta = numeroPorExtenso(numero.value)
  abrirModal(`Resposta correta: <br><strong>${resposta}</strong>`, 'green')
}

function proximaPergunta() {
  placar.value++
  if (placar.value > recorde.value) {
    recorde.value = placar.value
    localStorage.setItem(`recorde-${pagina}`, recorde.value)
  }
  gerarNumero()
}

onMounted(() => {
  const salvo = parseInt(localStorage.getItem(`recorde-${pagina}`))
  if (!isNaN(salvo)) recorde.value = salvo
  gerarNumero()
})
</script>
