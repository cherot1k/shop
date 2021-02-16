<template>
  <v-navigation-drawer
  permanent
  class="nav d-flex"
  >
        <div class="bg_blue mx-2">
          <div class="mt-3">
            <span class="mb-5">Ширина внешней стороны:</span>
          </div>
            <v-checkbox
                style="max-height: 30px"
                v-for="item in inner_Width"
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
            <span>Высота внешней стороны стороны:</span>
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
export default{
  data: function () {
    return {

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