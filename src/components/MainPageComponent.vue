<template>
<v-row style="margin: 0">
<!--      <NavBar class="navbar" v-if="mdAndHigher" />-->
      <NavBar class="navbar" v-if="nonMobile" />
      <v-row v-else justify="start" class="col-12 ma-5 mb-0"> <MobileFilterNavBar/>   </v-row>

      <v-row class="col-sm-12 col-md-9 col-12" justify="center" v-if="filteredItems">
        <div class="col-md-4 col-sm-6 col-6" v-for="item in filteredItems" :key="item.id">
          <HomeItem :item="item"></HomeItem>
        </div>
        <v-row class="col-sm-12 col-md-8 col-12 mt-12" justify="center" v-show="filteredItems.length === 0">
          <h1>На данный момент нет предметов </h1>
        </v-row>
      </v-row>

</v-row>
</template>

<script>
import HomeItem from "@/components/HomeItem"
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import NavBar from "@/components/NavBar"
import MobileFilterNavBar from "@/components/MobileFilterNavBar"

export default {
    name: 'HelloWorld',
    components:{
      MobileFilterNavBar,
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
        this.$store.commit('SETSELECTEDITEMS',storedItems)
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
    // mdAndHigher(){
    //     return this.$vuetify.breakpoint.mdAndUp
    // },
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
  .navbar{
    position: sticky !important;
    top: 10% !important;
  }
</style>