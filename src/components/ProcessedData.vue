<template>
  <v-container class="processed-container">
    <div class="content-wrapper">
      <div v-if="loading" class="loader-wrapper">
        <LoaderComponent color="#9F365B"></LoaderComponent>
      </div>
      <div class="data-content">
        <v-row justify="center" class="title-bold">
          <h2>Resultados Obtidos</h2>
          <h3>Abaixo, temos os resultados, para cada possível material radioativo, das possíveis atividades
          e quais as medidas de segurança devem ser tomadas em cada caso.</h3>
        </v-row>
        <v-row class="data-row">
          <span class="data-bold">Nível de Radiação: {{ radiationLevel }} µSv/h </span>
        </v-row>
        <v-row class="data-row">
          <span class="data-bold">Altitude: {{ altitude }} m </span>
        </v-row>
        <v-row>
          <v-col>
            <loader-component v-if='loadingProcessedData' color="#9F365B"></loader-component>
            <div v-else v-show="processed_data.length > 0 || loadingProcessedData">
              <processed-data-table :processed-data-list="processed_data"></processed-data-table>
            </div>
          </v-col>
        </v-row>
      </div>
      <v-row class="footer">
        <v-col cols="12" class="left">
          <v-btn class="action-btn" @click="emit('dialog_close')">Fechar</v-btn>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script setup>
import {ref, defineProps, defineEmits, onMounted} from "vue";
import axios from "axios";

import LoaderComponent from "@/components/LoaderComponent.vue";
import ProcessedDataTable from "@/components/ProcessedDataTable.vue";

const props = defineProps({
  radiationLevel: Number,
  altitude: Number
})

const emit = defineEmits([
  'dialog_close',
])

const radiationLevel = ref(props.radiationLevel)
const altitude = ref(props.altitude)
const processed_data = ref([])

const loading = ref(false)
const loadingProcessedData = ref(false)

async function getProcessedDataBackend(radiationLevel, altitude) {
  try {
    const response = await axios.get('calculate_activity/', {
      params: {
        radiation_level: radiationLevel,
        altitude: altitude
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data from backend:', error);
    return [];
  }
}

async function getProcessedData(radiationLevel, altitude) {
  loading.value = true
  loadingProcessedData.value = true
  try {
    const responseProcessedData = await getProcessedDataBackend(radiationLevel, altitude);
    processed_data.value = responseProcessedData.map(item => ({
      ...item
    }));
  } catch (error) {
    console.error('Error processing data:', error);
  } finally {
    loading.value = false;
    loadingProcessedData.value = false;
  }
}

onMounted(() => {
  getProcessedData(radiationLevel.value, altitude.value)
})
</script>

<style scoped>
.processed-container {
  padding: 20px;
  background-color: #f5f5f5;
  max-height: 80vh; /* Ajuste conforme necessário */
  overflow-y: auto;
}

.content-wrapper {
  background-color: #FFFFFF;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  min-height: calc(100vh - 60px); /* Garante que o conteúdo tenha altura mínima suficiente */
  position: relative;
}

.loader-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}

.title-bold {
  font-family: Poppins-Bold;
  font-size: 20px;
  text-align: center;
  color: #2596be;
}

.data-bold {
  font-family: Poppins-Bold;
  font-size: 16px;
  color: #7A7A7A;
}

.data-row {
  padding: 12px 0;
}

.footer {
  position: sticky;
  bottom: 0;
  background-color: #f5f5f5;
  padding-top: 10px;
  padding-bottom: 10px;
  border-top: 1px solid #ddd;
}

.action-btn {
  font-family: Poppins-Bold;
  color: #2596be;
  border-radius: 10px;
  text-transform: none;
}

.action-btn:hover {
  background-color: #1a76d2;
}
</style>

