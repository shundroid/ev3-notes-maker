<template lang="pug">
  button(
    @mousedown="startPreview",
    @mouseup="stopPreview",
    :class="classes")
</template>

<script>
import { getKeyNumber } from "@lib/getOctaves";

export default {
  props: {
    pitch: String,
    keyType: String
  },
  methods: {
    startPreview() {
      this.$store.dispatch("startPreviewKey", getKeyNumber(this.pitch));
    },
    stopPreview() {
      this.$store.dispatch("stopPreviewKey");
    }
  },
  computed: {
    classes() {
      return {
        'black-key': this.keyType === "black",
        'white-key': this.keyType === "white"
      };
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
.white-key
  border: none
  cursor: pointer
  width: key-width
  height: 100%
  margin-right: key-interval
  background-color: white
</style>