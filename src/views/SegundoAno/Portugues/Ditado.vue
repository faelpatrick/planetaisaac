<template>
  <!-- O template permanece exatamente o mesmo do seu código original -->
  <div class="operacao-container" >
    <Voltar />
    <h2 class="titulo pl-4">Ditado</h2>

    <div style="position: absolute; top: 26px; right: 20px; z-index: 1000;">
      <label class="switch">
        <input type="checkbox" v-model="idiomaSelecionado" :true-value="'pt-BR'" :false-value="'pt-PT'" />
        <span class="slider"></span>
      </label>
    </div>

    <div class="placar">{{ placarTexto }}
      <br>
      <v-btn @click="zerarPlacar" color="red"> 🧹 Zerar o Placar</v-btn>
    </div>

    <div v-if="palavraAtual" key="palavraAtual" >
      <div class="botoes-audio">
        <v-btn size="large"
        @click="ouvirPalavra(0.6)">🔊 Normal</v-btn>
        <v-btn size="large" @click="ouvirPalavra(0.2)">🐢 Devagar</v-btn>
      </div>

      <p class="my-4">A palavra será dita, escreva corretamente abaixo.</p>

      <div key="exibirCorreta" :class="{
        'resposta-correta': true, 
        'errada': statusResposta === 'errada', 
        'correta': statusResposta === 'certa'}">
       <span v-if="exibirCorreta">
         <strong>{{ palavraAtual.palavra }}</strong>
       </span> 
        <small v-else class="small-text">
            Ouça e escreva abaixo:
        </small>
      </div>

      <input
        v-model="resposta"
        ref="campoResposta"
        key="campoResposta"
        class="campo-resposta"
        :class="{
          rounded: true,
          correta: statusResposta === 'certa',
          errada: statusResposta === 'errada'
        }"
        placeholder="Digite aqui..."
      />

      <div class="botoes-verificacao">
        <v-btn size="large" v-if="!verificada" @click="verificarResposta">Verificar</v-btn>
        <v-btn :disabled="!compararPalavras()" size="large" v-else @click="proximaPalavra">Próxima ➡️</v-btn>
        <!-- alerta escreva a palavra correta para continuar -->
      </div>
      <v-alert
        v-if="!compararPalavras() && verificada"
        type="white"
        icon="mdi-alert-circle"
        class="my-4"
        border="start"
        variant="tonal"
        prominent
      >
        Escreva a palavra correta para continuar.
      </v-alert>
    </div>

    <div v-if="!palavraAtual" key="semPalavras" >
      {{ palavraAtual ? '' : 'Nenhuma palavra disponível.' }}
      <p>A carregar palavras...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import Voltar from '@/components/Voltar.vue'
import palavrasJson from './palavras.json'

const progressoKey = 'ditado-progresso'
const dataHoje = new Date().toISOString().split('T')[0]
const placarKey = `ditado-placar-${dataHoje}`

const palavras = ref([])
const palavraAtual = ref(null)
const idiomaSelecionado = ref('pt-PT')
const resposta = ref('')
const verificada = ref(false)
const statusResposta = ref(null)
const exibirCorreta = ref(false)
const placarDia = ref({ acertos: 0, erros: 0 })
const campoResposta = ref(null)

const placarTexto = computed(() =>
  `✅ ${placarDia.value.acertos} | ❌ ${placarDia.value.erros}`
)

function handleKeyup(event) {
  if (event.ctrlKey && event.key === ' ') {
    ouvirPalavra(0.2)
  } else if (event.key === ' ') {
    ouvirPalavra(0.6)
  } else if (event.key === 'Enter') {
    if (verificada.value) {
      proximaPalavra()
    } else if (!verificada.value && campoResposta.value) {
      verificarResposta()
    }
  }
}

function zerarPlacar() {
  placarDia.value = { acertos: 0, erros: 0 }
  guardarPlacarDia()
}

function carregarProgresso() {
  const salvo = localStorage.getItem(progressoKey)
  
  // Se não há progresso salvo, inicializa com o JSON padrão
  if (!salvo) {
    inicializarPalavrasPadrao()
    return
  }

  try {
    const dados = JSON.parse(salvo)
    
    // Verifica se os dados salvos estão no formato antigo (apenas array de strings)
    if (Array.isArray(dados) && dados.length > 0 && typeof dados[0] === 'string') {
      palavras.value = dados.map(p => ({
        palavra: p,
        acertos: 0,
        erros: 0
      }))
    } 
    // Verifica se está no formato correto (array de objetos)
    else if (Array.isArray(dados) && dados.length > 0 && typeof dados[0] === 'object') {
      palavras.value = dados.map(item => ({
        palavra: String(item.palavra || ''),
        acertos: Number(item.acertos) || 0,
        erros: Number(item.erros) || 0
      }))
    } else {
      // Se o formato for inválido, inicializa com o padrão
      inicializarPalavrasPadrao()
    }
  } catch (e) {
    console.error('Erro ao carregar progresso:', e)
    inicializarPalavrasPadrao()
  }

  ordenarPalavras()
  palavraAtual.value = palavras.value[0] || null
  if (palavraAtual.value) {
    ouvirPalavra(0.6) // Reproduz a palavra normal ao carregar
  } else {
    console.warn('Nenhuma palavra carregada.')
  }
}

