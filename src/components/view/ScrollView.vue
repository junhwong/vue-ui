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
        let max = contentHeight - containerHeight
        if (max <= 0) {
          height = containerHeight
        } else {
          height = containerHeight - max
          height = height <= 0 ? 24 : height
        }
        // console.log(containerHeight, current + base, base + containerHeight)

        this.yBarHeight = height
        this.minY = base
        this.maxY = base + containerHeight - height
        this.currentY = this.minY
        let bar = this.$refs.bar
        this.base = bar.offsetTop + base
        bar.style.height = height + 'px'
      },
      scrollY (value) {
        let diff = this.currentY - value
        if (value < this.minY || (-diff) + this.currentY > this.maxY) {
          console.log(diff)
          return
        }
        this.currentY = value - this.len
        this.contentY += diff
      },
      drag (event) {
        if (!this.startDrag) return
        this.scrollY(event.clientY)
        // const diff = this.startY - event.clientY
        // const lengthPerStep = 100 / ((650 - 24) / 1)
        // const steps = Math.round(newPos / lengthPerStep);
        // let y = this.current + -diff // -(this.startY - event.clientY)
        // if (y <= 0) {
        //   y = 0
        // } else if (y >= this.max) {
        //   y = this.max
        // }

        // let y = event.clientY
        // console.log(this.minY, this.len, this.maxY, this.startY, y + this.len, y)
        // let diff = this.currentY - y
        // if (y >= this.minY && y - diff <= this.maxY) {
        //   this.scrollY(event.clientY)
        // }
        // this.current = event.clientY // Math.round(this.current + -diff)
        // let bar = this.$refs.bar
        // bar.style.top = (this.current) + 'px'
        // console.log(this.startY, event.clientY, diff, this.current, this.max)
      }
    },
    mounted () {
      let container = this.$el
      let content = this.$refs.content
      let bar = this.$refs.bar
      // let style = bar.style
      // let ref = this.$el
      // bar.style.top = container.offsetTop + 'px'
      bar.style.left = (content.clientWidth + content.offsetLeft - bar.clientWidth - 1) + 'px'
      this.update(container.offsetTop, container.clientHeight, content.clientHeight, 0)
      // style.height = (ref.clientHeight + 0) + 'px'
      // style.width = (200 + 0) + 'px'
      // style.minWidth = (ref.clientWidth + 0) + 'px'
      // style.width = 'auto'
      // 修正top
      // let popover = this.$refs.popover
      // popover.style.visibility = 'hidden'
      // let items = popover.querySelectorAll('.slide-panel-item')
      // for (let item of items) {
      //   if (item.offsetTop !== 0) {
      //     item.style.top = '-' + item.offsetTop + 'px'
      //   }
      // }
      // content.style.top = -100 + 'px'
      // console.log(container.clientHeight, content.clientHeight)
      bar.addEventListener('mousedown', e => {
        document.body.style.userSelect = 'none'
        // user-select
        bar.setAttribute('class', 'popover scrollview-bar popover scrollview-bar-drag')
        this.startDrag = true
        this.startY = e.clientY

        // let bar = this.$refs.bar
        let len = this.startY - bar.offsetTop
        // len = len <= 0 ? this.yBarHeight : (len >= this.yBarHeight ? 0 : this.yBarHeight - len)
        // len = len >= this.yBarHeight ? 0 : len
        this.len = len // this.maxY - len - 80
      })
      // bar.addEventListener('mouseup', e => {
      //   console.log('>>>>>>>>>>>>>>>>>>>>')
      //   document.body.style.userSelect = ''
      //   this.startDrag = false
      // })
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
