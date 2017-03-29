<template lang="pug">
  .white-key(@mousedown="startPreview" @mouseup="stopPreview")
</template>

<script>
import { getKeyNumber } from "@lib/getOctaves";

export default {
  props: {
    pitch: String
  },
  methods: {
    startPreview() {
      this.$store.dispatch("startPreviewKey", getKeyNumber(this.pitch));
    },
    stopPreview() {
      this.$store.dispatch("stopPreviewKey");
    }
  }
};
</script>

<style lang="stylus" scoped>
key-width = 20px
black-key-width = 14px
key-interval = 2px
.white-key
  cursor: pointer
  width: key-width
  height: 100%
  margin-right: key-interval
  background-color: white
</style>