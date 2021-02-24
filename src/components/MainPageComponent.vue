<template>
<v-row class="ma-12 d-flex col-12" >
 <NavBar class="navbar" v-if="nonMobile" />

    <div class="bg_red   col-8 mx-2">
      <v-row justify="center">
        <div class="" v-for="item in filteredItems" :key="item.id">
          <HomeItem :item="item"></HomeItem>
        </div>
      </v-row>
      <v-row class="col-12" justify="center" v-show="!filteredItems.length">
        <h1>На данный момент нет предметов </h1>
      </v-row>
    </div>
</v-row>
</template>

<script>
import HomeItem from "@/components/HomeItem"
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import NavBar from "@/components/NavBar"

export default {
    name: 'HelloWorld',
    components:{
      NavBar,
      HomeItem
    },
  // TODO вынести логику(возможно в стор)
    async mounted() {
      let storedItems
      const len = this.$store.getters.items.length || 0
      if(!len){
        let items = []
        const res = await firebase.firestore().collection('items').get()
        await res.forEach( doc => {
              let item = doc.data()
              const ref =  firebase.storage().refFromURL(item.url)
              ref.getDownloadURL().then(thing => {
                item.url = thing
                const {code, mirror, description, images, innerHeight, innerWidth, material, name, outerHeight, outerWidth, price, url} = item
                items.push({
                  code,
                  mirror,
                  description,
                  images,
                  innerHeight,
                  innerWidth,
                  material,
                  name,
                  outerHeight,
                  outerWidth,
                  price,
                  url
                })
              })
            }
        )
        storedItems = items
        this.$store.commit('SETITEMS', storedItems)
      }else {
        storedItems = this.$store.getters.items
      }
      this.items = storedItems
    },
    data () {
      return{
        items : [],

    }
   },
  methods:{
      redirect(code){
        this.$router.push(`/${code}`)
      }
  },
  computed:{
      filteredItems(){
        return this.$store.state.selectedItems
      },
    nonMobile(){
        return this.$store.state.nonMobile
    }
  }
}
</script>

<style scoped>
.v-input--selection-controls{
  margin-top: 0 !important;
}
  .bg_blue{
    top: 8%;
    position: sticky;
    border: 1px solid black;
    border-radius: 20px;
    overflow: hidden;
    min-width: 200px;
    z-index: 2;
    max-height: 600px;
  }
  .navbar{
    position: sticky !important;
    top: 10% !important;
  }
</style>