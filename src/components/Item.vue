<template>
  <v-row class="col-12">
    <v-row class="col-12 ma-2">
      <v-img max-height="100px" max-width="100px" :src="currentItem.url"></v-img>
      <div class="mt-2 ml-2"> {{currentItem.name}} </div>
      <v-spacer/>
      <v-btn
          icon
          dark
          color="black"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-row>
    <v-row justify="end col-12 ma-2">
      <v-btn icon @click.prevent="increment()">
        <v-icon> mdi-plus </v-icon>
      </v-btn>
      <div class="field mt-2"  style="font-size: 22px"> {{val}} </div>
      <v-btn icon @click.prevent="decrement()">
        <v-icon> mdi-minus </v-icon>
      </v-btn>
      <div class="itemPrice ml-5"> {{price * this.val}} ₴ </div>
    </v-row>
  </v-row>
</template>

<script>
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
      let number = (this.currentItem.price * this.$store.state.dollar)/100
      if(number - Math.trunc(number) < 0.5 && number - Math.trunc(number) !== 0){
        return (Math.trunc(number) * 100 + 50)
      }else if(number - Math.trunc(number) > 0.5){
        return (Math.trunc(number) * 100 + 100)
      }else{
        return (number*100);
      }
    }
  },
  methods:{
     increment(){
       const obj = {
         code : this.currentItem.code,
         howMany: 1
       }
       this.$store.commit('CHANGEHOWMANY', obj)
       this.val++
       this.$store.commit('CHANGETOTALPRICE', this.price)

    },
    decrement(){
      if (this.val >1){
       const obj = {
         code : this.currentItem.code,
         howMany: -1
       }
        this.$store.commit('CHANGEHOWMANY', obj)
        this.val--
        this.$store.commit('CHANGETOTALPRICE', (0- this.price))
      }
    }
  },
  mounted() {
    this.val = this.$store.getters.basket.filter(item => item.code = this.currentItem.code)[0].howMany
  }

}
</script>
<style scoped>
.itemPrice{
  font: 30px Arial;
}
</style>