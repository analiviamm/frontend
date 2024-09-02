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
                      <v-text-field variant="solo" flat v-model="name" :rules="[rules.required]" label="Nome do Material" persistent-placeholder
                        >
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" xs="12" sm="6" md="5" lg="4" xl="3" class="custom-padding">
                      <v-text-field variant="solo" flat v-model="constant" :rules="[rules.required, rules.isFloat]" persistent-placeholder
                        label="Constante do Material"></v-text-field>
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

.v-text-field ::v-deep(.v-field) { border-radius: 10px; }

.form-title {
  font-family: Poppins-Bold;
  font-size: 20px;
  color: white;
  padding: 10px 0 10px 32px;
}

.form-subtitle{
  font-size: 15px;
  opacity: 0.7;
  padding: 20px 0 10px 12px;
}

.back-color {
  border-radius: 10px;
}

.material-form-fields {
  background-color: white;
  border-radius: 10px;
  padding-left: 30px;
  padding-right: 30px;
}

.flow-button{
  font-family: Poppins-Bold;
  margin: 10px;
  background-color: transparent;
}

.dense-form>* {
  padding-top: 0;
  padding-bottom: 0;
  margin-bottom: 0;
}
</style>