function inicializarPalavrasPadrao() {
  // console.warn('Inicializando palavras com o JSON padrão.')
  // console.log('Palavras JSON:', palavrasJson)
  palavras.value = palavrasJson.map(p => ({
    palavra: String(p.palavra || p),
    acertos: 0,
    erros: 0
  }))
  // console.log('Palavras carregadas:', palavras.value)
  guardarProgresso()
}

function guardarProgresso() {
  const dadosParaSalvar = palavras.value.map(p => ({
    palavra: p.palavra,
    acertos: p.acertos,
    erros: p.erros
  }))
  localStorage.setItem(progressoKey, JSON.stringify(dadosParaSalvar))
}

function carregarPlacarDia() {
  const salvo = localStorage.getItem(placarKey)
  if (salvo) {
    try {
      placarDia.value = JSON.parse(salvo)
    } catch (e) {
      console.error('Erro ao carregar placar:', e)
      placarDia.value = { acertos: 0, erros: 0 }
    }
  }
}

function guardarPlacarDia() {
  localStorage.setItem(placarKey, JSON.stringify(placarDia.value))
}

function ordenarPalavras() {
// console.log('Ordenando palavras...')
// console.log('Palavras antes da ordenação:', palavras.value)
  palavras.value.sort((a, b) => {
    // Prioriza palavras com mais acertos
    if (a.acertos !== b.acertos) return  a.acertos  - b.acertos
    // Depois prioriza palavras com menos erros
    return a.erros - b.erros
  })
  // console.log('Palavras após a ordenação:', palavras.value)
}

function ouvirPalavra(velocidade = 1) {
  if (!palavraAtual.value) return
  
  const texto = palavraAtual.value.palavra
  if (!texto) return
  
  const msg = new SpeechSynthesisUtterance(texto)
  msg.lang = idiomaSelecionado.value
  msg.rate = velocidade
  speechSynthesis.cancel()
  speechSynthesis.speak(msg)
}

function compararPalavras(){
  const limpar = val => String(val || '').trim().toLowerCase()
  return limpar(resposta.value) === limpar(palavraAtual.value.palavra)
}

function verificarResposta() {
  if (!palavraAtual.value) return
  
  verificada.value = true

  if (compararPalavras()) {
    statusResposta.value = 'certa'
    palavraAtual.value.acertos++
    placarDia.value.acertos++
  } else {
    statusResposta.value = 'errada'
    palavraAtual.value.erros++
    placarDia.value.erros++
  }

  guardarProgresso()
  guardarPlacarDia()
  ordenarPalavras()
  exibirCorreta.value = true
}

function proximaPalavra() {
  verificada.value = false
  exibirCorreta.value = false
  resposta.value = ''
  statusResposta.value = null
  
  ordenarPalavras()
  palavraAtual.value = palavras.value[0] || null
  if (palavraAtual.value) {
    ouvirPalavra(0.6) // Reproduz a palavra normal ao ir para a próxima
    campoResposta.value.focus()
    
  }
}

onMounted(() => {
  // Para resetar (descomente se necessário):
  // localStorage.removeItem(progressoKey)

  carregarProgresso()
  carregarPlacarDia()
  // nexttick para o campo de resposta
  setTimeout(() => {
    if (campoResposta.value) {
      campoResposta.value.focus()
    }
  }, 100)
  if (!palavraAtual.value) { 
    carregarProgresso()
    carregarPlacarDia()
  } 
  window.addEventListener('keyup', handleKeyup)
})

onBeforeUnmount(() => {
  window.removeEventListener('keyup', handleKeyup)
})

</script>

<style scoped>
/* Os estilos permanecem exatamente os mesmos do seu código original */
.operacao-container {
  padding: 2rem;
  text-align: center;
}

.botoes-audio,
.botoes-verificacao {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 1rem 0;
}

.campo-resposta {
  font-size: 1.5rem;
  padding: 0.6rem;
  border-radius: 8px;
  border: 8px solid transparent;
  background-color: #f9f9f9;
  width: 100%;
  margin: 1rem auto;
}

.campo-resposta.correta {
  border-color: green;
}

.campo-resposta.errada {
  border-color: red;
}

.resposta-correta {
  font-size: 2rem;
  font-weight: bold;
  color: #fff;
  margin-bottom: 0.5rem;
  background-color: #ededed;
  border-radius: 8px;
  height: 3rem;
  width: 100%;
}

.resposta-correta.correta{
  background-color: #4caf50;
}
.resposta-correta.errada {
  background-color: #f44336;
}

.switch {
  font-size: 17px;
  position: relative;
  display: inline-block;
  width: 3.5em;
  height: 2em;
}
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: red;
  transition: 0.4s;
  border-radius: 30px;
}
.slider:before {
  position: absolute;
  content: "";
  height: 1.4em;
  width: 1.4em;
  border-radius: 20px;
  left: 0.3em;
  bottom: 0.3em;
  background-color: darkgreen;
  transition: 0.4s;
}
.switch input:checked + .slider {
  background-color: yellow;
}
.switch input:focus + .slider {
  box-shadow: 0 0 1px yellow;
}
.switch input:checked + .slider:before {
  transform: translateX(1.5em);
}

.placar {
  position: absolute;
  top: 8px;
}

.titulo {
  position: absolute;
  top: 20px;
  text-align: center;
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #fff;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.small-text {
  /* font-size: 0.8rem; */
  color: #4caf50;
  text-wrap:  nowrap;
}

@media (max-width: 1024px) {
  .placar {
    top: 100px;
  }
}

</style>