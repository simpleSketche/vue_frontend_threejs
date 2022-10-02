<template>
  <div>
    <v-app-bar dense color="white" elevation="2" class="navbar">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn text color="white" v-bind="attrs" v-on="on" to="/">
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
          </v-btn>
        </template>
        <span> Home </span>
      </v-tooltip>

      <v-toolbar-title>Frontend Visualizer</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "HeaderBar",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* >>> .v-toolbar__content {
  align-content: center;
  height: 5vh !important;
}

.navbar {
  height: 5vh !important;
}
</style>
