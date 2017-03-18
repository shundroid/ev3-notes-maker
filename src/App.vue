<template>
  <div id="app">
    <n-header></n-header>
    <md-table>
      <md-table-header>
        <md-table-row>
          <md-table-head>Note</md-table-head>
          <md-table-head>Length</md-table-head>
          <md-table-head class="n-column-buttons"></md-table-head>
        </md-table-row>
      </md-table-header>
      <md-table-body>
        <md-table-row>
          <md-table-cell>1</md-table-cell>
          <md-table-cell>1</md-table-cell>
          <md-table-cell class="n-column-buttons">
            <md-button class="md-icon-button">
              <md-icon>delete</md-icon>
            </md-button>
            <md-button class="md-icon-button">
              <md-icon>keyboard arrow up</md-icon>
            </md-button>
            <md-button class="md-icon-button">
              <md-icon>keyboard arrow down</md-icon>
            </md-button>
          </md-table-cell>
        </md-table-row>
      </md-table-body>
    </md-table>
  </div>
</template>

<script>
import nHeader from "./components/nHeader.vue";
export default {
  components: {
    nHeader
  }
}
</script>

<style>
body {
  margin: 0;
}
html, body, #app, .ml-main {
  height: 100vh;
}
.n-column-buttons {
  width: 100px;
}
.n-column-buttons .md-table-cell-container .md-button.md-icon-button .md-icon {
  margin: 8px;
}
</style>