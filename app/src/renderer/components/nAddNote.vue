<template lang="pug">
  section
    md-button.md-icon-button.n-done-button(@click.native="addNote", :disabled="disabled")
      md-icon add
</template>

<script>
export default {
  methods: {
    addNote() {
      this.$store.dispatch("addNote", {
        key: "C4",
        length: "whole-note"
      });
    }
  },
  computed: {
    disabled() {
      return !this.$store.state.isOpened;
    }
  }
};
</script>

<style scoped lang="stylus">
section
  text-align: center
  margin-top: 10px
</style>
