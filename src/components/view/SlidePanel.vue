<script>
  export default {
    name: 'slide-panel',
    data () {
      return {
        top: 0,
        left: 0,
        width: 0,
        height: 0,
        show: false
      }
    },
    methods: {
      toggleItem (name) {
        this.show = !this.show
        if (this.last !== name) {
          this.last = name
          this.show = true
        }

        for (let item of this.items) {
          if (name === item.getAttribute('data-name')) {
            item.style.left = this.show ? '0px' : ('-' + item.offsetWidth + 'px')
          } else {
            item.style.left = ('-' + item.offsetWidth + 'px')
          }
        }
      },
      onResize (event) {
        if (!this.$el) return
        let ref = this.$el
        this.top = 0 // -(ref.clientHeight + ref.offsetTop)
        this.left = ref.clientWidth + ref.offsetLeft + 0
        this.width = ref.clientWidth + 0
        this.height = ref.clientHeight + 0
      }
    },
    mounted () {
      this.show = false
      this.items = this.$refs.popover.querySelectorAll('.slide-panel-item')
      // for (let item of this.items) {
      //   item.style.top = '-' + (this.height) + 'px' //  + item.offsetTop
      // }
      window.addEventListener('resize', this.onResize)
      this.onResize()
    },
    watch: {
      height (val, oldVal) {
        if (!this.items) return
        for (let item of this.items) {
          item.style.top = '-' + (val) + 'px' //  + item.offsetTop
        }
      }
    }
  }
</script>
<template>
  <div class="slide-panel">
    <slot></slot>
    <div class="popover" ref="popover" :style="{top: top+'px', left: left+'px', width: 'auto', minWidth: width+'px', height: height+'px', visibility: show ? 'visible' : 'hidden'}">
      <slot name="item"></slot>
    </div>
  </div>
</template>
