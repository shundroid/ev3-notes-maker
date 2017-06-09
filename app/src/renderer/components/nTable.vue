<template lang="pug">
  md-table.n-table
    md-table-header
      md-table-row
        md-table-head Key
        md-table-head Length
        md-table-head.n-column-buttons
    transition-group(tag="md-table-body" name="notes-list")
      n-table-item(
        v-for="(note, index) in notes",
        :key="note.uniqueKey",
        :n-key="note.key",
        :index="index",
        :length="note.length")
</template>

<script>
import nTableItem from "./nTableItem.vue";
import { mapState } from "vuex";

export default {
  components: {
    nTableItem
  },
  computed: mapState({
    notes: state => state.notes
  })
};
</script>

<style scoped lang="stylus">
.n-column-buttons
  width: 100px

.notes-list-move
  transition: transform 0.2s

.n-table
  overflow-x: visible
</style>

<style lang="stylus">
.n-table table
  overflow-x: visible
</style>
