<template>
  <v-row class="table-row">
    <v-col class ="col" cols="4">
      <span>{{ name }}</span>
    </v-col>
    <v-col class ="col" cols="4">
      <span>{{ constant }}</span>
    </v-col>

  </v-row>
</template>

<script setup>
import {defineProps, toRef} from "vue";

const props = defineProps({
  materialObject: Object,
})

const material = toRef(props, "materialObject")
const name = material.value.name
const constant = material.value.constant

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
