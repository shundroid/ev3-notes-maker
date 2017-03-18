<template>
  <article>
    <section class="section-input">
      <md-input-container>
        <label>Note Id</label>
        <md-input type="number"></md-input>
      </md-input-container>
    </section>
    <section class="section-input">
      <md-input-container>
        <label>Length</label>
        <md-input type="number"></md-input>
      </md-input-container>
    </section>
    <section>
      <md-button class="md-icon-button n-done-button"><md-icon>done</md-icon></md-button>
    </section>
  </article>
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