<template>
  <v-container class="processed-container">
    <div class="content-wrapper">
      <div v-if="loading" class="loader-wrapper">
        <LoaderComponent color="#9F365B"></LoaderComponent>
      </div>
      <div class="data-content">
        <v-row justify="center" class="title-bold">
          <h2>Resultados Obtidos</h2>
          <h3>Abaixo, temos o raio mínimo para a dose segura de 0.1 µSv/h e as recomendações de segurança gerais para a dose informada.</h3>
        </v-row>

        <!-- Dados principais -->
        <v-row class="data-row">
          <h4 class="data-bold">Nível de Radiação: </h4>
          <span class="data-bold">{{ radiationLevel }} µSv/h </span>
        </v-row>
        <v-row class="data-row">
          <h4 class="data-bold">Altitude: </h4>
          <span class="data-bold">{{ altitude }} m </span>
        </v-row>
        <v-row class="data-row">
          <h4 class="data-bold">Raio de Segurança Mínimo: </h4>
          <span class="data-bold">{{ min_radius.toFixed(2) }} m </span>
        </v-row>

        <!-- Tabela de recomendações -->
        <v-row>
          <v-col cols="12" class="d-flex justify-center">
            <v-simple-table class="safety-table">
              <thead>
                <tr>
                  <th>Medida</th>
                  <th>Raio (m)</th>
                </tr>
              </thead>
              <tbody>
                <tr @click="toggleRow(0)">
                  <td>Restringir Acesso</td>
                  <td>{{ access_restrict.toFixed(2) }}</td>
                </tr>
                <tr v-if="showDetails[0]">
                  <td colspan="2">
                    Distâncias maiores que essa são seguras
                    para civis. Restringir acesso a um raio de
                    proximidade maior que a distância medida.
                  </td>
                </tr>
                <tr @click="toggleRow(1)">
                  <td>Monitoramento de Tireóide</td>
                  <td>{{ tireoide_monitoring.toFixed(2) }}</td>
                </tr>
                <tr v-if="showDetails[1]">
                  <td colspan="2">
                    Todo pessoal numa área igual ou menor
                    que esta distância deve examinar o estado
                    da tireóide e tomar bloqueantes de Iodo
                    assim que possível, se disponíveis.

                  </td>
                </tr>
                <tr @click="toggleRow(2)">
                  <td>Restrição de Alimentos</td>
                  <td>{{ aliment_restrict.toFixed(2) }}</td>
                </tr>
                <tr v-if="showDetails[2]">
                  <td colspan="2">
                    Não consumir água ou alimentos que se
                    encontravam dentro desse raio. Além disso,
                    à todo pessoal presente nessa área é
                    necessário maiores cuidados higiênicos
                    antes de se alimentar, evitando
                    contaminação interna por contato com pele
                    contaminada.
                  </td>
                </tr>
                <tr @click="toggleRow(3)">
                  <td>Realocar Pessoal e Civis</td>
                  <td>{{ people_reallocation.toFixed(2) }}</td>
                </tr>
                <tr v-if="showDetails[3]">
                  <td colspan="2">
                    Num raio menor que esse, não deve ser
                    permitido acesso de nenhuma pessoa, a
                    não ser que autorizado para medida de
                    segurança. A realocação deve ser feita o
                    mais depressa possível, de forma a manter
                    a integridade física de todos os evacuados.
                  </td>
                </tr>
                <tr @click="toggleRow(4)">
                  <td>Evacuação Imediata ou Abrigagem</td>
                  <td>{{ immediate_evacuation.toFixed(2) }}</td>
                </tr>
                <tr v-if="showDetails[4]">
                  <td colspan="2">
                    Todas as pessoas no raio estipulado devem
                    evacuar imediatamente ou se abrigar de
                    forma a ficarem em local que permita selar
                    janelas e outras cavidades. A abrigagem
                    deve durar, no máximo, 2 dias, e o
                    consumo de água e alimentos deve ser
                    racionado.
                  </td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-col>
        </v-row>

        <!-- Textos adicionais -->
        <v-row class="data-row">
          <h4 class="data-bold">Prioridades de resposta:</h4>
          <p class="info-text">
            Recomenda-se tomada de medidas de proteção pública IMEDIATAMENTE após a classificação de uma ameaça radiológica, ou após grande perturbação nas condições de radiação.
          </p>
          <ul class="info-list">
            <li>Em até 30 minutos após identificação do problema: Tomar medidas de proteção do pessoal que trabalhará intervindo na emergência radiológica.</li>
            <li>Com 30 minutos: manter monitoramento da área e monitorar vizinhanças.</li>
          </ul>
        </v-row>
        <v-row class="data-row">
          <h4 class="data-bold">Ação contra a fonte:</h4>
          <p class="info-text">
            De acordo com a norma CNEN NN 3.01, exposições que acumulem uma dose efetiva de 50 mSv ou mais só são justificadas se têm finalidade:
          </p>
          <ul class="info-list">
            <li>a) salvar vidas ou prevenir danos sérios à saúde;</li>
            <li>b) executar ações que evitem dose coletiva elevada; ou</li>
            <li>c) executar ações para prevenir efeitos determinísticos severos e o desenvolvimento de situações catastróficas.</li>
          </ul>
          <p class="info-text">
            Além disso, devem ser realizadas por voluntários e estes devem ser instruídos sobre os riscos para a saúde, os dispositivos de segurança disponíveis, além de serem treinados.
          </p>
          <p class="highlight-text">
            Sendo assim, após tomada de decisão, estima-se que um contato de <strong>{{ first_minute_contact }} minutos</strong> com essa fonte (à 1m de distância) seja suficiente para causar dose de 50mSv ou superior.
          </p>
          <p class="highlight-text">
            Caso a exposição ultrapasse <strong>{{ second_minute_contact }} minutos</strong>, a dose chegará a 100mSv e é mandatório que o trabalhador de emergência seja consultado por médico competente para avaliação.
          </p>
        </v-row>
      </div>

      <!-- Rodapé com botões -->
      <v-row class="footer">
        <v-col cols="10" class="left">
          <v-btn class="action-btn" @click="emit('dialog_close', false)">Fechar</v-btn>
        </v-col>
        <v-col v-if="!oldResult" cols="2" class="right d-flex">
          <v-btn class="action-btn" @click="saveResult">Salvar Resultado</v-btn>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script setup>
