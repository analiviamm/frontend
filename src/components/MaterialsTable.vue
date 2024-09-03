<template>
  <div style="border-radius: 10px; padding: 20px; background-color: white;">
    <v-row>
      <v-col cols="4" style="padding-left: 150px" class="table-column">Nome</v-col>
      <v-col cols="4" style="padding-left: 80px" class="table-column">Constante (µSv.m2/h.GBq)</v-col>
    </v-row>
    <v-row class="table-row" v-for="material in materials" :key="material.id">
      <materials-table-line :material-object="material"></materials-table-line>
    </v-row>
  </div>
</template>

<script>
import { toRef } from "vue";
import MaterialsTableLine from "@/components/MaterialsTableLine.vue";

export default {
  name: 'MaterialsTable',
  props: {
    materialsList: Array,
  },
  components: {
    MaterialsTableLine,
  },
  setup(props, ) {
    const materials = toRef(props, 'materialsList')


    return {
      materials,
    }
  }
}
</script>

<style lang="scss" scoped>
.table-container {
  max-height: 265px;
  overflow-y: scroll;
  background-color: #F5F5F5;
  border-radius: 10px;
}

.table-row {
  border-radius: 10px;
  margin-bottom: 10px;
  background-color: #FFFFFF;
  padding: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.table-column {
  font-family: Poppins-Bold;
  font-size: 16px;
  color: #4A4A4A;
  padding-left: 25px;
  padding-bottom: 20px;
}
</style>
