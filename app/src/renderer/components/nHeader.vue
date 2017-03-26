<template lang="pug">
  md-toolbar.md-whiteframe-2dp.n-header
    h1.md-title
      span.changed(:class="{ 'active-changed': isChanged }") ●
      | {{ title }}
    md-button.md-icon-button(:disabled="disabled" @click.native="togglePlay")
      md-icon {{ playButtonState }}
    md-button.md-icon-button(:disabled="disabled" @click.native="save")
      md-icon save
    md-button.md-icon-button(@click.native="selectDirectory")
      md-icon folder_open
</template>

<script>
import { mapActions, mapState } from "vuex";
import getDirectoryName from "@lib/getDirectoryName";

export default {
  methods: mapActions([
    "selectDirectory",
    "save",
    "togglePlay"
  ]),
  computed: {
    ...mapState([
      "isChanged"
    ]),
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
    },
    playButtonState() {
      return this.$store.state.isPlaying ? "stop" : "play_arrow";
    }
  }
};
</script>

<style scoped>
.md-title {
  flex: 1;
}

@keyframes changed {
  from {
    text-shadow: none;
  }
  to {
    text-shadow: 0 0 10px #ffeb3b;
  }
}

span.active-changed {
  opacity: 1;
  animation-duration: 1s;
  animation-name: changed;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

.changed {
  opacity: 0;
  margin-right: 10px;
  color: #ffeb3b;
  transition: opacity 0.5s;
}
</style>
