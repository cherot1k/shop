<template>
  <v-navigation-drawer
  permanent
  class="nav d-flex"
  >
    <div v-show="false">{{filteredItems}} </div>
        <div class="bg_blue mx-2 pl-5 pb-5">
          <div class="mt-3">
            <span class="mb-5">Ширина внешней стороны:</span>
          </div>
            <v-checkbox
                style="max-height: 30px"
                v-for="item in inner_width"
                :label="item"
                v-model = "selected_inner_width"
                :value = "item"
            ></v-checkbox>

          <div class="mt-3">
            <span>Ширина внутренней стороны:</span>
          </div>
          <v-checkbox
            style="max-height: 30px"
            v-for="item in outer_width"
            :label="item"
            v-model="selected_outer_width"
            :value="item"
          >
          </v-checkbox>

          <div class="mt-3">
            <span>Высота внутренней стороны:</span>
          </div>
          <v-checkbox
              style="max-height: 30px"
              v-for="item in inner_height"
              :label="item"
              v-model="selected_inner_height"
              :value="item"
          >
          </v-checkbox>

          <div class="mt-3">
            <span>Высота внешней стороны:</span>
          </div>
          <v-checkbox
              style="max-height: 30px"
              v-for="item in outer_height"
              :label="item"
              v-model="selected_outer_height"
              :value="item"
          >
          </v-checkbox>

          <div class="mt-3">
            <span>Материал:</span>
          </div>
          <v-checkbox
              style="max-height: 30px"
              v-for="item in materials"
              :label="item"
              v-model="selected_materials"
              :value="item"
          >
          </v-checkbox>


          <div class="mt-3">
            <span>Зеркало:</span>
          </div>
          <v-checkbox
              style="max-height: 30px"
              v-for="item in mirror"
              :label="item"
              v-model="selected_mirror"
              :value="item"
          >
          </v-checkbox>
        </div>
  </v-navigation-drawer>
</template>

<script>
import firebase from "firebase/app"
import 'firebase/firestore'
import { mapState } from 'vuex'
export default{
  async mounted() {
    let needed_Object
    const isInStore =  this.nav.inner_height.length
    if(isInStore === 0){
      const response = await firebase.firestore().collection('config').doc('sidebar').get()
      const data = response.data()
      const object = {
        inner_height: data.inner_height,
        inner_width: data.inner_width,
        outer_height: data.outer_height,
        outer_width: data.outer_width,
        materials: data.materials
      }
      this.$store.commit('SETNAVSTATE',object)
      needed_Object = object
    }else{
      needed_Object = this.nav
    }
    console.log(needed_Object)
    this.inner_height = needed_Object.inner_height
    this.inner_width = needed_Object.inner_width
    this.outer_width = needed_Object.outer_width
    this.outer_height = needed_Object.outer_height
    this.materials = needed_Object.materials


    window.addEventListener('resize',()=>{
      this.$store.state.nonMobile = window.innerWidth>1000
    })
    this.$store.state.nonMobile = window.innerWidth>1000
  },
  data: function () {
    return {

      items : [],

      inner_width: [],
      selected_inner_width: [],

      outer_width: [],
      selected_outer_width :[],

      inner_height: [],
      selected_inner_height :[],

      outer_height: [],
      selected_outer_height :[],

      materials:[],
      selected_materials:[],

      mirror:[ 'Есть', 'Нет'],
      selected_mirror:[],

    }
  },
  computed:{
    filteredItems(){
      let oldItems = this.$store.state.items
      let filteredArray = []
      if(this.selected_inner_width.length){
        filteredArray = oldItems.filter(item => this.selected_inner_width.includes(item.innerWidth))
      }else{
        filteredArray = oldItems
      }

      if(this.selected_outer_width.length){
        filteredArray = filteredArray.filter(item => this.selected_outer_width.includes(item.outerWidth))
      }

      if(this.selected_inner_height.length){
        filteredArray = filteredArray.filter(item => this.selected_inner_height.includes(item.innerHeight))
      }

      if(this.selected_outer_height.length){
        filteredArray = filteredArray.filter(item => this.selected_outer_height.includes(item.outerHeight))
      }

      if(this.selected_materials.length){
        filteredArray = filteredArray.filter(item => this.selected_materials.includes(item.material))
      }

      if(this.selected_mirror.length){
        filteredArray = filteredArray.filter(item => this.selected_mirror.includes(item.mirror))
      }


      this.$store.commit('SETSELECTEDITEMS', filteredArray)

      return filteredArray
    },
    nonMobile(){
      return this.$store.state.nonMobile
    },
    ...mapState({
      nav: state => state.navbar
    })
  },
  methods:{

  }
}
</script>

<style scoped>
.nav{
  min-width: 80px;
}
.v-input--selection-controls{
  margin-top: 0 !important;
}
.bg_blue{
  top: 8%;
  position: sticky;
  /*border: 1px solid black;*/
  /*border-radius: 20px;*/
  overflow: hidden;
  min-width: 200px;
  z-index: 2;
}
</style>