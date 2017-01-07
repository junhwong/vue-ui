<!--<style lang="scss" src="./style.scss"></style>-->

<script>
// import TreeNode from './Node'
export default {
  name: 'x-popover',
  components: {
    // TreeNode
  },
  props: {

  },
  renderxx (createElement, context) {
    let x = 1
    if (1 - x === 0) return this._e()
    let arr = []
    for (let elem of this.$slots.default) {
      // 过滤注释
      if (elem.tag) {
        arr.push(elem)
      }
    }

    if (arr.length === 1) {
      return arr[0]
    } else {
      return createElement('div', {}, arr)
    }
  },
  createds () {
    const host = document.createElement('div')
    host.setAttribute('id', '__popoer_' + (new Date().getTime()))
    document.body.appendChild(host)
    this.$parent = host
    // console.log('host:', host)
    // const mount = this.$mount
    // this.$mount = (el, hydrating) => {
    //   mount.call(this, host, hydrating)
    //   console.log('mount:', this.$el)
    // }
  },
  methods: {
    handleClick (e) {
      // console.log(e)
    }
  },
  mountedxx () {
    const host = document.createElement('div')
    host.setAttribute('id', '__popoer_' + (new Date().getTime()))
    document.body.appendChild(host)
    this.$mount(host)
    // 阻止事件传向底层，让事件在底层处理
    this.$el.addEventListener('click', (e) => {
      this.$emit('click', e)
      e.stopPropagation()
      // e.preventDefault()
    })
    document.addEventListener('click', this.handleClick)
  },
  destroyed () {
    document.removeEventListener('click', this.handleClick)
  }
}
</script>
<template>
  <div class="popover">
    <slot></slot>
  </div>
</template>
