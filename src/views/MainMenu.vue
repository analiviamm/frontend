<template>
  <v-container>
    <sidebar-menu></sidebar-menu>

    <v-row class="text-center main-content">
      <v-col cols="12">
        <v-img
          :src="require('../assets/logoime.png')"
          class="logo"
          contain
          height="200"
        />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold">
          Apoio à Decisão IDQBRN
        </h1>
        <p class="subheading">
          Esse aplicativo tem como objetivo fornecer informações para
          melhor tomada de decisão frente a uma possível ameaça radiológica.
        </p>
      </v-col>

      <v-col
        class="mb-5"
        cols="12"
      >
        <router-link to="/input_data">
          <v-btn class="action-btn">Gerar Relatório</v-btn>
        </router-link>
      </v-col>

      <v-col
        class="mb-5"
        cols="12"
      >
        <router-link to="/previous_results">
          <v-btn class="action-btn">Histórico de Dados</v-btn>
        </router-link>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
import SidebarMenu from "@/components/SidebarMenu.vue";

export default {
  name: 'MainMenu',
  components: { SidebarMenu },
}
</script>

<style scoped>
.main-container {
  background-color: #ffffff; /* Cor de fundo branca para o container principal */
  min-height: 100vh; /* Garante que o container preencha a altura da tela */
  padding: 0;
  margin: 0;
}

.main-content {
  padding: 20px;
}

.logo {
  margin: 20px 0;
}

.display-2 {
  font-family: Poppins-Bold;
  color: #2596be; /* Azul consistente com o tema */
}

.subheading {
  font-family: Poppins-Regular;
  color: #333;
}

.action-btn {
  background-color: #2596be; /* Azul consistente com o tema */
  color: white;
  font-family: Poppins-Bold;
}

.action-btn:hover {
  background-color: #1a7a9d; /* Tom um pouco mais escuro ao passar o mouse */
}
</style>
