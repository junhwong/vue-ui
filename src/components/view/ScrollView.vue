<script>
  export default {
    name: 'scroll-view',
    data () {
      return {
        currentY: 0,
        contentY: 0
      }
    },
    methods: {
      update (base, containerHeight, contentHeight, current) {
        let height = 0
        if (contentHeight <= containerHeight) return
        height = Math.round(containerHeight / (contentHeight / containerHeight))
        this.minY = base
        this.maxY = base + containerHeight - height
        this.axisY = contentHeight / containerHeight
        this.currentY = this.minY
        let bar = this.$refs.bar
        bar.style.height = height + 'px'
      },
      initYBar () {

      },
      scrollY (value) {
        value -= this.len
        let diff = this.currentY - value
        if (value < this.minY || (-diff) + this.currentY > this.maxY) {
          return
        }
        this.currentY = value
        this.contentY += Math.round(diff * this.axisY) // + this.len
        // this.contentY = this.contentY >= 0 ? 0 : this.contentY // 修正top
        // https://github.com/powy1993/scroll/blob/master/scroll.js
      },
      drag (event) {
        if (!this.startDrag) return
        this.scrollY(event.clientY)
      }
    },
    mounted () {
      let container = this.$el
      let content = this.$refs.content
      let bar = this.$refs.bar
      bar.style.left = (content.clientWidth + content.offsetLeft - bar.clientWidth - 1) + 'px'
      this.update(container.offsetTop, container.clientHeight, content.clientHeight, 0)

      bar.addEventListener('mousedown', e => {
        document.body.style.userSelect = 'none'
        // user-select
        bar.setAttribute('class', 'popover scrollview-bar popover scrollview-bar-drag')
        this.startDrag = true
        this.startY = e.clientY

        let len = this.startY - bar.offsetTop
        this.len = len
      })
      document.addEventListener('mouseup', e => {
        bar.setAttribute('class', 'popover scrollview-bar')
        document.body.style.userSelect = ''
        this.startDrag = false
      })
      document.addEventListener('mousemove', this.drag)
    }
  }
</script>
<template>
  <div class="scrollview">
    <div class="scrollview-content" ref="content" :style="{top: contentY + 'px'}"><slot></slot></div>
    <div class="popover scrollview-bar" ref="bar" :style="{top: currentY + 'px'}"></div>
  </div>
</template>
