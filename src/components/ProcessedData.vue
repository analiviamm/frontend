<template>
  <v-container class="processed-container">
    <div class="content-wrapper">
      <div v-if="loading" class="loader-wrapper">
        <LoaderComponent color="#9F365B"></LoaderComponent>
      </div>
      <div class="data-content">
        <v-row justify="center" class="title-bold">
          <h2>Resultados Obtidos</h2>
          <h3>Abaixo, temos o raio mínimo para a dose segura de 0.1 µSv/h e as recomendações de segurança gerais para a dose informada.</h3>
        </v-row>
        <v-row class="data-row">
          <h4 class="data-bold">Nível de Radiação: </h4> <span class="data-bold"> {{ radiationLevel }} µSv/h </span>
        </v-row>
        <v-row class="data-row">
          <h4 class="data-bold">Altitude: </h4> <span class="data-bold"> {{ altitude }} m </span>
        </v-row>
        <v-row class="data-row">
          <h4 class="data-bold">Raio de Segurança Mínimo: </h4> <span class="data-bold"> {{ min_radius }} m </span>
        </v-row>

      </div>
      <v-row class="footer" >
        <v-col cols="10" class="left">
          <v-btn class="action-btn" @click="emit('dialog_close', false)">Fechar</v-btn>
        </v-col>
        <v-col v-if="!oldResult" cols="2" class="right d-flex">
          <v-btn class="action-btn" @click="saveResult">Salvar Resultado</v-btn>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script setup>
import {ref, defineProps, defineEmits, computed} from "vue";
import axios from "axios";

import LoaderComponent from "@/components/LoaderComponent.vue";

const props = defineProps({
  radiationLevel: Number,
  altitude: Number,
  oldResult: Boolean
})

const emit = defineEmits([
  'dialog_close',
])

const radiationLevel = ref(props.radiationLevel)
const altitude = ref(props.altitude)
const oldResult = ref(props.oldResult)
const loading = ref(false)
const min_radius = computed(() => Math.sqrt(radiationLevel.value * altitude.value * altitude.value / 0.1))



async function saveResult() {
  const today = new Date().toISOString().split('T')[0]
  console.log(today)
  try {
    const response = await axios.post('/create_result/', {
      date: today,
      radiation_level: radiationLevel.value,
      altitude: altitude.value
    })

    if (response.status === 201) {
      emit('dialog_close', true)
    } else {
      console.error('Erro ao salvar o resultado:', response.status)
    }
  } catch (error) {
    console.error('Erro ao salvar o resultado:', error)
  }
}

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
  //min-height: calc(100vh - 60px); /* Garante que o conteúdo tenha altura mínima suficiente */
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

