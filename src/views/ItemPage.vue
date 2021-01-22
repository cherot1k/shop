<template>
  <div class="about">
    <v-container  class="cont" >
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
          <v-row class="mt-10">
            <div class="grey--text">{{item.description}}</div>
          </v-row>
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
              <div class="col-6 ">
                <v-row class="col-12 mt-4" >
                  <v-btn class="buyBtn col-6" @click="addToBasket" large>
                    <v-icon left>mdi-basket-plus</v-icon>
                    <span class="cart"> В корзину </span>
                  </v-btn>
                </v-row>
                <div class="mt-5">
                  <div class="">Доставка:</div>
                  <div class="mt-5">
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
    console.log(item)
  },
  data  () {
    return {
      item:{},
    }
  },
  methods:{
    async addToBasket(){
      this.item.howMany = 1
      await this.$store.dispatch('addItem', this.item)
      // this.$store.commit('CHANGETOTALPRICE', this.price)
    }
  },
  computed:{
    price(){
      let number = (this.item.price * this.$store.state.dollar)/100
      if(number - Math.trunc(number) < 0.5 && number - Math.trunc(number) !== 0){
        return (Math.trunc(number) * 100 + 50)
      }else if(number - Math.trunc(number) > 0.5){
        return (Math.trunc(number) * 100 + 100)
      }else{
        return (number*100)
      }
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
}
.cart{
  color: blue;
  font-family: "Comic Sans MS",serif;
  font-size: 1rem;
}
ul{
  list-style: none;
}
</style>