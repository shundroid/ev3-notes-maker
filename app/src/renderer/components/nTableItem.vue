<template lang="pug">
  md-table-row(:class="{ 'playing-row': isPlaying }")
    md-table-cell
      span(:class="hideEditing") {{ nKey }}
      md-input-container(:class="hideNotEditing")
        md-input(type="number" v-model.number="newKey")
    md-table-cell
      span(:class="hideEditing") {{ length }}
      md-input-container(:class="hideNotEditing")
        md-input(type="number" v-model.number="newLength")
    md-table-cell.n-column-buttons
      md-button.md-icon-button(@click.native="edit", :class="hideEditing")
        md-icon mode_edit
      md-button.md-icon-button(@click.native="apply", :class="hideNotEditing")
        md-icon done
        md-tooltip Apply
      md-button.md-icon-button(@click.native="cancelEdit", :class="hideNotEditing")
        md-icon close
        md-tooltip Discard
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
  data() {
    return {
      isEditing: false,
      newKey: 0,
      newLength: 0
    };
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
    edit() {
      this.newKey = this.nKey;
      this.newLength = this.length;
      this.isEditing = true;
    },
    cancelEdit() {
      this.isEditing = false;
    },
    apply() {
      this.$store.dispatch("updateNote", {
        index: this.index,
        note: { key: this.newKey, length: this.newLength }
      });
      this.isEditing = false;
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
    },
    hideEditing() {
      return {
        "hide": this.isEditing
      };
    },
    hideNotEditing() {
      return {
        "hide": !this.isEditing
      };
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

.hide {
  display: none;
}

div.md-table-cell-container div.md-input-container {
  margin: 0;
  padding: 0;
  min-height: 32px;
}
</style>
