import './style/all.scss'

import common from './components/common'
import Tree from './components/tree'
import Modal from './components/modal'
import Button from './components/button/Button'
import Edit from './components/form/Edit'
import Dropdown from './components/form/dropdown'
import Combo from './components/form/combo'
import Wrapper from './components/wrapper'
import Window from './components/view/Window'
import SlidePanel from './components/view/SlidePanel'
import ScrollPanel from './components/view/ScrollPanel'
import Menu from './components/nav/Menu'
import Icon from './components/basic/Icon'
const Components = {
  common,
  Icon,
  Wrapper,
  Tree,
  Modal,
  Button,
  Edit,
  Combo,
  Dropdown,
  Window,
  SlidePanel,
  ScrollPanel,
  Menu
}

Components.install = Vue => {
  Object.defineProperty(Vue.prototype, '$$VUE', {
    get () { return Vue }
  })
  for (let key of Object.keys(Components)) {
    let Component = Components[key]
    if (!Component) {
      continue
    }
    if (Component.install) {
      Component.install(Vue)
    } else if (Component.name) {
      Vue.component(Component.name, Component)
    }
  }
}

export default Components
