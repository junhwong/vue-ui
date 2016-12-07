import Component from './Tree'

Component.installs = Vue => {
  Vue.component(Component.name, Component)
}

export default Component
