import ContextMenu from './ContextMenu'
// let ContextMenu = {
//   name: 'contextmenu',
//   beforeCreate () {
//     let doc = window.document
//     let el = doc.getElementById('__contextmenu')
//     if (!el) {
//       el = doc.createElement('div')
//       el.setAttribute('id', '__contextmenu')
//       doc.appendChild(el)
//     }
//   }
// }

ContextMenu.installs = Vue => {

  let doc = window.document
  let el = doc.getElementById('__contextmenu')
  if (!el) {
    el = doc.createElement('div')
    el.setAttribute('id', '__contextmenu')
    doc.body.appendChild(el)
  }

  let contextmenu = new Vue({
    components: { ContextMenu },
    template: '<div><context-menu/></div>'
  }).$mount('#__contextmenu')
  console.log('>>>>>>>>>>>>>>>', el) // <context-menu/>
  Object.defineProperty(Vue.prototype, '$contextmenu', {
    get () { return contextmenu.$children[0] }
  })

  // Vue.component('vui' + Component.name, Component)
}

export default ContextMenu
