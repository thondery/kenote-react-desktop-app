import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './style.scss'

export default class ToolIcon extends PureComponent {

  static propTypes = {
    type: PropTypes.string,
    icon: PropTypes.any,
    iconActive: PropTypes.any,
    active: PropTypes.bool,
    onPress: PropTypes.func
  }

  static defaultProps = {
    type: undefined,
    icon: null,
    iconActive: null,
    active: false,
    onPress: () => null
  }

  constructor (props) {
    super(props)
  }

  render () {
    const { type, icon, iconActive, active, onPress } = this.props
    let className = type === 'user' ? 'toolbar-icon-user' : 'toolbar-icon'
    let iconSrc = active && iconActive ? iconActive : icon
    return (
      <div className={classnames(className, active && 'active')} onClick={onPress}>
        <img src={iconSrc} />
      </div>
    )
  }
}