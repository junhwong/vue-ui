import Component from './Popover'

Component.installs = Vue => {
  Vue.component('vui' + Component.name, Component)
}

export default Component
