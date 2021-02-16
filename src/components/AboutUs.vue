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
        <span class="mr-2">Кто мы</span>
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
          <div class="ma-4"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto autem consectetur cumque, deleniti deserunt dolor, eligendi error eum hic itaque labore minus necessitatibus nisi numquam provident quibusdam saepe temporibus vitae! </div>
          <div class="ma-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto autem consectetur cumque, deleniti deserunt dolor, eligendi error eum hic itaque labore minus necessitatibus nisi numquam provident quibusdam saepe temporibus vitae!</div>
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
</style>