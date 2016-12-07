import Component from './Modal'

Component.installs = Vue => {
  Vue.component('vui' + Component.name, Component)
}

export default Component
