<template>
  <v-row class="toFix">
    <div class="badge"  v-if="this.$route.path !== '/checkout'" v-show="basket.length > 0"> {{basket.length}} </div>
    <v-spacer/>
    <v-dialog
        v-if="this.$route.path !== '/checkout'"
        v-model="dialog"
        persistent
        max-width="800px"
    >
      <template v-slot:activator="{ on, attrs }">
          <v-btn
              color="black"
              dark
              v-bind="attrs"
              v-on="on"
              class="mx-2"
              id="no_color"
              fab
              large
              outlined
          >
            <v-icon>
              mdi-cart
            </v-icon>
          </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Корзина:</span>
          <v-spacer/>
          <v-btn
              icon
              dark
              @click="dialog = false"
              color="black"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider class="col-12"/>
        <v-card-text>
          <v-container>
            <v-row class="col-11 mx-auto mb-12">
              <v-row class="item col-12 ma-2" v-for="(item,id) in basket" :key="id">
                <Item   class="col-12 "  :item="item" />
              </v-row>
            </v-row>
            <v-row class="col-12 groupButt mb-5" style="height: 70px">
              <v-btn color="secondary" class="mt-3" @click="dialog = false"  small>Продолжить покупки</v-btn>
              <v-spacer/>
              <v-row class="col-6 d-flex butt" >
                <div class="price mt-3" style="height: 60px">
                  <span class="price">{{totalPrice}}</span>
                  <span class="val"> ₴ </span>
                </div>
                <v-spacer/>
                <v-btn  color="green" class="ml-5 mt-3" @click="redirect"> Оформить заказ  </v-btn>
              </v-row>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import Item from "@/components/Item";
import {mapState} from 'vuex'
export default {
  name:'Basket',
  components:{
    Item
  },
  data: () => ({
    dialog: false,
    allTheValue: 0
  }),

  computed:{
    // basket(){
    //   return this.$store.getters.basket
    // },
    totalPrice(){
      return this.$store.getters.totalPrice
    },
    ...mapState([
      'basket',
    ]),
  },
  methods:{
    redirect(){
      this.$router.push('/checkout')
    },
    rerender(){
      this.$forceUpdate();
    }
  },
}
</script>

<style scoped>
.toFix{
  position: fixed;
  right: 10%;
  top: 15%;
  z-index: 2;
}
.butt{
  min-width: 200px;
  border: 1px solid green;
  border-radius: 20px;
}
.price{
  font: 50px Arial;
}
.itemPrice{
  font: 30px Arial;
}
.val{
  font: 30px Arial;
}
#no_color{
  background-color: transparent !important
}
.item{
  /*border: 1px solid black;*/
  /*border-radius: 20px;*/
  min-height: 90px;
}
.field{
  max-width: 20px;
}
.v-text-field{
  padding-top: 0 !important;
}
.price{
  font-size: 2rem;
}
.badge{
  display: flex;
  justify-content: center;
  position: absolute;
  top:10px;
  right: 15px;
  background-color: red;
  border-radius: 50%;
  min-width: 15px !important;
  min-height: 15px !important;
  max-width: 20px !important;
  max-height: 20px !important;
  font-size: 12px;
}
</style>