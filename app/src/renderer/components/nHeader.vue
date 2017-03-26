<template lang="pug">
  md-toolbar.md-whiteframe-2dp.n-header
    h1.md-title {{ title }}
    md-button.md-icon-button(:disabled="disabled" @click.native="play")
      md-icon play_arrow
    md-button.md-icon-button(:disabled="disabled" @click.native="save")
      md-icon save
    md-button.md-icon-button(@click.native="selectDirectory")
      md-icon folder_open
</template>

<script>
import { mapActions } from "vuex";
import getDirectoryName from "@lib/getDirectoryName";

export default {
  methods: mapActions([
    "selectDirectory",
    "save",
    "play"
  ]),
  computed: {
    title() {
      const currentDirectory = this.$store.state.currentDirectory;
      if (currentDirectory) {
        return getDirectoryName(currentDirectory);
      } else {
        return "No directory selected";
      }
    },
    disabled() {
      return !this.$store.state.isOpened;
    }
  }
};
</script>

<style scoped>
.md-title {
  flex: 1;
}
</style>
