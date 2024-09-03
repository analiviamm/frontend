<template>
  <v-col>
    <v-row>
      <v-col>
        <v-row class="back-color">
          <v-col class="form-title">
            {{ cardTitle }}
          </v-col>
          <v-col cols="12" class="material-form-fields">
            <v-row class="form-subtitle">
              {{ cardSubtitle }}
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-form v-model="valid" ref="form" lazy-validation>
                  <v-row dense class="dense-form">
                    <v-col cols="12" xs="12" sm="6" md="5" lg="4" xl="3" class="custom-padding">
                      <v-text-field v-model="name" :rules="[rules.required]" label="Nome do Material" persistent-placeholder
                        class="text-field"></v-text-field>
                    </v-col>
                    <v-col cols="12" xs="12" sm="6" md="5" lg="4" xl="3" class="custom-padding">
                      <v-text-field v-model="constant" :rules="[rules.required, rules.isFloat]" persistent-placeholder
                        label="Constante do Material (µSv.m2/h.GBq)" class="text-field"></v-text-field>
                    </v-col>
                  </v-row>
                </v-form>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-btn @click="saveMaterial" elevation="0" class="flow-button">
            <i class="fas fa-save" style="font-size: 24px; margin-right: 8px;"></i>
            Criar
          </v-btn>
          <v-btn @click="closeForm('close', {})" elevation="0" class="flow-button">
            <i class="fas fa-times" style="font-size: 24px; margin-right: 8px;"></i>
            Cancelar
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-col>
</template>


<script>
import {ref, toRef, watch} from "vue";

export default {
  name: 'MaterialForm',
  emits: ['close_form'],
  props: {
    title: String,
    subtitle: String,
    materialObject: Object
  },

  setup(props, { emit }) {

    const cardTitle = toRef(props, 'title')
    const cardSubtitle = toRef(props, 'subtitle')
    const material = toRef(props, 'materialObject')

    const materialId = ref(material.value.id)
    const name = ref(material.value.name)
    const constant = ref(material.value.constant)

    watch(() => props.materialObject, (newMaterialObject) => {
        materialId.value = newMaterialObject.id
        name.value = newMaterialObject.name
        constant.value = newMaterialObject.constant
    })

    const rules = {
      required: value => !!value || 'Obrigatório',
      isFloat: value => !isNaN(parseFloat(value)) || 'Deve ser um número válido',
    }
    const valid = ref(true)
    const form = ref(null)

    function saveMaterial() {
      form.value.validate().then((validation) => {
        if (!validation.valid) {
          return
        }
        let payload = props.materialObject
        payload.name = name.value
        payload.constant = constant.value
        closeForm('create', payload)
      })
    }

    function closeForm(action, payload) {
      emit("close_form", { 'action': action, 'payload': payload });
    }

    return {
      cardTitle,
      cardSubtitle,
      materialId,
      name,
      constant,
      rules,
      form,
      valid,
      saveMaterial,
      closeForm
    }
  },
}
</script>

<style lang="scss" scoped>
* {
  font-family: Poppins-Light;
}

.v-text-field {
  border-radius: 10px;
  //background-color: #f5f5f5;
  //box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-title {
  font-family: Poppins-Bold;
  font-size: 22px;
  color: white;
  padding: 10px 0 10px 32px;
}

.form-subtitle {
  font-size: 16px;
  color: #7A7A7A;
  padding: 20px 0 10px 12px;
}

.back-color {
  background-color: #2596be;
  border-radius: 10px;
}

.material-form-fields {
  background-color: #FFFFFF;
  border-radius: 10px;
  padding: 20px 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.flow-button {
  font-family: Poppins-Bold;
  color: #2596be;
  margin: 10px;
  background-color: transparent;
}

.custom-padding {
  padding: 0 10px;
}

.dense-form > * {
  padding-top: 0;
  padding-bottom: 0;
  margin-bottom: 0;
}
</style>
