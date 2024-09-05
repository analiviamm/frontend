<template>
  <v-row class="table-header">
    <v-col cols="2" class="table-title">Data</v-col>
    <v-col cols="2" class="table-title">Nível de Radiação (µSv/h)</v-col>
    <v-col cols="2" class="table-title">Altitude (m)</v-col>
    <v-col cols="6" class="table-title">Resultado</v-col>
  </v-row>
  <v-row class="table-content" v-for="data in previous_results" :key="data.id">
    <previous-result-table-line :previous-results-object="data" @open_result="handleOpenResult"></previous-result-table-line>
  </v-row>
</template>

<script setup>
import { defineProps, defineEmits, toRef } from "vue";
import PreviousResultTableLine from "@/components/PreviousResultTableLine.vue";

const props = defineProps({
  previousResultsList: Array,
})

const emit = defineEmits(['open_result']);

const previous_results = toRef(props, 'previousResultsList')

function handleOpenResult(radiation_level, altitude) {
  emit('open_result', radiation_level, altitude);
}

</script>

<style scoped>
.table-header {
  background-color: #f5f5f5;
  font-family: Poppins-Bold;
  border-bottom: 2px solid #ddd;
  padding: 10px 0;
}

.table-content {
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
}

.table-title {
  font-family: Poppins-Bold;
  text-align: center;
  color: #2596be;
}

.v-row {
  margin: 0;
  padding: 0;
}
</style>
