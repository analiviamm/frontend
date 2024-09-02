<template>
  <div style="border-radius: 10px;padding-left: 20px;padding-right: 20px; background-color: white;">
    <v-row>
      <v-col cols="4" class="table-column">Nome</v-col>
      <v-col cols="4" class="table-column">Constante (µSv.m2/h.GBq)</v-col>
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
  background-color: white;
  border-radius: 10px;
}

.table-row {
  border-radius: 10px;
  margin-bottom: 10px;
}

.table-column {
  font-family: Poppins-Bold;
  font-size: 15px;
  padding-left: 25px;
  padding-bottom: 20px;
}

@media only screen and (max-width: 600px) {
  .table-container {
    max-height: fit-content;
    overflow-y: unset;
  }

  .table-column {
    font-size: 11px;
  }
}
</style>
