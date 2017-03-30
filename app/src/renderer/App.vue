<template lang="pug">
  #app
    n-header
    main
      n-table
      n-add-note
      n-piano
</template>

<script>
import nHeader from "@components/nHeader";
import nAddNote from "@components/nAddNote";
import nTable from "@components/nTable";
import nPiano from "@components/nPiano";
import store from "@vuex/store";

export default {
  components: {
    nHeader,
    nAddNote,
    nTable,
    nPiano
  },
  store
};
</script>

<style lang="stylus">
body
  margin: 0

html, body, #app, .ml-main
  height: 100vh

main
  width: 100%
  padding: 10px

#app
  margin-top: 64px

</style>
