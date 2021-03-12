<template>
  <v-toolbar
      app
      color="primary"
      dark
      class="app_bar"
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
    <div class="">
      <AboutUs/>
    </div>
  </v-toolbar>
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
.app_bar{
  width: 100%;
}
.v-application a {
  color: white !important;
}
a{
  color: white !important;
  text-decoration-color: white !important
}
</style>