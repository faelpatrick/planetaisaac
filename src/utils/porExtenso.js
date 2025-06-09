export function numeroPorExtenso(num) {
  const unidades = ['zero', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove']
  const especiais = ['dez', 'onze', 'doze', 'treze', 'catorze', 'quinze', 'dezasseis', 'dezassete', 'dezoito', 'dezanove']
  const dezenas = ['', '', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa']
  const centenas = ['', 'cento', 'duzentos', 'trezentos', 'quatrocentos', 'quinhentos', 'seiscentos', 'setecentos', 'oitocentos', 'novecentos']

  if (num === 0) return 'zero'
  if (num === 100) return 'cem'
  if (num === 1000) return 'mil'

  let partes = []

  const c = Math.floor(num / 100)
  const d = Math.floor((num % 100) / 10)
  const u = num % 10
  const doisUltimos = num % 100

  if (c > 0) {
    partes.push(centenas[c])
  }

  if (doisUltimos > 0) {
    if (partes.length > 0) partes.push('e')

    if (doisUltimos < 10) {
      partes.push(unidades[doisUltimos])
    } else if (doisUltimos < 20) {
      partes.push(especiais[doisUltimos - 10])
    } else {
      partes.push(dezenas[d])
      if (u !== 0) {
        partes.push('e')
        partes.push(unidades[u])
      }
    }
  }

  return partes.join(' ')
}
