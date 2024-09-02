<template>
  <div class="loading-content">
    <v-progress-circular
        :size="70"
        :width="7"
        :color="barColor"
        indeterminate
    ></v-progress-circular>
  </div>
</template>

<script>

import {ref} from "vue";

export default {
  name: 'LoaderComponent',
  props: {
    color: String,
    globalContent: Boolean,
  },

  setup(props) {
    // handling props
    const barColor = ref(props.color)
    const globalContent = ref(props.globalContent)
    const loadingContentStyle = 'min-height: 200px;' +
        (globalContent.value ? 'height: 100%; width: 100%;' : 'height: fit-content; width: calc(100% - 2rem)')

    return {
      barColor,
      loadingContentStyle
    }
  }
}
</script>

<style scoped>


.loading-content {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  width: 100%;
  height: calc(100vh - 35px);
}

</style>
