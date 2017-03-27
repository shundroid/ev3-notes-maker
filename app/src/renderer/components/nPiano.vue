<template lang="pug">
  section.md-whiteframe-1dp
    .status C#4
    .piano-parent
      .keys
        .white-key
        .black-key
        .white-key
        .white-key
        .black-key
        .white-key
        .black-key
        .white-key
        .white-key
        .black-key
        .white-key
        .black-key
        .white-key
        .black-key
        .white-key
        .white-key
        .black-key
        .white-key
        .black-key
        .white-key
        .white-key
        .black-key
        .white-key
        .black-key
        .white-key
        .black-key
        .white-key
        .white-key
        .black-key
        .white-key
        .black-key
        .white-key
        .white-key
        .black-key
        .white-key
        .black-key
        .white-key
        .black-key
        .white-key
</template>

<style lang="stylus" scoped>
key-width = 20px
black-key-width = 14px
key-interval = 2px
section
  background-color: #e53935
  height: 130px
  padding-top: 15px
  padding-left: 50px
  padding-right: key-width + key-interval
  width: 320px
  display: flex
  flex-direction: column
  .status
    background-color: #212121
    color: #fbc02d
    width: 50px
    height: 20px
    margin-bottom: 5px;
    text-align: center
  .piano-parent
    width: 100%
    flex: 1
    overflow: hidden
    position: relative
    .keys
      height: 100%;
      position: absolute
      display: flex
      .white-key
        cursor: pointer
        width: key-width
        height: 100%
        margin-right: key-interval
        background-color: white
      .black-key
        float: left
        cursor: pointer
        position: relative
        background-color: #212121
        left: -7px
        width: black-key-width
        height: 60%
        margin-right: -14px
</style>