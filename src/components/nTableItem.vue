<template lang="pug">
  md-table-row
    md-table-cell {{ pitch }}
    md-table-cell {{ length }}
    md-table-cell.n-column-buttons
      md-button.md-icon-button(@click.native="removeNote")
        md-icon delete
      md-button.md-icon-button
        md-icon keyboard_arrow_up
      md-button.md-icon-button
        md-icon keyboard_arrow_down
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    pitch: Number,
    length: Number,
    index: Number
  },
  methods: {
    removeNote() {
      this.$store.dispatch("removeNote", this.index);
    }
  }
};
</script>

<style scoped>
.n-column-buttons .md-table-cell-container .md-button.md-icon-button .md-icon {
  margin: 8px;
}
</style>