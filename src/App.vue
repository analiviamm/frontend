<template>
  <v-app>
    <v-main>
      <MainMenu></MainMenu>
    </v-main>
  </v-app>
</template>

<script>
import MainMenu from "@/components/MainMenu.vue";

export default {
  name: 'App',

  components: {
    MainMenu,
  },

  data: () => ({
    //
  }),
}
</script>
