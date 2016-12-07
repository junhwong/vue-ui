
<script>
  export default {
    name: 'button',
    props: {
      href: String,
      icon: String,
      type: {
        type: String,
        default: 'button' // button, submit, link
      }
    },
    rendervv: function (createElement, context) {
      // api see: http://vuejs.org/v2/guide/render-function.html#The-Data-Object-In-Depth
      context = context || {}
      context.data = context.data || {}
      context.data['class'] = context.data['class'] || {}
      context.data['class'].btn = true
      let tag = 'button'
      let domProps = context.data.domProps || {}
      switch (this.type) {
        case 'button':
        case 'submit':
          domProps.type = this.type
          break
        case 'link':
          tag = 'a'
          domProps.href = this.href
          break
      }
      context.data.domProps = domProps
      // let me = this
      context.data.on = {
        click: event => {
          this.$emit('click', event)
        }
      }

      let el = createElement(tag, context.data, this.$slots.default)

      console.log(el)
      return el
    }
  }
</script>
<template>
  <ui-wrapper>
    <a v-if="type == 'link'" class="btn" href="href"><slot></slot></a>
    <button v-else class="btn"><slot></slot></button>
  </ui-wrapper>
</template>
