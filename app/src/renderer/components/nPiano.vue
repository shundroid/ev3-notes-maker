<template lang="pug">
  section.md-whiteframe-1dp(
    :class="{ disable: isDisable }",
    :style="{ left, top }")
    .piano-parent
      .keys
        div(v-for="key in keys", :is="'n-' + key.type + '-key'", :pitch="key.name")
</template>

<script>
import nWhiteKey from "@components/piano/nWhiteKey";
import nBlackKey from "@components/piano/nBlackKey";
import { allKeys, getTypeOfKey } from "@lib/getOctaves";
import { mapState } from "vuex";

export default {
  components: {
    nWhiteKey,
    nBlackKey
  },
  data() {
    return {
      keys: allKeys.map(key => { return { type: getTypeOfKey(key), name: key }; })
    };
  },
  mounted() {
    document.body.addEventListener("mousedown", event => {
      if (event.target.classList.contains("n-select-key")) {
        this.$store.dispatch("updateSelectedInput", event.target);
      } else if (event.target !== this.$el &&
                 !event.target.className.match(/(piano-parent|keys|black-key|white-key)/)) {
        this.$store.dispatch("clearSelectedInput");
      }
    });
  },
  computed: {
    ...mapState(["selectedInput"]),
    isDisable() {
      return this.selectedInput === null;
    },
    left() {
      if (this.selectedInput) {
        const rect = this.selectedInput.getBoundingClientRect();
        return `${rect.left}px`;
      }
      return 0;
    },
    top() {
      if (this.selectedInput) {
        const rect = this.selectedInput.getBoundingClientRect();
        return `${rect.top + rect.height - 64}px`;
      }
      return 0;
    }
  }
};
</script>

<style lang="stylus" scoped>
@keyframes show
  from
    opacity: 0
  to
    opacity: 1

key-width = 20px
black-key-width = 14px
key-interval = 2px
.disable
  display: none
  opacity: 0
section
  position: absolute
  background-color: #e53935
  height: 120px
  padding-top: 30px
  padding-left: 20px
  padding-right: 20px
  width: 320px
  display: flex
  flex-direction: column
  animation: show 0.2s linear 0s
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
    overflow-x: scroll
    overflow-y: hidden
    position: relative
    .keys
      height: 100%;
      position: absolute
      display: flex
</style>