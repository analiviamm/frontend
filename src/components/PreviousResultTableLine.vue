<template>
  <v-row class="table-row">
    <v-col class="col" cols="2">
      <span>{{ formattedDate }}</span>
    </v-col>
    <v-col class="col" cols="2">
      <span>{{ radiation_level }}</span>
    </v-col>
    <v-col class="col" cols="2">
      <span>{{ altitude }}</span>
    </v-col>
    <v-col class="col" cols="6">
      <v-btn @click="emitResult">Ver resultado</v-btn>
    </v-col>
  </v-row>
</template>

<script setup>
import {defineProps, defineEmits, toRef} from "vue";

const props = defineProps({
  previousResultsObject: Object,
})

const emit = defineEmits(['open_result'])

const data = toRef(props, "previousResultsObject")

const dateISO = data.value.date; // Exemplo: "2024-09-05"
const [year, month, day] = dateISO.split("-");
const formattedDate = `${day}/${month}/${year}`;
const radiation_level = data.value.radiation_level
const altitude = data.value.altitude

function emitResult() {
  emit('open_result', radiation_level, altitude);
}

</script>

<style scoped>
.table-row {
  padding: 10px;
  border-bottom: 1px solid #ddd;
  display: flex;
  align-items: center;
  background-color: #ffffff;
}

.col {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  word-break: break-word;
}
</style>
