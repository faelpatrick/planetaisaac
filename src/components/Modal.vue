<template>
  <div class="modal" id="myModal">
    <div class="modal-content" @click="fecharModal">
      <p id="modalText" class="mb-4">{{ conteudoModal }}</p>
      <img id="dinoImg" :src="urlDinoImg" alt="" width="150px" />
      <h6 class="mt-4">Clique para Continuar</h6>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue'

const props = defineProps({
  colorModal: { type: String, default: 'green' },
  conteudoModal: { type: String, default: '' }
})

const urlDinoImg = computed(() =>
  props.colorModal === 'green' ? '/assets/dino-feliz.png' : '/assets/dino-triste.png'
)

const fecharModal = () => abrirModal() // reusa a função global abaixo
</script>

<script>
// função global para abrir o modal programaticamente
export function abrirModal(msg = 'VAZIO', color = 'black') {
  const myModal = document.getElementById('myModal')
  const modalStatus = myModal?.style.display

  const img = document.getElementById('dinoImg')
  if (img) img.setAttribute('src', color === 'green' ? '/assets/dino-feliz.png' : '/assets/dino-triste.png')

  if (myModal) {
    myModal.style.backgroundColor = color
    document.getElementById('modalText').innerHTML = msg
    myModal.style.display = modalStatus === 'block' ? 'none' : 'block'
  }
}
</script>
