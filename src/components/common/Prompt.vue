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
import Btn from '../button/Button'
export default {
  name: 'prompt',
  components: {Modal, Btn},
  data () {
    return {
      title: '',
      message: 'hello prompt',
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

  },
  watch: {
    display (val) {
      if (val) {
        this.$refs.modal.show()
      } else {
        this.$refs.modal.hide()
      }
    }
  }
}
</script>
<template>
  <modal class="prompt" ref="modal" :title="title" >
    {{message}}
    <!--<x-button slot="footer" class="btn mh5" type="button" @click="handleClick($event, 'CANCEL')" vv-if="toast.type === 'YES_OR_NO'">取消</x-button>-->
    <btn slot="footer" class="btn-primary" type="button" @click="handleClick($event, 'OK')">确定</btn>
  </modal>
</template>
