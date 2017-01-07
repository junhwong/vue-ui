// import Component from './Popover'

// Component.installs = Vue => {
//   Vue.component('vui' + Component.name, Component)
// }

// export default Component
export default {
  name: 'x-popover',
  data () {
    return {
      display: false
    }
  },
  methods: {
    dock (ref) {
      if (!this.target || !ref) return
      let style = this.target.$el.style
      style.top = (ref.offsetTop) + 'px'
      style.left = (ref.clientWidth + ref.offsetLeft + 4) + 'px'
      style.height = (ref.clientHeight + 0) + 'px'
      style.width = (200 + 0) + 'px'
    },
    show () {
      this.display = true
      let style = this.target.$el.style
      style.display = 'block'
    },
    hide () {
      this.display = false
      let style = this.target.$el.style
      style.display = 'none'
    }
  },
  render (createElement, context) {
    // console.log('slots1', this.$slots)
    if (this.$targetEL) {
      this.$targetEL.remove()
    }
  },
  created () {
    console.log('created', this.$options)
    // let div = document.createElement('div')
    // div.innerHTML = 'loading...'
    // document.body.appendChild(div)
    // this.$targetEL = div
    // this.$root.$targetEL = this.$targetEL
    if (!this.$root[this]) {
      this.$root[this] = true
      let div = document.createElement('div')
      div.innerHTML = 'loading...'
      document.body.appendChild(div)
      let children = this.$options._renderChildren
      let Vue = this.$$VUE
      this.target = new Vue({
        el: div,
        render (createElement, context) {
          return children.length === 1 ? children[0] : createElement('div', {}, children)
        }
      })
      console.log('babababa')
    }
  },
  updated () {
    console.log('updated')
    // if (this.target) {
    //   this.target.$destroy()
    // }
  },
  mounteds () {
    console.log('mounted', this.$el)
    if (this.target || !this.$slots.default || this.$root[this]) return
    console.log('mounted2')
    let arr = []
    for (let elem of this.$slots.default) {
      // 过滤注释
      console.log('elem', elem)
      if (elem.tag) {
        arr.push(elem)
      }
    }
    if (arr.length === 0) return
    console.log('mounted3')
    let div = document.createElement('div')
    div.innerHTML = 'loading...'
    document.body.appendChild(div)
    this.$root[this] = div

    let Vue = this.$$VUE

    this.target = new Vue({
      el: this.$root[this],
      render (createElement, context) {
        return this.$createElement('div', this['class'], arr)
      }
    })
  },
  destroyed () {
    // if (this.$targetEL) {
    //   this.$targetEL.remove()
    // }
  }
}
