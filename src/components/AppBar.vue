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
          src="asset.png"
          transition="scale-transition"
          width="40"
      />

     <a>
       <h1 @click="redirect"> Lvov inc.</h1>
     </a>
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

<style>
.v-application a {
  color: white !important;
}
a{
  color: white !important;
  text-decoration-color: white !important
}
</style>