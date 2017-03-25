<template lang="pug">
  article
    section.section-input
      md-input-container
        label Pitch
        md-input(type="number" v-model.number="pitch", :disabled="disabled")
    section.section-input
      md-input-container
        label Length
        md-input(type="number" v-model.number="length", :disabled="disabled")
    section
      md-button.md-icon-button.n-done-button(@click.native="addNote", :disabled="disabled")
        md-icon done
</template>

<script>
export default {
  data() {
    return {
      pitch: 0,
      length: 1
    };
  },
  methods: {
    addNote() {
      this.$store.dispatch("addNote", {
        pitch: this.pitch,
        length: this.length
      });
    }
  },
  computed: {
    disabled() {
      return !this.$store.state.currentDirectory;
    }
  }
};
</script>

<style scoped>
article {
  display: flex;
  align-items: end;
}
.section-input {
  flex: 1;
  margin-right: 10px;
}
.n-done-button {
  margin-top: 10px;
}
</style>