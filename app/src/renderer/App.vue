<template lang="pug">
  #app
    n-header
    main
      n-add-note
      n-table
</template>

<script>
import nHeader from "@components/nHeader";
import nAddNote from "@components/nAddNote";
import nTable from "@components/nTable";
import store from "@vuex/store";

export default {
  components: {
    nHeader,
    nAddNote,
    nTable
  },
  store
};
</script>

<style>
@import "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic";
@import "https://fonts.googleapis.com/icon?family=Material+Icons";

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
