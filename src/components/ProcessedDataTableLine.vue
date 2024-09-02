<template>
  <v-row class="table-row">
    <v-col class ="col" cols="2">
      <span>{{ material }}</span>
    </v-col>
    <v-col class ="col" cols="2">
      <span>{{ constant }}</span>
    </v-col>
    <v-col class ="col" cols="2">
      <span>{{ activity }}</span>
    </v-col>
    <v-col class ="col" cols="6">
      <span>{{ precaution }}</span>
    </v-col>
  </v-row>
</template>

<script setup>
import {defineProps, toRef} from "vue";

const props = defineProps({
  processedDataObject: Object,
})

const data = toRef(props, "processedDataObject")

const material = data.value.material
const constant = data.value.constant
const activity = data.value.activity
const precaution = "gskfjdlkfgndjfgndkjfgnkdjfgn"
</script>

<style scoped>
.table-row {
  padding: 10px;
  border-bottom: 1px solid #ddd;
  display: flex;
  align-items: center;
}


.col {
  flex: 1; /* Faz com que todas as colunas tenham a mesma largura */
  display: flex;
  align-items: center;
  justify-content: center; /* Opcional: centraliza o conteúdo das colunas */
  word-break: break-word; /* Garante que o texto não saia da coluna */
}

</style>
