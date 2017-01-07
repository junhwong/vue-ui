<script>
export default {
  name: 'x-text',
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
  <x-wrapper>
    <textarea v-if="type === 'textarea'" class="form-control" v-html="value" @input="handleInput"></textarea>
    <input v-else class="form-control" :value="value" @input="handleInput"/>
  </x-wrapper>
</template>
