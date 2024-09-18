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
    <v-col class="col" cols="2">
      <v-icon @click="openFlightDetailsDialog">mdi-notebook</v-icon> <!-- Ícone de caderno -->
    </v-col>
    <v-col class="col" cols="2">
      <v-icon @click="emitResult" class="action-icon">mdi-file-document</v-icon>
    </v-col>
    <v-col class="col" cols="1">
      <v-icon @click="openEditDialog" class="action-icon">mdi-pencil</v-icon>
    </v-col>
    <v-col class="col" cols="1">
      <v-icon @click="handleExclusionDialogOpening" class="action-icon">mdi-delete</v-icon>
    </v-col>
  </v-row>

  <v-dialog v-model="flightDetailsDialog" max-width="400">
    <v-card>
      <v-card-title class="headline">Detalhes do Voo</v-card-title>
      <v-card-text>{{ flight_description }}</v-card-text>
      <v-card-actions>
        <v-btn color="primary" text @click="closeFlightDetailsDialog">Fechar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog v-model="exclusionDialog" max-width="400">
      <v-card>
        <v-card-title class="headline">Excluir resultado?</v-card-title>
        <v-card-text>Deseja realmente excluir esse resultado?</v-card-text>
        <v-card-actions>
          <v-btn color="primary" text @click="handleExclusionDialogClosing(false)">Cancelar</v-btn>
          <v-btn color="primary" text @click="handleExclusionDialogClosing(true)">Excluir</v-btn>
        </v-card-actions>
      </v-card>
  </v-dialog>

  <edit-result-dialog
    v-model="editDialog"
    :result-data="data"
    @close="closeEditDialog"
  />
</template>

<script setup>
import {defineProps, defineEmits, ref, toRef} from "vue";
import axios from "axios";
import EditResultDialog from "@/components/EditResultDialog.vue";

const props = defineProps({
  previousResultsObject: Object,
})

const emit = defineEmits(['open_result', 'exclude_result', 'saved'])

const data = toRef(props, "previousResultsObject")

const dateISO = data.value.date; // Exemplo: "2024-09-05"
const [year, month, day] = dateISO.split("-");
const formattedDate = `${day}/${month}/${year}`;
const radiation_level = data.value.radiation_level
const altitude = data.value.altitude
const flight_description = data.value.flight_description

const exclusionDialog = ref(false)
const flightDetailsDialog = ref(false)
const editDialog = ref(false);

function openFlightDetailsDialog() {
  flightDetailsDialog.value = true;
}

function closeFlightDetailsDialog() {
  flightDetailsDialog.value = false;
}

function openEditDialog() {
  editDialog.value = true;
}

function closeEditDialog(saved) {
  if(saved) {
    emit('saved')
  }
  editDialog.value = false;
}
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
  emit('open_result', radiation_level, altitude, flight_description);
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
