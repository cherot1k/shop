<template>
  <div class="home">
<!--    <div class="col-12 ma-4">-->
        <MainPageComponent/>
<!--    </div>-->
  </div>
</template>

<script>
import MainPageComponent from '../components/MainPageComponent.vue'
export default {
  name: 'Home',
  components: {
    MainPageComponent,
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