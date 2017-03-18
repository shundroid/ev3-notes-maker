<template lang="pug">
  article
    section.section-input
      md-input-container
        label Note Id
        md-input(type="number")
    section.section-input
      md-input-container
        label Length
        md-input(type="number")
    section
      md-button.md-icon-button.n-done-button
        md-icon done
</template>

<script>
export default {};
</script>

<style scoped>
article {
  display: flex;
  align-items: end;
}
.section-input {
  flex: 1;
  margin-right: 10px;
}
article section .n-done-button {
  margin-bottom: 20px;
}
</style>