<template>
  <div class="about mt-12">
    <v-container  class="cont " >
      <v-divider></v-divider>
      <v-row class="col-12 d-inline-flex ma-4">
        <div class="col-5" >
          <v-carousel >
            <v-carousel-item
                v-for="(item,i) in item.images"
                :key="i"
                :src="item"
            ></v-carousel-item>
          </v-carousel>
<!--          <v-row class="mt-10">-->
<!--            <div class="grey&#45;&#45;text">{{item.description}}</div>-->
<!--          </v-row>-->
        </div>
        <div class="col-7" >
          <v-row justify="center">
            <h1>{{item.name}}</h1>
            <v-row class="col-12 mt-5">
              <div class="col-6 " >
                <div class="needFont">
                  <span style="font-size: 70px" >{{price}}</span>
                  <span style="font-size: 43px">₴</span>
                </div>
                <div class="">Код товара: {{item.code}}</div>
                <div class="mt-2 needFont">
                  <ul>
                    <li>Высота внутренней стороны: {{item.outerHeight}}</li>
                    <li>Высота внутренней стороны: {{item.innerHeight}}</li>
                    <li>Ширина внутренней стороны: {{item.innerWidth}}</li>
                    <li>Ширина внешней стороны: {{item.outerWidth}}</li>
                    <li>Материал: {{item.material}}</li>
                    <li>Зеркало: {{item.mirror}}</li>
                  </ul>
                </div>
              </div>
              <div class="col-6 mt-3 needFont">
                <v-row class="col-12 mt-4" >
                  <v-btn class="buyBtn col-6" @click="addToBasket" large v-show="!isInBasket">
                    <v-icon left>mdi-basket-plus</v-icon>
                    <span class="cart"> В корзину </span>
                  </v-btn>
                  <v-btn class="disBtn col-6" disabled large v-show="isInBasket">
                    <v-icon left>mdi-cart-check</v-icon>
                    <span class="cart"> Товар в корзине </span>
                  </v-btn>
                </v-row>
                <div class="mt-5">
                  <div class="">Доставка:</div>
                  <div class="">
                    <ul>
                      <li>Новая Почта</li>
                      <li>Забрать с фирменного магазина</li>
                      <li>Курьером до дома</li>
                    </ul>
                  </div>
                </div>
              </div>
            </v-row>
          </v-row>
          <v-row class="col-12 mt-2">
            <div class="grey--text">{{item.description}}</div>
          </v-row>
        </div>
      </v-row>
      <v-divider></v-divider>
    </v-container>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import {checkPrice} from "@/functions/price"
export default {
  async mounted() {
    let code = this.$route.path.replace('/','')
    const res = await firebase.firestore().collection('items').doc(code).get()
    let item = res.data()
    for( let one in item.images){
      item.images[one] = await firebase.storage().refFromURL(item.images[one]).getDownloadURL()
    }
    item.url = await firebase.storage().refFromURL(item.url).getDownloadURL()
    this.item = item
  },
  data  () {
    return {
      item:{},
    }
  },
  methods:{
    async addToBasket(){
      const {code, mirror, description, images, innerHeight, innerWidth, material, name, outerHeight, outerWidth, price, url} = this.item
      this.item.howMany = 1
      await this.$store.commit('ADDITEM', {code, mirror, description, images, innerHeight, innerWidth, material, name, outerHeight, outerWidth, price, url, howMany: 1})
      // this.$store.commit('CHANGETOTALPRICE', this.price)
    }
  },
  computed:{
    price(){
      return checkPrice(this.item, this.$store.state.dollar)
    },
    basket(){
      return this.$store.getters.basket
    },
    isInBasket(){
      return  this.$store.getters.basket.filter( item => item.code === this.item.code).length === 1
    }
  }
}
</script>

<style scoped>
.cont{
  margin-top: 2% !important;
}
.needFont{
  font-family: "WebServeroff", sans-serif !important;
  font-size: 1.25rem !important;
  font-weight: bold;
}
.buyBtn{
  font-weight: bold;
  font: 18px/30px WebServeroff;
  min-width: 150px !important;
}
.disBtn{
  font-weight: bold;
  font: 18px/30px WebServeroff;
  min-width: 220px !important;
}
.cart{
  color: blue;
  font-family: "Comic Sans MS",serif;
  font-size: 1rem;
}
ul{
  list-style: none;
}
.about{
  margin-top: 7% !important;
}
</style>