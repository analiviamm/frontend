<template>
  <v-dialog v-model="isDialogOpen" max-width="600">
    <v-card>
      <v-card-title class="headline">Editar Dados do Voo</v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            v-model="radiation_level"
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
          <v-text-field
            v-model="flight_description"
            label="Detalhes do Voo"
            outlined
            dense
            class="input-field"
            placeholder="Insira aqui informações relevantes sobre o voo."
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" text @click="closeDialog(false)">Cancelar</v-btn>
        <v-btn color="primary" text @click="handleSave">Salvar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import {ref, defineProps, defineEmits, computed} from 'vue';
import axios from "axios";

const props = defineProps({
  isOpen: Boolean,
  resultData: Object
});

const emit = defineEmits(['close', 'saved']);

const isDialogOpen = ref(props.isOpen);
const data = ref(props.resultData)
const radiation_level = ref(data.value.radiation_level)
const altitude = ref(data.value.altitude)
const flight_description = ref(data.value.flight_description)

const min_radius = computed(() => Math.sqrt(radiation_level.value * altitude.value * altitude.value / 0.1))
const access_restrict = computed(() => Math.sqrt(radiation_level.value*altitude.value*altitude.value/0.116))
const tireoide_monitoring = computed(() => Math.sqrt(radiation_level.value*altitude.value*altitude.value/0.6))
const aliment_restrict = computed(() => Math.sqrt(radiation_level.value * altitude.value * altitude.value))
const people_reallocation = computed(() => Math.sqrt(radiation_level.value*altitude.value*altitude.value/100))
const immediate_evacuation = computed(() => Math.sqrt(radiation_level.value*altitude.value*altitude.value/1000))
const first_minute_contact = computed(() => (50000*60/(radiation_level.value*altitude.value*altitude.value)))
const second_minute_contact = computed(() => (100000*60/(radiation_level.value*altitude.value*altitude.value)))


function closeDialog(saved) {
  emit('close', saved);
}

async function editResult(resultId) {
  try {
    const response = await axios.put(`/edit_result/${resultId}/`, {
      radiation_level: radiation_level.value,
      altitude: altitude.value,
      flight_description: flight_description.value,
      min_radius: min_radius.value,
      access_restrict: access_restrict.value,
      tireoide_monitoring: tireoide_monitoring.value,
      aliment_restrict: aliment_restrict.value,
      people_reallocation: people_reallocation.value,
      immediate_evacuation: immediate_evacuation.value,
      first_minute_contact: first_minute_contact.value,
      second_minute_contact: second_minute_contact.value
    })

    if (response.status === 200) {
      emit('saved')
    } else {
      console.error('Erro ao salvar o resultado:', response.status)
    }
  } catch (error) {
    console.error('Erro ao salvar o resultado:', error)
  }
}


async function handleSave() {
  const resultId = data.value.id
  await editResult(resultId);
  closeDialog(true);
}

const rules = {
  float: value => !isNaN(parseFloat(value)) || 'Digite um valor válido',
};
</script>

<style scoped>
.input-field {
  margin-bottom: 16px;
}
</style>
