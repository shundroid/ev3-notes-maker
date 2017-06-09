<template lang="pug">
  section.md-whiteframe-1dp(
    :class="{ disable: isDisable }")
    .piano-parent
      .keys
        n-key(
          v-for="key in keys",
          :keyType="key.type",
          :pitch="key.name")
</template>

<script>
import nKey from "@components/piano/nKey";
import { allKeys, getTypeOfKey } from "@lib/getOctaves";
import { mapState } from "vuex";

export default {
  components: {
    nKey
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
    }
  },
  watch: {
    selectedInput() {
      if (this.$el.parentNode !== null) {
        this.$el.parentNode.removeChild(this.$el);
      }
      if (this.selectedInput !== null) {
        this.selectedInput.parentNode.appendChild(this.$el);
      }
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
  left: 0
  top: 32px
  z-index: 2
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