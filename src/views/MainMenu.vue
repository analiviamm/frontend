<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/logoime.png')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Apoio à Decisão IDQBRN
        </h1>


        <p class="subheading font-weight-regular">
          Esse aplicativo tem como objetivo fornecer informações para
          melhor tomada de decisão frente a uma possível ameaça radiológica.
        </p>
      </v-col>

      <v-col
        class="mb-5"
        cols="12"
      >
        <router-link to="/input_data">
          <v-btn>Imputar Dados</v-btn></router-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'MainMenu',

  setup() {
    return {}
  },

}
</script>
