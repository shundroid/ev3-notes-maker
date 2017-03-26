<template lang="pug">
  md-table-row(:class="{ 'playing-row': isPlaying }")
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
    ...mapState([
      "notes",
      "playingNoteIndex"
    ]),
    isDisabledMoveUp() {
      return this.index === 0;
    },
    isDisabledMoveDown() {
      return this.index === this.notes.length - 1;
    },
    isPlaying() {
      return this.index === this.playingNoteIndex;
    }
  }
};
</script>

<style scoped>
.n-column-buttons .md-table-cell-container .md-button.md-icon-button .md-icon {
  margin: 8px;
}

.playing-row {
  background-color: #fce4ec;
}
</style>
