<template lang="pug">
  section.md-whiteframe-1dp
    .status C#4
    .piano-parent
      .keys
        div(v-for="key in keys", :is="'n-' + key.type + '-key'", :pitch="key.name")
</template>

<script>
import nWhiteKey from "@components/piano/nWhiteKey";
import nBlackKey from "@components/piano/nBlackKey";
import { allKeys, getTypeOfKey } from "@lib/getOctaves";

export default {
  components: {
    nWhiteKey,
    nBlackKey
  },
  data() {
    return {
      keys: allKeys.map(key => { return { type: getTypeOfKey(key), name: key }; })
    };
  }
};
</script>

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
</style>