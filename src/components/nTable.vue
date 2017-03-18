<template lang="pug">
  md-table
    md-table-header
      md-table-row
        md-table-head Note
        md-table-head Length
        md-table-head.n-column-buttons
    md-table-body
      n-table-item
</template>

<script>
import nTableItem from "./nTableItem.vue";
export default {
  components: {
    nTableItem
  }
};
</script>

<style scoped>
.n-column-buttons {
  width: 100px;
}
</style>