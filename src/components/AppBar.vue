<template>
  <v-app-bar
      app
      color="primary"
      dark
  >
    <div class="d-flex align-center">
      <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
      />

      <h1 @click="redirect"> Lion Inc.</h1>
    </div>

    <v-spacer></v-spacer>

    <AboutUs/>
  </v-app-bar>
</template>
<script>
import AboutUs from '@/components/AboutUs'
export default {
  components:{
    AboutUs
  },
  methods:{
    redirect(){
      this.$router.push('/')
    }
  }
}
</script>