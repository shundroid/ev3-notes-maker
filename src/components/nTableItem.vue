<template lang="pug">
  md-table-row
    md-table-cell 1
    md-table-cell 1
    md-table-cell.n-column-buttons
      md-button.md-icon-button
        md-icon delete
      md-button.md-icon-button
        md-icon keyboard_arrow_up
      md-button.md-icon-button
        md-icon keyboard_arrow_down
</template>

<script>
export default {};
</script>

<style scoped>
.n-column-buttons {
  width: 100px;
}
.n-column-buttons .md-table-cell-container .md-button.md-icon-button .md-icon {
  margin: 8px;
}
</style>