<template>
  <v-card
      class="col-12 my-5"
      max-height="400px"
      max-width="450px"
      min-height="100px"
      min-width="100px"
      style="overflow: hidden"
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
          min-height="200px"
          width="100%"
          :src=item.url
          aspect-ratio="1.5"
      ></v-img>

      <v-card-title style="font-size: 14px" >{{item.name}}</v-card-title>

      <v-card-text class="mb-7">
        <div class="my-1 subtitle-1">
          {{price}}₴
        </div>
        <div style="font-size: 12px"  v-if="!mobile_version">{{item.description}}</div>
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
      return checkPrice(this.item, this.$store.state.dollar)
    },
    mobile_version(){
      return  !this.$store.getters.nonMobile
    }
  }
}
</script>

<style scoped>
.v-card__title{
  padding: 10px 10px 0 !important;
}
</style>