import {ref, defineProps, defineEmits, computed} from "vue";
import axios from "axios";

import LoaderComponent from "@/components/LoaderComponent.vue";

const props = defineProps({
  radiationLevel: Number,
  altitude: Number,
  oldResult: Boolean
})

const emit = defineEmits(['dialog_close'])

const radiationLevel = ref(props.radiationLevel)
const altitude = ref(props.altitude)
const oldResult = ref(props.oldResult)
const loading = ref(false)
const min_radius = computed(() => Math.sqrt(radiationLevel.value * altitude.value * altitude.value / 0.1))
const access_restrict = computed(() => Math.sqrt(radiationLevel.value*altitude.value*altitude.value/0.116))
const tireoide_monitoring = computed(() => Math.sqrt(radiationLevel.value*altitude.value*altitude.value/0.6))
const aliment_restrict = computed(() => Math.sqrt(radiationLevel.value * altitude.value * altitude.value))
const people_reallocation = computed(() => Math.sqrt(radiationLevel.value*altitude.value*altitude.value/100))
const immediate_evacuation = computed(() => Math.sqrt(radiationLevel.value*altitude.value*altitude.value/1000))
const first_minute_contact = computed(() => (50000*60/(radiationLevel.value*altitude.value*altitude.value)))
const second_minute_contact = computed(() => (100000*60/(radiationLevel.value*altitude.value*altitude.value)))

const showDetails = ref([false, false, false, false, false]);

function toggleRow(index) {
  showDetails.value[index] = !showDetails.value[index];
}


async function saveResult() {
  const today = new Date().toISOString().split('T')[0]
  try {
    const response = await axios.post('/create_result/', {
      date: today,
      radiation_level: radiationLevel.value,
      altitude: altitude.value,
      min_radius: min_radius.value,
      access_restrict: access_restrict.value,
      tireoide_monitoring: tireoide_monitoring.value,
      aliment_restrict: aliment_restrict.value,
      people_reallocation: people_reallocation.value,
      immediate_evacuation: immediate_evacuation.value,
      first_minute_contact: first_minute_contact.value,
      second_minute_contact: second_minute_contact.value
    })

    if (response.status === 201) {
      emit('dialog_close', true)
    } else {
      console.error('Erro ao salvar o resultado:', response.status)
    }
  } catch (error) {
    console.error('Erro ao salvar o resultado:', error)
  }
}
</script>

<style scoped>
/* Configurações gerais do diálogo */
.processed-container {
  padding: 20px;
  background-color: #f5f5f5;
  max-height: 80vh;
  overflow-y: auto;
}

.content-wrapper {
  background-color: #FFFFFF;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
}

.loader-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}

.title-bold {
  font-family: 'Poppins', sans-serif;
  font-size: 20px;
  text-align: center;
  color: #2596be;
}

.data-bold {
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  color: #7A7A7A;
}

.data-row {
  padding: 12px 0;
}

.safety-table {
  margin-top: 20px;
  border-collapse: collapse;
  width: 100%;
  max-width: 600px;
}

.safety-table th,
.safety-table td {
  border: 1px solid #ddd;
  padding: 8px;
}

.safety-table tr:hover {
  background-color: #f1f1f1;
  cursor: pointer;
}

.footer {
  position: sticky;
  bottom: 0;
  background-color: #f5f5f5;
  padding-top: 10px;
  padding-bottom: 10px;
  border-top: 1px solid #ddd;
}

.action-btn {
  font-family: 'Poppins', sans-serif;
  color: #2596be;
  border-radius: 10px;
  text-transform: none;
}

.action-btn:hover {
  background-color: #1a76d2;
}

/* Estilos para listas de informações */
.info-list {
  list-style-type: disc;
  margin-left: 20px;
  color: #555;
}

.highlight-text {
  font-weight: 500;
  color: #C13535;
}

.left {
  justify-content: flex-start;
}

.right {
  justify-content: flex-end;
}
</style>
