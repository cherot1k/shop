<template>
  <v-app>
    <AppBar/>
    <v-content>
<!--      <v-container fluid>-->
        <Basket/>
      <div class="">
        <router-view></router-view>
      </div>
<!--      </v-container>-->
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import Basket from './components/Basket'
import AppBar from './components/AppBar'
export default {
  name: 'App',

  components: {
    HelloWorld,
    Basket,
    AppBar
  },
  mounted() {
    fetch('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5',{method:'GET'}) // Получение курса доллара и присвоение его в data usd
        .then(res => res.json())
        .then(data => {
          data.forEach(item => {
            if(item.ccy === "USD" && item.base_ccy === "UAH"){
              this.$store.commit('SETDOLLAR',item.sale)
            }
          })
        })
    window.addEventListener('resize',()=>{
      this.$store.commit('SETNONMOBILE', window.innerWidth>1000)
    })
    this.$store.commit('SETNONMOBILE', window.innerWidth>1000)
  }

};
</script>
