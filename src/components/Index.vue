<style lang="scss" src="./popover/style.scss"></style>
<style lang="scss" src="./tree/style.scss"></style>
<style lang="scss" src="./modal/style.scss"></style>
<style lang="scss" src="./button/style.scss"></style>
<style lang="scss" src="./input/style.scss"></style>
<style lang="scss" src="./contextmenu/style.scss"></style>

<script>
import Tree from './tree'
import Popover from './popover'
import Modal from './modal'
import Button from './button/Button'
import Input from './input/Input'
import Wrapper from './wrapper'
import ContextMenu from './contextmenu'

const Components = {
  Wrapper,
  Tree,
  Popover,
  Modal,
  Button,
  Input,
  ContextMenu
}

Components.install = Vue => {
  for (let key of Object.keys(Components)) {
    let Component = Components[key]
    if (!Component || !Component.name) {
      continue
    }
    if (Component.install) {
      Component.install(Vue)
    } else {
      Vue.component(Component.name, Component)
    }
  }
}

export default Components
</script>
