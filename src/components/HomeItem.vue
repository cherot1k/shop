<template>
  <v-card
      class="col-2 ma-3"
      max-width="300"
  >
    <div @click="redirect(item.code)">
      <template slot="progress">
        <v-progress-linear
            color="deep-purple"
            height="10"
            indeterminate
        ></v-progress-linear>
      </template>

      <v-img
          height="200"
          :src=item.url
      ></v-img>

      <v-card-title>{{item.name}}</v-card-title>

      <v-card-text>
        <div class="my-1 subtitle-1">
          {{price}}₴
        </div>
        <div>{{item.description}}</div>
      </v-card-text>
    </div>
  </v-card>
</template>

<script>
import {checkPrice} from "@/functions/price"
export default {
  props:{
    item: {
      type: Object,
      required: true
    }
  },
  methods:{
    redirect(code){
      this.$router.push(`/${code}`)
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