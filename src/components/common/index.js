import ContextMenu from './ContextMenu'
import Prompt from './Prompt'

export default {
  install (Vue) {
    let div = document.createElement('div')
    document.body.appendChild(div)
    const contextmenu = new Vue({
      el: div,
      components: { ContextMenu },
      template: '<context-menu/>'
    })
    Object.defineProperty(Vue.prototype, '$contextmenu', {
      get () { return contextmenu.$children[0] }
    })

    div = document.createElement('div')
    document.body.appendChild(div)
    const prompt = new Vue({
      el: div,
      components: { Prompt },
      template: '<prompt/>'
    })
    Object.defineProperty(Vue.prototype, '$prompt', {
      get () { return prompt.$children[0] }
    })
  }
}
