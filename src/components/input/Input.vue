<script>
export default {
  name: 'vui-input',
  props: {
    type: {
      type: String,
      default: 'text'
    },
    value: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleInput (e) {
      this.$emit('input', e.target.value)
    }
  }
}
</script>

<template>
  <vui-wrapper>
    <textarea v-if="type === 'textarea'" class="ui-form-control" v-html="value" @input="handleInput"></textarea>
    <input v-else class="ui-form-control" :value="value" @input="handleInput"/>
  </vui-wrapper>
</template>
