export default [
	// Segundo Ano
	{
		path: '/segundo-ano',
		name: 'segundo-ano',
		component: () => import('./Seletor.vue')
	},
	// Matematica
	{
		path: '/segundo-ano/matematica',
		name: 'segundo-ano-matematica',
		component: () => import('./Matematica/Seletor.vue')
	},
	{
		path: '/segundo-ano/matematica/leitura-extenso',
		name: 'leitura-extenso',
		component: () => import('./Matematica/LeituraExtenso.vue')
	},
	{
		path: '/segundo-ano/matematica/escrita-extenso',
		name: 'escrita-extenso',
		component: () => import('./Matematica/EscritaExtenso.vue')
	},

	// Estudo do Meio
	{
		path: '/segundo-ano/estudo-do-meio',
		name: 'estudo-do-meio',
		component: () => import('./EstudoDoMeio/Seletor.vue')
	},

	//Portugues
	{
		path: '/segundo-ano/portugues',
		name: 'portugues',
		component: () => import('./Portugues/Seletor.vue')
	}
]
