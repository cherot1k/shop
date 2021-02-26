<template>
  <v-row class="my-style col-12 d-flex ml-6">
    <v-row class="col-md-5 col-sm-12 mt-2 ">
      <div class="justify-center mx-2" >
        <v-img class="col-12" max-height="70px" max-width="70px" :src="item.url"> </v-img>
      </div>
      <div class="mt-3"> <a href="#" class="black--text"> {{item.name}} </a> </div>
    </v-row>
    <v-row class="col-md-7 col-sm-12 no_padd" style="flex-direction: row">
      <v-col class=" ma-2">
        <div class="">Цена</div>
        <div class="">{{price}}₴</div>
      </v-col>
      <v-col class=" ma-2">
        <div class="">Кол-во</div>
        <div class="">{{item.howMany}}</div>
      </v-col>
      <v-col class=" ma-2">
        <div class="">Сумма</div>
        <div class="">{{price * item.howMany}}₴</div>
      </v-col>
    </v-row>
  </v-row>
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
      return checkPrice(this.item, this.$store.state.dollar)
    }
  }
}
</script>

<style scoped>
.my-style{
}
</style>