<template lang="pug">
  md-toolbar.md-whiteframe-2dp.n-header
    h1.md-title EV3 Notes Maker
    md-button.md-icon-button
      md-icon play_arrow
    md-button.md-icon-button
      md-icon save
    md-button.md-icon-button
      md-icon open_in_browser
    md-button.md-icon-button(@click.native="selectDirectory")
      md-icon folder_open
</template>

<script>
export default {
  methods: {
    selectDirectory() {
    }
  }
};
</script>

<style scoped>
.md-title {
  flex: 1;
}
</style>