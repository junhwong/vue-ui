<script>
  const startsWith = (s, prefix) => {
    return s.slice(0, prefix.length) === prefix
  }

  export default {
    name: 'icon',
    props: {
      prefix: {
        type: String,
        default: 'icon'
      },
      source: {
        type: String,
        default: 'iconfont'
      },
      type: {
        type: String,
        required: true
      }
    },
    computed: {
      iconCls: {
        get () {
          if (!startsWith(this.type, this.prefix)) {
            return this.prefix + '-' + this.type
          }
          return this.type
        }
      }
    }
  }
</script>
<template>
  <i :class="[source, iconCls]"></i>
</template>
