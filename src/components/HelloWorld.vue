<template>
<v-row class="ma-12 d-flex col-12" >
  <div class=" col-12 col-md-2 mx-2">
  </div>
    <div class="bg_blue col-12 col-md-2 mx-2">
      <div class="">
        <span class="mb-5">Ширина внешней стороны:</span>
      </div>
        <v-checkbox
            v-for="item in inner_Width"
            :label="item"
            v-model = "selected_inner_width"
            :value = "item"
        ></v-checkbox>

      <div class="">
        <span>Ширина внутренней стороны:</span>
      </div>
      <v-checkbox
        v-for="item in outer_width"
        :label="item"
        v-model="selected_outer_width"
        :value="item"
      >
      </v-checkbox>

      <div class="">
        <span>Высота внутренней стороны:</span>
      </div>
      <v-checkbox
          v-for="item in inner_height"
          :label="item"
          v-model="selected_inner_height"
          :value="item"
      >
      </v-checkbox>

      <div class="">
        <span>Высота внешней стороны стороны:</span>
      </div>
      <v-checkbox
          v-for="item in outer_height"
          :label="item"
          v-model="selected_outer_height"
          :value="item"
      >
      </v-checkbox>

      <div class="">
        <span>Материал:</span>
      </div>
      <v-checkbox
          v-for="item in materials"
          :label="item"
          v-model="selected_materials"
          :value="item"
      >
      </v-checkbox>


      <div class="">
        <span>Зеркало:</span>
      </div>
      <v-checkbox
          v-for="item in mirror"
          :label="item"
          v-model="selected_mirror"
          :value="item"
      >
      </v-checkbox>

    </div>

<!--  items заменено на filteredItems-->
    <div class="bg_red  col-12 col-md-9 mx-2">
      <v-row justify="center">
        <div class="" v-for="item in filteredItems">
          <HomeItem :item="item"></HomeItem>
        </div>
      </v-row>
    </div>
</v-row>
</template>

<script>
import HomeItem from "@/components/HomeItem";
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'

export default {
    name: 'HelloWorld',
    components:{
      HomeItem
    },
    async mounted() {
      let items = []
      const res = await firebase.firestore().collection('items').get()
      res.forEach( doc => {
            let item = doc.data()
            const ref =  firebase.storage().refFromURL(item.url)
            ref.getDownloadURL().then(thing => {
              item.url = thing
              console.log(item)
              items.push(item)
            })
          }
      )
      this.items = items
    },
    data () {
      return{
        items : [],

        inner_Width: ['17`','12`'],
        selected_inner_width: [],

        outer_width: ['25`','55`'],
        selected_outer_width :[],

        inner_height: ['25`',  '55`'],
        selected_inner_height :[],

        outer_height: ['25`','55`'],
        selected_outer_height :[],

        materials:['Дерево','Пластик'],
        selected_materials:[],

        mirror:[ 'Есть', 'Нет'],
        selected_mirror:[]
    }
   },
  methods:{
      redirect(code){
        this.$router.push(`/${code}`)
      }
  },
  computed:{
      filteredItems(){
        let oldItems = this.items
        let filteredArray = []
        // возможно для проверки надо использовать === true
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
        return filteredArray
      }
  }
}
</script>

<style scoped>
.v-input--selection-controls{
  margin-top: 0 !important;
}
  .bg_blue{
    position: fixed;
  }
</style>