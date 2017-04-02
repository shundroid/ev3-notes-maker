<template lang="pug">
  md-table-row(:class="{ 'playing-row': isPlaying }")
    md-table-cell
      md-input-container
        md-textarea(
          class="n-select-key"
          v-model="newKey"
          ref="select-key")
    md-table-cell
      md-select(v-model="newLength")
        md-option(v-for="note in notes", :value="note.value") {{ note.label }}
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
import { getKey } from "@lib/getOctaves";
import { getValueAndLabel } from "@lib/getNotes";

export default {
  props: {
    nKey: String,
    length: String,
    index: Number
  },
  data() {
    return {
      newKey: this.nKey,
      newLength: this.length,
      notes: []
    };
  },
  created() {
    this.notes = getValueAndLabel();
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
    },
    apply() {
      this.$store.dispatch("updateNote", {
        index: this.index,
        note: { key: this.newKey, length: this.newLength }
      });
    }
  },
  computed: {
    ...mapState([
      "notes",
      "playingNoteIndex",
      "previewKey",
      "selectedInput"
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
  },
  watch: {
    previewKey() {
      if (this.previewKey !== null &&
          this.selectedInput === this.$refs["select-key"].$el) {
        this.newKey = getKey(this.previewKey);
      }
    },
    newKey() {
      this.apply();
    },
    newLength() {
      this.apply();
    }
  }
};
</script>

<style scoped lang="stylus">
.n-column-buttons .md-table-cell-container .md-button.md-icon-button .md-icon
  margin: 8px

.playing-row
  background-color: #fce4ec

div.md-table-cell-container div.md-input-container
  margin: 0
  padding: 0
  min-height: 32px
</style>
