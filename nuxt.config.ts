// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  modules: ["@nuxt/ui", "@nuxtjs/tailwindcss", "@pinia/nuxt"],
  /*security: {
    headers: {
      contentSecurityPolicy: {}
    },
  },*/
  nitro: {
    devProxy: {
      '/fhir': {
        target: 'http://localhost:8080/csp/healthshare/demo/fhir/r4',
        changeOrigin: true,
        prependPath: false,
        /*headers: {
          'Authorization': 'Basic ' + Buffer.from('_SYSTEM:ISCDEMO').toString('base64')
        }*/
      }
    },
    routeRules: {
      '/api/**': { cors: true }
    }
  }
});
