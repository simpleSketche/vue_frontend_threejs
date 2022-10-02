<template>
  <v-app class="dashboard">
    <HeaderBar />
    <div><router-view /></div>

    <FooterBar />
  </v-app>
</template>

<script>
import HeaderBar from "./components/HeaderBar";
import FooterBar from "./components/FooterBar";

export default {
  name: "App",
  components: {
    HeaderBar,
    FooterBar,
  },
  data: () => {},
};
</script>

<style>
.dashboard {
  display: grid;
  grid-template-rows: 5vh 92vh 3vh;
  height: 100vh;
}
</style>
