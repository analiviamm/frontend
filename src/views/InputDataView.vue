<template>
  <v-container>
    <sidebar-menu></sidebar-menu>

    <v-row>
        <v-card class="pa-4" outlined>
          <v-card-title>
            <h2>Input dos Dados</h2>
          </v-card-title>
          <v-card-subtitle>
            <p>Digite o valor do nível de radiação, em µSv/h,
             e a altitude do drone para esse nível, em m.</p>
          </v-card-subtitle>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="radiationLevel"
                label="Nível de Radiação (µSv/h)"
                outlined
                dense
                type="number"
                :rules="[rules.float]"
                class="mb-4"
              />
              <v-text-field
                v-model="altitude"
                label="Altitude (m)"
                outlined
                dense
                type="number"
                :rules="[rules.float]"
                class="mb-4"
              />
              <v-btn @click="generateData" color="primary">Gerar Dados</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
    </v-row>
  </v-container>
</template>

<script>
import { ref } from 'vue';
import SidebarMenu from "@/components/SidebarMenu.vue";

export default {
  name: 'InputDataView',
  components: {SidebarMenu},

  setup() {
    const radiationLevel = ref(null);
    const altitude = ref(null);

    const generateData = () => {
      console.log('radiacao:', radiationLevel.value);
      console.log('altra:', altitude.value);
    };

    const rules = {
      float: value => {
        let parsedValue = parseFloat(value)
        if ((parsedValue && 0 <= parsedValue) || isNaN(parsedValue)) {
          return true
        }
        return 'Digite um valor válido'
      },
    }

    return {
      radiationLevel,
      altitude,
      generateData,
      rules
    };
  },
};
</script>

<style>

.v-card {
  max-width: 800px; /* Ajuste conforme necessário */
  margin: auto;
}

</style>