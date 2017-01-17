<script>
// import Popover from '../popover'
export default {
  name: 'modal',
  components: {
    // Popover
  },
  // mixins: [Popover],
  data () {
    return {
      is_shown: false,
      zindex: 0
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
    display: {
      get () {
        return this.is_shown
      }
    },
    zindexxx: {
      get () {
        return this.$root.$activityModal === this._uid ? 1000 : 1
      }
    }
  },
  created () {
    this.is_shown = this.shown
  },
  methods: {
    _updatezIndex () {
      let stack = this.$root.$activityModalStack = this.$root.$activityModalStack || []
      if (this.is_shown) {
        stack.push(this)
      } else {
        stack.pop()
      }

      if (stack.length > 0) {
        for (let modal of stack) {
          modal.zindex = 1
        }
        stack[stack.length - 1].zindex = 1000
      }
    },
    close () { // 废弃
      this.is_shown = false
      this._updatezIndex()
    },
    hide () {
      this.is_shown = false
      this._updatezIndex()
    },
    show () {
      this.is_shown = true
      this._updatezIndex()
    }
  },
  mounted () {
  },
  destroyed () {
  }
}
</script>

<template>
  <div class="popover modal" v-show="display" :style="{zIndex: zindex}">
    <div class="modal-as"></div>
    <div class="modal-dialog">
      <div class="modal-header">
        <div class="modal-header-close">
          <i class="iconfont icon-close" @click="close" title="close this modal"></i>
        </div>
        <h1 class="modal-header-title" v-html="title"></h1>
      </div>
      <div class="modal-body">
        <slot></slot>
      </div>
      <div class="modal-footer"><slot name="footer"></slot></div>
    </div>
    <div class="modal-as"></div>
  </div>
</template>
