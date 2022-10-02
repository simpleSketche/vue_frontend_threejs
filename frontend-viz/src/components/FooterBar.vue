<template>
  <v-footer class="d-flex justify-center footer" style="height: 3vh" dense>
    {{ new Date().getFullYear() }} — <strong>Frontend Visualizer</strong>
  </v-footer>
</template>

<script>
export default {
  name: "FooterBar",
};
</script>

<style scoped>
* >>> .v-toolbar__content {
  align-content: center;
  height: 3vh !important;
}

.footer {
  height: 3vh !important;
}
</style>
