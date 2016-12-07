<script>
export default {
  name: 'vui-wrapper',
  render (createElement, context) {
    console.log(this.$slots.default)
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
  }
}
</script>
