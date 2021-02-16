<template>
  <v-row class="col-12 addBorder">
    <v-row class="col-12 ma-2">
      <v-img max-height="100px" max-width="100px" :src="currentItem.url"></v-img>
      <div class="mt-2 ml-2"> {{currentItem.name}} {{currentItem.code}} </div>
      <v-spacer/>
      <v-btn
          icon
          dark
          color="black"
          @click="removeItem(currentItem.code)"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-row>
    <v-row justify="end" class="col-12 ma-2">
<!--      <v-btn icon @click.prevent="increment()">-->
<!--        <v-icon> mdi-plus </v-icon>-->
<!--      </v-btn>-->
<!--      <div class="field mt-2"  style="font-size: 22px"> {{val}} </div>-->
<!--      <v-btn icon @click.prevent="decrement()">-->
<!--        <v-icon> mdi-minus </v-icon>-->
<!--      </v-btn>-->
      <div class="itemPrice ml-5"> {{price * this.val}} ₴ </div>
    </v-row>
  </v-row>
</template>

<script>
import {checkPrice} from "@/functions/price"

export default {
  name: 'Item',
  props:{
    item: {
      type: Object,
      required: true
    }
  },
  data(){
    return{
      currentItem : this.item,
      val: 1
    }
  },
  computed:{
    price(){
      // let number = (this.currentItem.price * this.$store.state.dollar)/100
      // if(number - Math.trunc(number) < 0.5 && number - Math.trunc(number) !== 0){
      //   return (Math.trunc(number) * 100 + 50)
      // }else if(number - Math.trunc(number) > 0.5){
      //   return (Math.trunc(number) * 100 + 100)
      // }else{
      //   return (number*100);
      // }
      return checkPrice(this.currentItem, this.$store.state.dollar)
    }
  },
  methods:{
    //  increment(){
    //    const obj = {
    //      code : this.currentItem.code,
    //      howMany: 1
    //    }
    //    this.$store.commit('CHANGEHOWMANY', obj)
    //    this.val++
    //    this.$store.commit('CHANGETOTALPRICE', this.price)
    //
    // },
    // decrement(){
    //   if (this.val >1){
    //    const obj = {
    //      code : this.currentItem.code,
    //      howMany: -1
    //    }
    //     this.$store.commit('CHANGEHOWMANY', obj)
    //     this.val--
    //     this.$store.commit('CHANGETOTALPRICE', (0- this.price))
    //   }
    // },
    removeItem(){
       this.$store.commit('CHANGETOTALPRICE', (0 - (this.price* this.val )))
       this.$store.dispatch('removeItem', this.currentItem)
       this.rerender()
    },
    // rerender(){
    //   this.$emit('render')
    // }
  },
  async mounted() {
    let res = await this.$store.commit('GETITEMBYCODE',this.currentItem.code)
    this.val = res.howMany
  }

}
</script>
<style scoped>
.itemPrice{
  font: 30px Arial;
}
.addBorder{
  border: 1px solid black;
  border-radius: 20px;
}
</style>