<template lang="pug">
  md-table-row
    md-table-cell {{ nKey }}
    md-table-cell {{ length }}
    md-table-cell.n-column-buttons
      md-button.md-icon-button(@click.native="remove")
        md-icon delete
      md-button.md-icon-button(@click.native="moveUp", :disabled="isDisabledMoveUp")
        md-icon keyboard_arrow_up
      md-button.md-icon-button(@click.native="moveDown", :disabled="isDisabledMoveDown")
        md-icon keyboard_arrow_down
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    nKey: Number,
    length: Number,
    index: Number
  },
  methods: {
    remove() {
      this.$store.dispatch("removeNote", this.index);
    },
    moveUp() {
      this.$store.dispatch("moveUpNote", this.index);
    },
    moveDown() {
      this.$store.dispatch("moveDownNote", this.index);
    }
  },
  computed: {
    ...mapState({
      notes: state => state.notes
    }),
    isDisabledMoveUp() {
      return this.index === 0;
    },
    isDisabledMoveDown() {
      return this.index === this.notes.length - 1;
    }
  }
};
</script>

<style scoped>
.n-column-buttons .md-table-cell-container .md-button.md-icon-button .md-icon {
  margin: 8px;
}
</style>