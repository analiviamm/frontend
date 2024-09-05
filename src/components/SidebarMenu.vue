<template>
  <div>
    <v-row v-if="!drawer" class="btn-visibility">
      <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12" style="display: flex; justify-content: space-between">
        <v-btn @click.stop="toggleDrawer" elevation="0" floating class="menu-button">
          <v-icon>mdi mdi-bookmark</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-navigation-drawer fixed elevation="0" floating :width="drawerWidth" v-model="drawer" class="sidebar">
      <div class="sidebar-menu">
        <v-img
          :src="require('../assets/logoime.png')"
          class="logo"
        />
        <router-link to="/" v-slot="{ navigate }" style="text-decoration: none">
          <v-btn role="link" @click="navigate" class="list-link">
            Menu Principal
          </v-btn>
        </router-link>
        <router-link to="/input_data" v-slot="{ navigate }" style="text-decoration: none">
          <v-btn role="link" @click="navigate" class="list-link">
            Gerar Dados
          </v-btn>
        </router-link>
        <router-link to="/materials" v-slot="{ navigate }" style="text-decoration: none">
          <v-btn role="link" @click="navigate" class="list-link">
            Materiais
          </v-btn>
        </router-link>
        <router-link to="/previous_results" v-slot="{ navigate }" style="text-decoration: none">
          <v-btn role="link" @click="navigate" class="list-link">
            Resultados Anteriores
          </v-btn>
        </router-link>
        <v-btn icon @click="toggleDrawer" class="close-button">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { ref, computed } from "vue";

export default {
  name: 'SidebarMenu',
  props: {
    activeElement: String,
  },
  emits: ['close_drawer'],
  setup(props, { emit }) {

    const drawer = ref(window.innerWidth >= 900);

    const drawerWidth = computed(() => {
      return window.innerWidth < 500 ? 300 : 360;
    });

    function toggleDrawer() {
      drawer.value = !drawer.value;
      emit("close_drawer", {'happened': drawer.value});
    }

    return {
      drawer,
      drawerWidth,
      toggleDrawer,
    };
  }
}
</script>

<style scoped>
.sidebar-menu {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  gap: 15px;
  width: 100%;
}

.sidebar-menu > * {
  max-width: 260px;
}

.sidebar {
  background-color: #2596be; /* Azul consistente com o tema */
  color: white;
}

.logo {
  width: 280px;
  height: 200px;
  margin-top:-300px;
  margin-bottom: -60px;
}

.btn-visibility {
  margin-bottom: 10px;
  display: flex;
  position: fixed;
  left: 10px;
  width: 100%;
}

.menu-button {
  background-color: #2596be; /* Cor de fundo azul para o botão */
  color: white;
}

.close-button {
  position: absolute;
  top: 16px;
  right: 16px;
  color: #2596be;
}

.list-link {
  color: #2596be; /* Garantir que os links estejam visíveis sobre o fundo azul */
}
</style>
