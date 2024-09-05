<template>
  <v-container class="new-padding">
    <sidebar-menu></sidebar-menu>

    <v-row class="text-center">
      <v-col cols="8" sm="10" md="10" lg="11" xl="11" align-self="end" class="main-title">
        Resultados Anteriores
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="12" md="12" lg="12" xl="12" class="main-content">
        <div class="section-header">Histórico de Resultados</div>
        <p class="section-description">
          Abaixo estão os resultados anteriores que foram salvos, ordenados por data. Clique em "Ver Resultados" para
          visualizar os detalhes de cada linha.
        </p>
        <loader-component v-if='loadingPreviousResults' color="#9F365B"></loader-component>
        <previous-result-table
          v-else
          :previous-results-list="previous_results"
          @open_result="openProcessedData"
        ></previous-result-table>
      </v-col>
    </v-row>

    <v-dialog v-model="showProcessedDataDialog" persistent>
      <processed-data
        @dialog_close="closeProcessedData"
        :radiation-level="parseFloat(radiationLevel)"
        :altitude="parseFloat(altitude)"
        :old-result="true">
      </processed-data>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import LoaderComponent from "@/components/LoaderComponent.vue";
import PreviousResultTable from "@/components/PreviousResultTable.vue";
import SidebarMenu from "@/components/SidebarMenu.vue";
import ProcessedData from "@/components/ProcessedData.vue";

const previous_results = ref([]);
const loadingPreviousResults = ref(false);
const showProcessedDataDialog = ref(false);
const radiationLevel = ref(null);
const altitude = ref(null);

async function getPreviousResults() {
  loadingPreviousResults.value = true;
  try {
    const response = await axios.get('get_results/');
    previous_results.value = response.data.map(item => ({ ...item }));
  } catch (error) {
    console.error('Error fetching previous results:', error);
  } finally {
    loadingPreviousResults.value = false;
  }
}

function openProcessedData(radiation_level, altitude_value) {
  radiationLevel.value = radiation_level;
  altitude.value = altitude_value;
  showProcessedDataDialog.value = true;
}

function closeProcessedData() {
  showProcessedDataDialog.value = false;
}

onMounted(() => {
  getPreviousResults();
});
</script>

<style scoped>
.new-padding {
  padding: 50px 60px 10px 60px;
}

.main-title {
  font-size: 32px;
  font-weight: bold;
  color: #4A4A4A;
}

.main-content {
  margin-top: 20px;
}

.section-header {
  font-size: 24px;
  font-weight: bold;
  color: #4A4A4A;
  margin-bottom: 10px;
}

.section-description {
  font-size: 16px;
  color: #7A7A7A;
  margin-bottom: 20px;
}

.v-dialog {
  padding: 20px;
}

.loader-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}

</style>
