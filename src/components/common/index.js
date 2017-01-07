import ContextMenu from './ContextMenu'
import Toast from './Toast'

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
    const toast = new Vue({
      el: div,
      components: { Toast },
      template: '<toast/>'
    })
    Object.defineProperty(Vue.prototype, '$toast', {
      get () { return toast.$children[0] }
    })
  }
}
