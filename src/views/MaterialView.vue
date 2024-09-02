<template>
  <v-container class="new-padding">
    <sidebar-menu></sidebar-menu>
    <v-row class="text-center">
      <v-col cols="8" sm="10" md="10" lg="11" xl="11" align-self="end" class="main-title">
        Materiais Radioativos
      </v-col>
    <v-row>
      <v-col cols="12" sm="12" md="12" lg="12" xl="12" class="main-content">
        <material-form :title="creationMaterialTitle" :subtitle="creationMaterialSubtitle"
                      :material-object="emptyMaterial" @close_form="hideForm"></material-form>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="12" md="12" lg="12" xl="12" class="main-content">
        <div class="table-content">
          <div class="table-title">
            Materiais Cadastrados
          </div>
          <materials-table v-if="materials.length > 0" :materials-list="materials"
                           ></materials-table>
          <div v-else class="no-materials">
            Não existem materiais cadastrados!
          </div>
        </div>
      </v-col>
      <loader-component v-if='loading' color="#9F365B"></loader-component>
    </v-row>
    </v-row>
  </v-container>
</template>

<script>
import MaterialForm from "@/components/MaterialForm.vue";
import MaterialsTable from "@/components/MaterialsTable.vue";
import LoaderComponent from "@/components/LoaderComponent.vue";
import { ref, onMounted } from "vue";
import axios from "axios";
import SidebarMenu from "@/components/SidebarMenu.vue";

export default {
  name: 'MaterialView',
  components: {
    SidebarMenu,
    MaterialForm,
    MaterialsTable,
    LoaderComponent,
  },
  setup() {

    const materials = ref([]);
    const loading = ref(false);


    async function getMaterials() {
      loading.value = true;
      try {
        const response = await axios.get('get_materials/');
        materials.value = response.data.map(item => ({
          ...item
        }));
        console.log(response.data)
        console.log(materials.value)
      } catch (error) {
        console.error("Erro ao carregar os materiais", error);
      } finally {
        loading.value = false;
      }
    }


    async function createMaterial(data) {
      loading.value = true;
      console.log(data)
      try {
        const response = await axios.post('/create_material/', data);
        materials.value.push(response.data);
      } catch (error) {
        console.error("Erro ao criar o material", error);
      } finally {
        loading.value = false;
        await getMaterials();
      }
    }

    onMounted(() => {
      getMaterials();
    });

    const emptyMaterial = ref({ name: "", constant: "" });
    const creationMaterialTitle = ref("Novo Material");
    const creationMaterialSubtitle = ref("Preencha o nome e a constante do material.");

    function hideForm(actions) {
      console.log("create")
      createMaterial(actions['payload']);
    }

    return {
      materials,
      emptyMaterial,
      creationMaterialTitle,
      creationMaterialSubtitle,
      loading,
      hideForm
    };
  },
}
</script>

<style scoped>
.new-padding {
  padding: 50px 60px 10px 60px;
}

.main-title {
  font-size: 30px;
}

.main-content {
  justify-content: center;
  align-items: normal;
  height: fit-content;
}

.table-content {
  border-radius: 10px;
}

.table-title {
  font-family: Poppins-Bold;
  font-size: 20px;
  color: white;
  padding: 10px 32px 20px 32px;
}

.no-materials {
  border-radius: 10px;
  padding: 20px;
  background-color: white;
  display: flex;
  justify-content: center;
}

</style>
