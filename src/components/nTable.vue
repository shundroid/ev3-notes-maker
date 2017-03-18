<template>
  <md-table>
    <md-table-header>
      <md-table-row>
        <md-table-head>Note</md-table-head>
        <md-table-head>Length</md-table-head>
        <md-table-head class="n-column-buttons"></md-table-head>
      </md-table-row>
    </md-table-header>
    <md-table-body>
      <n-table-item></n-table-item>
    </md-table-body>
  </md-table>
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