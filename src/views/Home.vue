<template>
  <div class="home">
    <div class="col-12 ma-4">
        <HelloWorld msg="Welcome to Your Vue.js App"/>
    </div>
  </div>
</template>

<script>
import HelloWorld from '../components/MainPageComponent.vue'
export default {
  name: 'Home',
  components: {
    HelloWorld,
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