<template>
  <v-container class="input-container">
    <sidebar-menu></sidebar-menu>
    <v-row class="justify-center">
      <v-card class="pa-4 input-card" outlined>
        <v-card-title>
          <h2 class="input-title">Input dos Dados</h2>
        </v-card-title>
        <v-card-subtitle>
          <p class="input-subtitle">Digite o valor do nível de radiação, em µSv/h, e a altitude do drone para esse nível, em m.</p>
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
              class="input-field"
            />
            <v-text-field
              v-model="altitude"
              label="Altitude (m)"
              outlined
              dense
              type="number"
              :rules="[rules.float]"
              class="input-field"
            />
            <v-btn @click="generateData" class="input-btn">GERAR DADOS</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-row>
    <v-dialog v-model="showProcessedDataDialog" persistent>
      <processed-data @dialog_close="closeProcessedData"
        :radiation-level="parseFloat(radiationLevel)" :altitude="parseFloat(altitude)"></processed-data>
    </v-dialog>

    <v-dialog v-model="showSuccessDialog" max-width="400">
      <v-card>
        <v-card-title class="headline">Sucesso</v-card-title>
        <v-card-text>O resultado foi salvo com sucesso!</v-card-text>
        <v-card-actions>
          <v-btn color="primary" text @click="showSuccessDialog = false">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script>
import { ref } from 'vue';
import SidebarMenu from "@/components/SidebarMenu.vue";
import ProcessedData from "@/components/ProcessedData.vue";

export default {
  name: 'InputDataView',
  components: { ProcessedData, SidebarMenu },

  setup() {
    const radiationLevel = ref(null);
    const altitude = ref(null);
    const showProcessedDataDialog = ref(false);
    const showSuccessDialog = ref(false)

    function closeProcessedData(saved) {
      showProcessedDataDialog.value = false
      if(saved) {
        showSuccessDialog.value = true
      }

    }

    function generateData() {
      showProcessedDataDialog.value = true;
    }

    const rules = {
      float: value => {
        let parsedValue = parseFloat(value);
        if ((parsedValue && 0 <= parsedValue) || isNaN(parsedValue)) {
          return true;
        }
        return 'Digite um valor válido';
      },
    };

    return {
      radiationLevel,
      altitude,
      generateData,
      rules,
      showProcessedDataDialog,
      showSuccessDialog,
      closeProcessedData
    };
  },
};
</script>

<style scoped>
.input-container {
    padding: 50px 60px 10px 60px;
    position: relative; /* Adicionado para garantir que o conteúdo não sobreponha o sidebar */
}

.input-card {
  background-color: #FFFFFF;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative; /* Adicionado para garantir que o card não seja sobreposto pelo sidebar */
}

.input-title {
  font-family: Poppins-Bold;
  font-size: 22px;
  color: #2596be;
}

.input-subtitle {
  font-family: Poppins-Light;
  font-size: 16px;
  color: #7A7A7A;
}

.input-field {
  margin-bottom: 16px;
  border-radius: 10px;
}

.input-btn {
  font-family: Poppins-Bold;
  background-color: #2596be;
  color: #FFFFFF;
  border-radius: 10px;
  text-transform: none;
}

.input-btn:hover {
  background-color: #1a76d2;
}
</style>
