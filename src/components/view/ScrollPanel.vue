<script>
  // TODO:
  // 1.横向滚动
  // 2.touch 事件
  // 3.鼠标滚轮事件
  // 4.BUG: 修正最小值与最大值
  export default {
    name: 'scroll-panel',
    data () {
      return {
        currentY: 0,
        contentY: 0,
        startDragY: false,
        content: {
          top: 0,
          left: 0,
          height: 0,
          width: 0
        },
        container: {
          top: 0,
          left: 0,
          height: 0,
          width: 0
        },
        yBar: {
          draging: false,
          top: 0,
          left: 0,
          height: 0,
          width: 0,
          axis: 0,
          min: 0,
          max: 0,
          distance: 0
        },
        xBar: {
          draging: false,
          top: 0,
          left: 0,
          height: 0,
          width: 0,
          axis: 0,
          min: 0,
          max: 0,
          distance: 0
        }
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
        if (this.content.height <= this.container.height) return
        this.yBar.height = Math.round(this.container.height / (this.content.height / this.container.height))
        this.yBar.min = this.container.top
        this.yBar.max = this.yBar.min + this.container.height - this.yBar.height
        this.yBar.axis = this.content.height / this.container.height
        this.yBar.top = this.yBar.min
        this.yBar.left = this.content.width + this.content.left - this.yBar.width - 1
        console.log('initYBar', this.yBar.height)
      },
      scrollY (value) {
        value -= this.yBar.distance
        let diff = this.yBar.top - value
        if (value < this.yBar.min || (-diff) + this.yBar.top > this.yBar.max) {
          return
        }
        this.yBar.top = value
        this.content.top += Math.round(diff * this.yBar.axis) // + this.len
        // this.contentY = this.contentY >= 0 ? 0 : this.contentY // 修正top
        // https://github.com/powy1993/scroll/blob/master/scroll.js
      },
      drag (event) {
        if (!this.yBar.draging) return
        this.scrollY(event.clientY)
      },
      onResize () {
        if (!this.$el) return
        let container = this.$el
        let content = this.$refs.content
        let yBar = this.$refs.bar

        this.container.top = container.offsetTop
        this.container.left = container.offsetLeft
        this.container.width = container.clientWidth
        this.container.height = container.clientHeight

        this.content.top = this.container.top - content.offsetTop
        this.content.left = content.offsetLeft
        this.content.width = content.clientWidth
        this.content.height = content.clientHeight

        this.yBar.top = yBar.offsetTop
        this.yBar.left = yBar.offsetLeft
        this.yBar.width = yBar.clientWidth
        this.yBar.height = yBar.clientHeight
      },
      clickYBar (e) {
        document.body.style.userSelect = 'none' // 拖动的时候不选择任何其它元素
        // user-select
        this.yBar.draging = true
        this.startY = e.clientY
        this.yBar.distance = e.clientY - this.yBar.top // 初始位置与点击位置的距离
      },
      releaseDrag () {
        this.yBar.draging = false
        document.body.style.userSelect = ''
      }
    },
    mounted () {
      this.onResize()
      this.initYBar()

      this.$refs.bar.addEventListener('mousedown', this.clickYBar)
      document.addEventListener('mouseup', this.releaseDrag)
      document.addEventListener('mousemove', this.drag)
      window.addEventListener('resize', this.onResize)
    },
    destroyed () {
      if (this.$refs) {
        this.$refs.bar.removeEventListener('mousedown', this.clickYBar)
      }
      document.removeEventListener('mouseup', this.releaseDrag)
      document.removeEventListener('mousemove', this.drag)
      window.removeEventListener('resize', this.onResize)
    }
  }
</script>
<template>
  <div class="scroll-panel">
    <!--:style="{transform: 'translateY('+ -contentY + 'px)'}"-->
    <div class="scroll-panel-content" ref="content" :style="{top: content.top+'px'}"><slot></slot></div>
    <div class="popover scroll-panel-thumb" ref="bar" :style="{
      top: yBar.top+'px',
      left: yBar.left+'px',
      height: yBar.height+'px'
    }" :class="{'scroll-panel-thumb-drag': this.yBar.draging}"></div>
  </div>
</template>
