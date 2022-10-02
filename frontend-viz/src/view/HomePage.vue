<template>
  <div>
    <div
      class="pageHeight d-flex justify-center align-content-center flex-wrap mb-6"
    >
      <div class="d-flex flex-column justify-center">
        <h2>heloooooooooooooooooooooo</h2>
        <v-hover v-slot="{ hover }" style="color: black">
          <v-btn
            x-large
            text
            :style="{ 'background-color': hover ? 'black' : 'white' }"
            class="ma-2"
            to="/Viewer"
          >
            <v-icon
              :style="{ color: hover ? 'white' : 'black' }"
              style="font-size: 48px"
              :class="hover ? ' ' : 'underline'"
            >
              Enter
            </v-icon>
          </v-btn>
        </v-hover>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage",
};
</script>

<style>
.pageHeight {
  height: 92vh;
}
.underline {
  text-decoration: underline;
}
</style>
