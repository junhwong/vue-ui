const getChildren = renderChildren => renderChildren.filter(elem => elem.tag)
const getTag = elem => {
  return (elem && ['DIV', 'P', 'UL', 'DL'].indexOf(elem.tag)) ? elem.tag : 'DIV'
}
export default {
  name: 'x-wrapper',
  props: {
    'root': {
      type: Boolean,
      default: false,
      required: false
    }
  },
  mounted () {
    let id = this._uid
    // console.log('mounted', this._uid)
    if (this.root && !this.$root[id]) {
      const children = getChildren(this.$slots.default) // this.$options._renderChildren
      if (children.length === 0) {
        console.warn('包裹子对象必须至少包含一个标签化的对象')
        return
      }
      const tag = getTag(children[0])
      const elem = document.createElement(tag)
      document.body.appendChild(elem)
      const Vue = this.$$VUE
      this.target = new Vue({
        el: elem,
        render (createElement, context) {
          return children.length === 1 ? children[0] : createElement(tag, {}, children)
        }
      })
      this.$root[id] = this.target
    } else if (this.root) {
      this.target = this.$root[id]
    } else {
      this.target = this
    }
  },
  render (createElement, context) {
    if (this.root) return // createElement('div')
    const children = getChildren(this.$slots.default)
    if (children.length === 0) {
      console.warn('包裹子对象必须至少包含一个标签化的对象')
      return
    }
    return children.length === 1 ? children[0] : createElement(getTag(children[0]), {}, children)
  },
  methods: {
    dock (ref) {
      if (!this.target || !ref) return
      let style = this.target.$el.style
      style.top = (ref.offsetTop) + 'px'
      style.left = (ref.clientWidth + ref.offsetLeft + 0) + 'px'
      style.height = (ref.clientHeight + 0) + 'px'
      style.width = (200 + 0) + 'px'
    }
  }
}
