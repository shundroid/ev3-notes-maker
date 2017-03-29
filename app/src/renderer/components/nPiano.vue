<template lang="pug">
  section.md-whiteframe-1dp
    .status C#4
    .piano-parent
      .keys
        div(v-for="key in keys", :is="'n-' + key.key + '-key'", :pitch="key.pitch")
</template>

<script>
import nWhiteKey from "@components/piano/nWhiteKey";
import nBlackKey from "@components/piano/nBlackKey";

const octave = {
  C: "white",
  "C#": "black",
  D: "white",
  "D#": "black",
  E: "white",
  F: "white",
  "F#": "black",
  G: "white",
  "G#": "black",
  A: "white",
  "A#": "black",
  B: "white"
};

function generateOctaves() {
  const octaves = [];
  for (let i = 1; i < 8; i++) {
    octaves.push(...Object.keys(octave).map(pitch => {
      return { pitch: pitch + i, key: octave[pitch] };
    }));
  }
  return octaves;
}

const allKeys = [
  { pitch: "A0", key: "white" }, { pitch: "A#0", key: "black" }, { pitch: "B0", key: "white" },
  ...generateOctaves()
];

export default {
  components: {
    nWhiteKey,
    nBlackKey
  },
  data() {
    console.log(allKeys);
    return {
      keys: allKeys
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