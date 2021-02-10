<template>
  <div class="">
    <v-container>
      <v-row class="mt-12 header">
        <h1>Оформление заказа:</h1>
      </v-row>
      <v-form v-model="valid">
      <v-row class="ma-5 mt-12">
        <v-text-field
            class="col-5 ma-2"
            label="Фамилия"
            outlined
            :rules="surnameRules"
            v-model="surname"
        ></v-text-field>
        <v-text-field
            class="col-5 ma-2"
            label="Имя"
            outlined
            :rules="nameRules"
            v-model="name"
        ></v-text-field>
        <v-text-field
            class="col-5 ma-2"
            label="Номер телефона"
            outlined
            :rules="phoneRules"
            v-model="phone"
        ></v-text-field>
        <v-autocomplete
            class="col-5 ma-2"
            label="Город"
            outlined
            v-model="val"
            :items="cities"
            :search-input.sync="city"
            cache-items
            :rules="cityRules"
        ></v-autocomplete>
      </v-row>
      </v-form>
      <v-row class="mt-5 col-12">
        <v-row class="mt-3 col-12 CoolFont">
          <h1> Заказ: </h1>
        </v-row>
        <v-row class="col-12">
          <v-row class="col-12" >
            <v-divider class="col-12"></v-divider>
          </v-row>
          <v-row class="col-12 ma-4" style="border: 1px solid black; border-radius: 20px " v-for="item in items">
            <CheckItem :item="item" />
          </v-row>
          <v-row class="col-12">
            <v-divider class="col-12"></v-divider>
          </v-row>
        </v-row>
      </v-row>

      <v-row class="mt-1 col-12">
        <v-row class=" col-12 CoolFont">
          <h1> Доставка: </h1>
        </v-row>
        <v-row class="col-12">
          <v-radio-group class="col-12" v-model="selected">
            <div class="col-12">
              <v-row class="col-12 addBorder my-4">
                <v-row class="col-12">
                  <v-radio value="Самовывоз" @click="deliveryPrice = 59"></v-radio>
                  <span>Самовывоз из отделений новой почты</span>
                  <v-spacer/>
                  <span> 59₴ </span>
                </v-row>
                <v-row class="col-12 ml-3 mt-3" v-show="selected === 'Самовывоз'">
                  <v-select
                      :items="buildsearch"
                      v-model="branch"
                  ></v-select>
                </v-row>
              </v-row>
              <v-row class="col-12 addBorder my-4">
                <v-row class="col-12">
                  <v-radio value="Доставка" @click="deliveryPrice = 69" ></v-radio> <span>Доставка</span>
                  <v-spacer/>
                  <span> 69₴ </span>
                </v-row>
                <v-row class="col-12 mt-3" v-show="selected === 'Доставка'">
                  <v-form v-model="validDelivery" class="col-12 d-flex">
                    <v-text-field outlined class="col-5 mx-2" label="Улица" v-model="street" :rules="allRules"></v-text-field>
                    <v-text-field outlined class="col-3 mx-2" label="Дом" v-model="house" :rules="allRules"></v-text-field>
                    <v-text-field outlined class="col-3 mx-2" label="Квартира" v-model="apartment" :rules="allRules"></v-text-field>
                  </v-form>
                </v-row>
              </v-row>
            </div>
          </v-radio-group>
        </v-row>
      </v-row>

      <v-row class="col-12 addBorder my-5"  >
        <v-col class="col-8">
          <h2>Итого:</h2>
        </v-col>
        <v-col class="col-4">
          <v-row class="col-12"> Стоемость товаров: <span class="mx-3 money"> {{this.$store.getters.totalPrice}}₴ </span>  </v-row>
          <v-row class="col-12"> Стоемость доставки: <span class="mx-3 money"> {{deliveryPrice}}₴ </span> </v-row>
          <v-divider class="col-12"/>
          <v-row class="col-12"> К оплате: <span class="mx-3 money"> {{this.$store.getters.totalPrice + deliveryPrice}}₴ </span> </v-row>
        </v-col>
      </v-row>

      <v-row class="col-12" justify="center">
        <v-btn color="green" large  class="col-3" @click="sendMail">Подтвердить заказ</v-btn>
      </v-row>


      <v-snackbar
          v-model="snackbar"
          :timeout="10000"
      >
        Часть данных не введена или введена неправильно

        <template v-slot:action="{ attrs }">
          <v-btn
              color="pink"
              text
              v-bind="attrs"
              @click="snackbar = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
      <v-snackbar
          v-model="success"
          :timeout="10000"
      >
        Ваша заявка будет обработана в скором времени, после чего мы вам позвоним

        <template v-slot:action="{ attrs }">
          <v-btn
              color="pink"
              text
              v-bind="attrs"
              @click="success = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-container>
  </div>
</template>

<script>
import emailjs from 'emailjs-com';
import CheckItem from '@/components/CheckItem'
export default {
  components:{
    CheckItem
  },
  data: () => ({
    model: 'Data',

    snackbar:false,
    success: false,

    deliveryPrice: 0,

    name:'',
    surname:'',
    phone:'',
    city: null,
    val: '',
    cities:[],
    loading: false,
    search: null,
    buildsearch:[],
    selected: null,

    branch: '',
    street:'',
    house: '',
    apartment:'',

    valid:false,
    validDelivery:false,

    nameRules:[
        v => !!v || 'Это поле обязательно к заполнению',
        v => /^[A-Za-z]+$/.test(v) || 'Имя не должно содержать цифры'
    ],
    surnameRules:[
      v => !!v || 'Это поле обязательно к заполнению',
      v => /^[A-Za-z]+$/.test(v) || 'Фамилия не должна содержать цифры'
    ],
    phoneRules:[
        v => /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{6}$/im.test(v) || 'Телефон введен неправильно',
        v => !!v || 'Это поле обязательно к заполнению'
    ],
    cityRules:[
        v => !!v || 'Город необходим'
    ],
    allRules:[
        v => !!v || 'Это поле обязательно к заполнению'
    ],

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
    },
    sendMail(){
       if(this.valid){
         let codes = ''
         this.items.forEach(item => {
           codes += `Товар под кодом ${item.code} в размере ${item.howMany} штук \n`
         })

         let my_obj = {
             name: this.name,
             surname:this.surname,
             phone: this.phone,
             codes
         }

         if(this.selected === 'Самовывоз'){
           if(this.branch){
             my_obj = Object.assign(my_obj,{
               typeOfDelivery: 'Самовывоз из отеделения новой почты',
               deliveryData: `г.${this.city} ${this.branch}`
             })
             emailjs.send('service_s0yi3o8','template_ic0abrn',my_obj, 'user_7laPrN7hFZSJyaUiLnv0T')
             this.success = true
           }else {
             this.snackbar = true
           }
         }
         else {
           if(this.validDelivery){
             my_obj = Object.assign(my_obj,{
               typeOfDelivery: 'Доставка куръером',
               deliveryData: `г.${this.city} ул.${this.street} д.${this.house} кв.${this.apartment}`
             })
             emailjs.send('service_s0yi3o8','template_ic0abrn',my_obj, 'user_7laPrN7hFZSJyaUiLnv0T')
             this.success = true
           }else {
             this.snackbar = true
           }
         }
       }else {
         this.snackbar = true
       }
    }
  },
  computed:{
    targetName :function(){
      return  this.val? this.val.replace(/\([^)]+\)/,"").trim() : ''
    },
    items : function (){
      return this.$store.getters.basket || []
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
  created() {
    if(!this.$store.getters.basket.length){
      this.$router.push('/')
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
.money{
  font: 1.3rem Arial;
}
</style>