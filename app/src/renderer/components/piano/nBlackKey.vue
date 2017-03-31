<template lang="pug">
  button.black-key(@mousedown="startPreview" @mouseup="stopPreview")
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
.black-key
  border: none
  float: left
  cursor: pointer
  position: relative
  background-color: #212121
  left: -7px
  width: black-key-width
  height: 60%
  margin-right: -14px
</style>