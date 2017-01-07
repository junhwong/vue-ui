<script>
// function on (el, eventType, handler) {
//   if (!el || !el.addEventListener) {
//     return
//   }
//   el.addEventListener(eventType, handler)
// }

// function un (el, eventType, handler) {
//   if (!el || !el.removeEventListener) {
//     return
//   }
//   el.removeEventListener(eventType, handler)
// }
import Modal from '../modal/Modal'
import XButton from '../button/Button'
export default {
  name: 'toast',
  components: {Modal, XButton},
  data () {
    return {
      title: '',
      message: 'hello toast',
      display: false,
      onDecide: null,
      onCancel: null
    }
  },
  methods: {
    bind ({show, title, message, onDecide, onCancel}) {
      this.display = show
      this.title = title
      this.message = message
      if (onDecide && typeof onDecide === 'function') {
        this.onDecide = onDecide
      }
      if (onCancel && typeof onCancel === 'function') {
        this.onCancel = onCancel
      }
    },
    handleClick (event, type) {
      if (type === 'OK' && this.onDecide) {
        this.onDecide(event, this)
      } else if (type === 'CANCEL' && this.onCancel) {
        this.onCancel(event, this)
      } else {
        this.display = false
      }
    },
    hide () {
      this.display = false
    }
  },
  mounted () {

  },
  destroyed () {

  }
}
</script>
<template>
  <modal class="toast" ref="toast" :shown="display" :title="title" >
    {{message}}
    <!--<x-button slot="footer" class="btn mh5" type="button" @click="handleClick($event, 'CANCEL')" vv-if="toast.type === 'YES_OR_NO'">取消</x-button>-->
    <x-button slot="footer" class="btn-primary" type="button" @click="handleClick($event, 'OK')">确定</x-button>
  </modal>
</template>
