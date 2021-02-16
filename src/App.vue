<template>
  <v-app>
    <AppBar/>
    <v-row class="col-12">
      <v-col>
        <Basket/>
        <router-view></router-view>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import HelloWorld from './components/MainPageComponent';
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
              this.usd = item.sale
              console.log('Dollar:  ' + item.sale)
              this.$store.commit('SETDOLLAR',item.sale)
            }
          })
        })
  }

};
</script>
