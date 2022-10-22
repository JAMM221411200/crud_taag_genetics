<template>
  <v-app>
    <v-app-bar app dark color="primary">
      <v-container :class="['app-bar-content']">
        <h1>JAMM</h1>

        <v-btn
          large
          text
          class="white--text"
          target="_blanck"
          href="https://jamm.website"
        >
          Sobre el desarrollador
          <v-icon class="ml-2"> mdi-open-in-new </v-icon>
        </v-btn>
      </v-container>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>

    <main-alert></main-alert>
  </v-app>
</template>

<script>
// Components
import MainAlert from "@/components/Alert";

export default {
  name: "App",

  components: { MainAlert },

  data: () => ({
    //
  }),

  created() {
    this.$store.dispatch("bookIndex");
  },
};
</script>

<style>
.app-bar-content {
  display: flex;
  width: 100%;
  align-content: center;
  justify-content: space-between;
}
</style>
