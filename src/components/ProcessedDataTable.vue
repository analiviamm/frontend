<template>
  <v-row class="table-header">
    <v-col cols="2" class="table-title">Material</v-col>
    <v-col cols="2" class="table-title">Constante (µSv.m2/h.GBq)</v-col>
    <v-col cols="2" class="table-title">Atividade (GBq)</v-col>
    <v-col cols="6" class="table-title">Medidas de Precaução</v-col>
  </v-row>
  <v-row class="table-content" v-for="data in processed_data" :key="data.id">
        <processed-data-table-line :processed-data-object="data"></processed-data-table-line>
  </v-row>
</template>

<script setup>
import { defineProps, toRef } from "vue";
import ProcessedDataTableLine from "@/components/ProcessedDataTableLine.vue";

const props = defineProps({
  processedDataList: Array,
})

const processed_data = toRef(props, 'processedDataList')
</script>

<style scoped>
.table-header {
  background-color: #f2f2f2;
  font-family: Poppins-Bold;
  border-bottom: 2px solid #ddd;
  padding: 10px 0;
}

.table-content {
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
}

.table-title {
  font-weight: bold;
  text-align: center;
}

.v-row {
  margin: 0;
}
</style>
