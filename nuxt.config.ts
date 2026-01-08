// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',
	devtools: { enabled: true },
	modules: ['@nuxt/ui', '@pinia/nuxt'],
	css: ['~/assets/css/main.css'],
	fonts: {
		defaults: {
			weights: [300, 400, 500, 600, 700]
		},
		families: [
			{
				name: 'Fira Code',
				provider: 'google',
				weights: [300, 400, 500, 600, 700]
			}
		]
	}
})
