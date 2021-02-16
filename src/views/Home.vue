<template>
  <div class="home">
    <div class="col-12 ma-4">
      <!--      <NavBar/>-->
      <v-col>
        <HelloWorld msg="Welcome to Your Vue.js App"/>
      </v-col>
    </div>
  </div>
</template>

<script>
import HelloWorld from '../components/MainPageComponent.vue'
import NavBar from '../components/NavBar'
export default {
  name: 'Home',
  components: {
    HelloWorld,
    NavBar
  },
  async mounted() {

  }
}
</script>

<style scoped>
.toFix{
  position: fixed;
  right: 10%;
  top: 15%;
  z-index: 2;
}
</style>