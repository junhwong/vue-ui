<script>
  export default {
    name: 'slide-panel',
    methods: {
      toggleItem (name) {
        this.show = !this.show
        if (this.last !== name) {
          this.last = name
          this.show = true
        }
        let popover = this.$refs.popover
        popover.style.visibility = this.show ? 'visible' : 'hidden'
        let items = popover.querySelectorAll('.slide-panel-item')
        // let current = null
        for (let item of items) {
          // console.log('>>>', item.offsetTop)
          if (name === item.getAttribute('data-name')) {
            item.style.left = this.show ? '0px' : ('-' + item.offsetWidth + 'px')
            // if (this.show && item.offsetTop !== 0) {
            //   item.style.top = '-' + item.offsetTop + 'px'
            // }
          } else {
            item.style.left = ('-' + item.offsetWidth + 'px')
          }
        }
        // if (current && current.style) {
        //   item.style.left = this.show ? '0px' : ('-' + item.offsetWidth + 'px')
        // }
      }
    },
    mounted () {
      let style = this.$refs.popover.style
      let ref = this.$el
      style.top = 0 // (ref.offsetTop) + 'px'
      style.left = (ref.clientWidth + ref.offsetLeft + 0) + 'px'
      style.height = (ref.clientHeight + 0) + 'px'
      // style.width = (200 + 0) + 'px'
      style.minWidth = (ref.clientWidth + 0) + 'px'
      style.width = 'auto'
      // 修正top
      let popover = this.$refs.popover
      popover.style.visibility = 'hidden'
      let items = popover.querySelectorAll('.slide-panel-item')
      for (let item of items) {
        if (item.offsetTop !== 0) {
          item.style.top = '-' + item.offsetTop + 'px'
        }
      }
    }
  }
</script>
<template>
  <div class="slide-panel">
    <slot></slot>
    <div class="popover" ref="popover">
      <slot name="item"></slot>
    </div>
  </div>
</template>
