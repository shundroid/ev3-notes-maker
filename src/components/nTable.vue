<template lang="pug">
  md-table
    md-table-header
      md-table-row
        md-table-head Pitch
        md-table-head Length
        md-table-head.n-column-buttons
    md-table-body
      n-table-item(v-for="note in notes", :pitch="note.pitch", :length="note.length")
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

<style scoped>
.n-column-buttons {
  width: 100px;
}
</style>