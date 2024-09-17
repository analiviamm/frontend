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
    <v-col class="col" cols="3">
      <v-btn @click="emitResult">Ver Relatório</v-btn>
    </v-col>
    <v-col class="col" cols="3">
      <v-btn @click="handleExclusionDialogOpening">Excluir</v-btn>
    </v-col>
  </v-row>
  <v-dialog v-model="exclusionDialog" max-width="400">
      <v-card>
        <v-card-title class="headline">Excluir resultado?</v-card-title>
        <v-card-text>Deseja realmente excluir esse resultaod?</v-card-text>
        <v-card-actions>
          <v-btn color="primary" text @click="handleExclusionDialogClosing(false)">Cancelar</v-btn>
          <v-btn color="primary" text @click="handleExclusionDialogClosing(true)">Excluir</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script setup>
import {defineProps, defineEmits, ref, toRef} from "vue";
import axios from "axios";

const props = defineProps({
  previousResultsObject: Object,
})

const emit = defineEmits(['open_result', 'exclude_result'])

const data = toRef(props, "previousResultsObject")

const dateISO = data.value.date; // Exemplo: "2024-09-05"
const [year, month, day] = dateISO.split("-");
const formattedDate = `${day}/${month}/${year}`;
const radiation_level = data.value.radiation_level
const altitude = data.value.altitude

const exclusionDialog = ref(false)
const handleExclusionDialogOpening = () => exclusionDialog.value = true

function handleExclusionDialogClosing(happened) {
  if (happened) {
    excludeResult()
  }
  exclusionDialog.value = false
}

async function excludeResult() {
  try {
    const response = await axios.delete(`/delete_result/`, {
      params: { result_id: data.value.id }
    });
    if (response.status === 200) {
      emit('exclude_result', { 'excluded_id': data.value.id });
    } else {
      console.error('Erro ao excluir o resultado:', response.status);
    }
  } catch (error) {
    console.error('Erro ao excluir o resultado:', error);
  }
}
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
