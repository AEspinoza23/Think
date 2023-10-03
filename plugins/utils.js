/* eslint-disable no-unused-vars */
import Icons from '~/constants/icons'
import IconsSvg from '~/constants/icons-svg'
import Assets from '~/constants/assets'

export default function ({ _ }, inject) {
  const iconsSvg = IconsSvg
  inject('iconsSvg', iconsSvg)

  const icons = Icons
  inject('icons', icons)

  const assets = Assets
  inject('assets', assets)
}
