<script>
  export default {
    name: 'x-combo',
    props: {
      value: {
        type: String,
        default: ''
      },
      trigger: {
        type: Function,
        default (event) {
          this.handlePick(event)
        }
      }
    },
    data () {
      return {
        contentShow: false
      }
    },
    methods: {
      handlePick (event) {
        this.contentShow = !(this.contentShow || false)
        let popover = this.$refs.popover
        // if (!popover) {
        //   return
        // }
        popover.$el.style.top = (this.$el.clientHeight + this.$el.offsetTop + 1) + 'px'
        popover.$el.style.left = (this.$el.offsetLeft) + 'px'
        popover.$el.style.width = (this.$el.clientWidth + 1) + 'px'
        console.log(popover.$el.style.top)
      },
      handleInput (e) {
        this.$emit('input', e.target.value)
      },
      handleTrigger (event) {
        this.trigger(event)
      }
    }
  }
</script>
<template>
  <div class="form-control combobox">
    <div class="combobox-control">
      <input class="form-input" type="text" @input="handleInput" :value="value" />
      <div class="form-picker" @click="handleTrigger"><i class="iconfont icon-arrowdown"></i></div>
    </div>
    <x-wrapper ref="popover" class="combobox-content" v-show="contentShow"><div>d</div></x-wrapper>
  </div>
</template>
