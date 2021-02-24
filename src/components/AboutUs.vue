<template>
  <v-dialog
      transition="dialog-bottom-transition"
      max-width="600"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
          color="transparent"
          v-bind="attrs"
          v-on="on"
      >
        <span class="mr-2">О нас</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </template>
    <template v-slot:default="dialog">
      <v-card>
        <v-toolbar
            color="primary"
            dark
        >О нас</v-toolbar>
        <v-card-text class="card_text">
          <div class="ma-4"> Наша компания занимается производством рамок на любой вкус, начиная от небольших фото-рам и заканчивая огромными зеркалами. Но так-же мы любим экспериментировать, поэтому нами и был создан этот проект. </div>
          <div class="ma-4">Посетите наш инстаграм с самыми необычными работами компании: <a target="_blank" href="https://www.instagram.com/gene_lvov_frames/"> @gene_lvov_frames </a> </div>
          <div class="ma-4 mb-0">Так-же вы всегда можете посетить наш офис по адресу:</div>
          <div class="mr-4 ml-7"> г. Винница, ул. Данила Галицкого 53</div>
          <div class="mr-4 ml-7">  49.229587295758776, 28.443609197610286</div>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn
              text
              @click="dialog.value = false"
          >Close</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<style scoped>
.card_text{
  font-size: 1rem;
}
.v-application a {
  color: #1EA1F7 !important;
}
</style>