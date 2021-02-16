<template>
  <div class="my-style col-12 d-flex">
    <v-row class="col-2" justify="center">
      <v-img class="col-12" max-height="70px" max-width="70px" :src="item.url"> </v-img>
    </v-row>
    <div class="col-4"> <a href="#"> {{item.name}} </a> </div>
    <v-row class="col-5 no_padd">
      <v-row class="col-3 mr-3">
        <div class="col-12">Цена</div>
        <div class="col-12">{{price}}₴</div>
      </v-row>
      <v-row class="col-5">
        <div class="col-12">Кол-во</div>
        <div class="col-12">{{item.howMany}}</div>
      </v-row>
      <v-row class="col-3">
        <div class="col-12">Сумма</div>
        <div class="col-12" >{{price * item.howMany}}₴</div>
      </v-row>
    </v-row>
  </div>
</template>

<script>
import {checkPrice} from '@/functions/price'
export default {
  props:{
    item:{
      type:Object,
      required: true
    }
  },
  computed:{
    price(){
      // let number = (this.item.price * this.$store.state.dollar)/100
      // if(number - Math.trunc(number) < 0.5 && number - Math.trunc(number) !== 0){
      //   return (Math.trunc(number) * 100 + 50)
      // }else if(number - Math.trunc(number) > 0.5){
      //   return (Math.trunc(number) * 100 + 100)
      // }else{
      //   return (number*100);
      // }
      return checkPrice(this.item, this.$store.state.dollar)
    }
  }
}
</script>

<style scoped>
.my-style{
}
</style>