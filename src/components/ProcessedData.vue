<template>
  <v-container class="back-color">
    <div class="content-wrapper">
      <div v-if="loading" class="loader-wrapper">
        <LoaderComponent color="#9F365B"></LoaderComponent>
      </div>
      <div>
        <v-row justify="center" class="title-bold">
          <h2>Resultados Obtidos</h2>
          <h3>Abaixo, temos os resultados, para cada possível material radioativo, das possíveis atividades
          e quais as medidas de segurança devem ser tomadas em cada caso.</h3>
        </v-row>
        <v-row style="padding: 12px;">
          <span class="patient-bold">Nível de Radiação: {{ radiationLevel }} µSv/h </span>
        </v-row>
        <v-row style="padding: 12px;">
          <span class="patient-bold">Altitude: {{ altitude }} m </span>
        </v-row>
        <v-row>
          <v-col>
            <loader-component v-if='loadingProcessedData' color="#9F365B"></loader-component>
            <div v-else v-show="processed_data.length > 0 || loadingProcessedData">
              <processed-data-table :processed-data-list="processed_data"></processed-data-table>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="text-right">
            <v-btn class="form-action-btn" @click="emit('dialog_close')">Fechar</v-btn>
          </v-col>
        </v-row>
      </div>
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
.content-wrapper {
  background-color: white;
  border-radius: 10px;
  padding: 20px;
}

.loader-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}

.v-row {
  margin: 0;
  padding: 0;
}

.title-bold {
  font-family: Poppins-Bold;
  font-size: 20px;
  text-align: center;
}

.patient-bold {
  font-family: Poppins-Bold;
}

.back-color {
  padding: 10px 0;
  border-radius: 10px;
  background-color: #f5f5f5;
}

.form-action-btn {
  font-family: Poppins-Bold;
  display: flex;
  align-items: center;
  cursor: pointer;
}
</style>