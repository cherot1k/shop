<template>
  <div class="">
    <v-container>
      <v-row class="mt-12 header">
        <h1>Оформление заказа:</h1>
      </v-row>
      <v-row class="ma-5 mt-12">
        <v-text-field
            class="col-5 ma-2"
            label="Фамилия"
            outlined
        ></v-text-field>
        <v-text-field
            class="col-5 ma-2"
            label="Имя"
            outlined
        ></v-text-field>
        <v-text-field
            class="col-5 ma-2"
            label="Номер телефона"
            outlined
        ></v-text-field>
        <v-autocomplete
            class="col-5 ma-2"
            label="Город"
            outlined
            v-model="val"
            :items="cities"
            :search-input.sync="city"
            cache-items
        ></v-autocomplete>
      </v-row>
      <v-row class="mt-5 col-12">
        <v-row class="mt-3 col-12 CoolFont">
          <h1> Заказ: </h1>
        </v-row>
        <v-row class="col-12">
          <v-row class="col-12">
            <v-divider class="col-12"></v-divider>
          </v-row>
          <v-row class="col-12">
            <div class="col-2">
              <v-img class="col-12" max-height="70px" max-width="70px" src="https://www.meme-arsenal.com/memes/4ab9b67a0fcbc211e26408af2d3fd811.jpg"> </v-img>
            </div>
            <div class="col-5"> <a href="#"> Чашка чашка Чашка чашка Чашка чашка Чашка чашка Чашка чашка </a> </div>
            <v-row class="col-5 no_padd">
              <v-row class="col-4">
                <div class="col-12">Цена</div>
                <div class="col-12">222 </div>
              </v-row>
              <v-row class="col-4">
                <div class="col-12">Кол-во</div>
                <div class="col-12">222</div>
              </v-row>
              <v-row class="col-4">
                <div class="col-12">Сумма</div>
                <div class="col-12" >222</div>
              </v-row>
            </v-row>
          </v-row>
          <v-row class="col-12">
            <v-divider class="col-12"></v-divider>
          </v-row>
        </v-row>
      </v-row>

      <v-row class="mt-5 col-12">
        <v-row class="mt-3 col-12 CoolFont">
          <h1> Доставка: </h1>
        </v-row>
        <v-row class="mt-3 col-12">
          <v-row class="col-12">
          <v-radio-group class="col-12" v-model="selected">
            <div class="col-12">
              <v-row class="col-12 addBorder ma-4">
                <v-row class="col-12">
                  <v-radio value="что то там"></v-radio> <span>Самовывоз из отделений новой почты</span>
                  <v-spacer/>
                  <span> 59$ </span>
                </v-row>
                <v-row class="col-12 ml-3 mt-3">
                  <v-select
                      :items="buildsearch"
                  ></v-select>
                </v-row>
              </v-row>
              <v-row class="col-12 addBorder ma-4">
                <v-row class="col-12">
                  <v-radio value="Самовывоз из отделений новой почты" ></v-radio> <span>Самовывоз из отделений новой почты</span>
                  <v-spacer/>
                  <span> 59$ </span>
                </v-row>
                <v-row class="col-12 mt-3">
                  <v-text-field outlined class="col-5 mx-2" label="Улица" v-model="street"></v-text-field>
                  <v-text-field outlined class="col-3 mx-2" label="Дом" v-model="house"></v-text-field>
                  <v-text-field outlined class="col-3 mx-2" label="Квартира" v-model="apartment"></v-text-field>
                </v-row>
              </v-row>
            </div>
          </v-radio-group>
          </v-row>
        </v-row>
      </v-row>

      <v-row class="col-12" justify="center">
        <v-btn color="green" large  class="col-3">Подтвердить заказ</v-btn>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import firebase from 'firebase/firestore'
export default {
  data: () => ({
    model: 'Data',
    city: null,
    val: null,
    cities:[],
    loading: false,
    search: null,
    buildsearch:[],
    selected: null,
    street:'',
    house: '',
    apartment:''
  }),
  methods:{
     getCities: async function(city) {
       const self = this
      const raw = JSON.stringify({
        "modelName":"Address",
        "calledMethod":"getCities",
        "methodProperties":{
          "FindByString": city,
          "Language": "ru"
        },
        "apiKey":"c423454d5ee842c458f33615f55fe743"
      });

      const requestOptions = {
        method: 'POST',
        body: raw,
      };
      let array = []
      const responce = await fetch("https://api.novaposhta.ua/v2.0/json/", requestOptions).then(response => response.json())
       console.log(responce.data)
       await responce.data.forEach(item => {
         array.push(item.DescriptionRu.replace(/\([^)]+\)/,"")+ " (" + item.AreaDescriptionRu + " область)")
         console.log(item.DescriptionRu + ": " + item.Ref)
       })
       self.cities = array
    },
    getWarehouses :async function (city) {
       const self = this
       const raw = JSON.stringify({
         "modelName": "AddressGeneral",
         "calledMethod": "getWarehouses",
         "methodProperties": {
           "Language": "ru",
           "CityName": city
         },
         "apiKey":"c423454d5ee842c458f33615f55fe743"
       })
      const requestOptions = {
        method: 'POST',
        body: raw,
      };
      let array = []
      const responce = await fetch("https://api.novaposhta.ua/v2.0/json/", requestOptions).then(response => response.json())
      await responce.data.forEach(item => {
        if(item.DescriptionRu.includes("Отделение")){
          array.push(item.DescriptionRu)
        }
      })
      console.log(array)
      self.buildsearch = array
    }
  },
  computed:{
    targetName :function(){
      return  this.val? this.val.replace(/\([^)]+\)/,"").trim() : ''
    }
  },
  watch:{
    city: function (val,oldVal)  {
      this.getCities(val)
    },
    val: function (val, oldVal){
      console.log(val)
      this.getWarehouses(this.targetName)
    }
  },
}
</script>


<style scoped>
.header{
  font: 1.2rem "Comic Sans MS";
  font-weight: lighter;
}
.no_padd{
  padding-top: 0 !important;
}
.CoolFont{
  font: 1rem "Comic Sans MS";
  font-weight: lighter;
}
.addBorder{
  border: 1px solid green;
  border-radius: 14px;
}
</style>