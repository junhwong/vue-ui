<!--<style lang="scss" src="./style.scss"></style>-->

<script>
// import Popover from '../popover'
export default {
  name: 'vui-modal',
  components: {
    // Popover
  },
  // mixins: [Popover],
  data () {
    return {
      is_shown: false
    }
  },
  props: {
    title: String,
    shown: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isShown: {
      get () {
        return this.is_shown
      }
    }
  },
  created () {
    this.is_shown = this.shown
  },
  methods: {
    test (e) {
      console.log(e)
    },
    close () {
      this.is_shown = false
    },
    show () {
      this.is_shown = true
    }
  },
  mounted () {

  },
  destroyed () {
  }
}
</script>

<template>
  <ui-popover class="ui-modal" v-show="isShown">
    <div class="ui-modal-dialog">
      <div class="ui-modal-header">
        <div class="ui-modal-header-close">
          <i class="iconfont icon-close" @click="close"></i>
        </div>
        <h1 class="ui-modal-header-title" v-html="title"></h1>
      </div>
      <div class="ui-modal-body">
        <slot></slot>
      </div>
      <div class="ui-modal-footer"><slot name="footer"></slot></div>
    </div>

  </ui-popover>
</template>
