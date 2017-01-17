<script>
import Wrapper from '../wrapper'
export default {
  name: 'edit',
  components: {Wrapper},
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
  <wrapper>
    <textarea v-if="type === 'textarea'" class="form-control" v-html="value" @input="handleInput"></textarea>
    <div v-else-if="type === 'rich'" class="editor">
      <ul class="editor-toolbar">
        <li>
          <a href="javascript:;" tabindex="-1" unselectable="on" class="toolbar-item toolbar-item-title" title="Title"<span></span></a>
        </li>
      </ul>
      <div class="editor-body" contenteditable="true" v-html="value" @input="handleInput"></div>
      <div class="editor-fbar"></div>
    </div>
    <input v-else class="form-control" :value="value" @input="handleInput"/>
  </wrapper>
</template>
