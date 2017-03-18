<template>
  <md-table-row>
    <md-table-cell>1</md-table-cell>
    <md-table-cell>1</md-table-cell>
    <md-table-cell class="n-column-buttons">
      <md-button class="md-icon-button">
        <md-icon>delete</md-icon>
      </md-button>
      <md-button class="md-icon-button">
        <md-icon>keyboard_arrow_up</md-icon>
      </md-button>
      <md-button class="md-icon-button">
        <md-icon>keyboard_arrow_down</md-icon>
      </md-button>
    </md-table-cell>
  </md-table-row>
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