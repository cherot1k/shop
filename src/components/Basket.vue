<template>
  <v-row class="toFix" style="">
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
              class="mx-2 basket_btn"
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
          <span class="headline">Корзина: </span>
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
            <v-row class="col-12 mx-auto mb-12">
              <v-row class="item col-12 ma-2"  >
                <Item class="col-12 my-3" v-for="item in array" :item="item" @render="rerender" :key="item.id"/>
              </v-row>
            </v-row>
            <v-row class="col-12 mb-5" >
              <v-row justify="center">
                <v-btn rounded color="green" @click="redirect">
                  Оформить заказ &#183; {{totalPrice}} ₴
                </v-btn>
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
export default {
  name:'Basket',
  components:{
    Item
  },
  data: () => ({
    dialog: false,
    allTheValue: 0,
    array: []
  }),

  computed:{
    basket(){
      return this.$store.getters.basket
    },
    totalPrice(){
      return this.$store.getters.totalPrice
    },
    nonMobile(){
      return this.$store.getters.nonMobile
    }
  },
  methods:{
    redirect(){
      this.$router.push('/checkout')
    },
    rerender(){
      console.log('Me works')
      this.$forceUpdate();
    },
  },
  watch:{
    basket: function (){
      this.array = []
      setTimeout(()=> {
        this.array = this.$store.getters.basket
          },10)
    }
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
.butt{
  min-width: 100px;
  border: 1px solid green;
  border-radius: 20px;
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
  z-index: 2;
}
.basket_btn{
  background-color: #FFFFFF !important;
  border-radius: 50%;
}
.v-btn:before {
 background-color: #FFFFFF;
}
.sec_btn{
  min-height: 55px;
  max-width: 200px!important;
}
.order_span{
  font-size: 30px;
}
@media screen and (max-width: 800px){
  .order_span{
    font-size: 14px;
  }
  .price{
    font-size: 30px;
  }
  .val{
    font-size: 20px;
  }
}
</style>