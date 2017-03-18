<template lang="pug">
  #app
    n-header
    main
      n-add-note
      n-table
</template>

<script>
import nHeader from "./components/nHeader.vue";
import nAddNote from "./components/nAddNote.vue";
import nTable from "./components/nTable.vue";
export default {
  components: {
    nHeader,
    nAddNote,
    nTable
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
main {
  width: 100%;
  padding: 10px;
}
</style>