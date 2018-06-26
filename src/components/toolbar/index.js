import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import WinTools from '../win-tools'
import ToolIcon from './icon'
import './style.scss'

const __MACOS__ = process.platform === 'darwin'

export default class Toolbar extends PureComponent {

  static propTypes = {
    
  }

  static defaultProps = {
    
  }

  state = {
    active: ''
  }

  constructor (props) {
    super(props)
  }

  render () {
    const { children } = this.props
    return (
      <div className="toolbar-warpper">
        {process.env.ELECTRON && __MACOS__ && <WinTools />}
        <div className="main-container">
          <ToolIcon type="user" icon={require('../../assets/icon/user.png')} />
          <ToolIcon 
            icon={require('../../assets/icon/mail.png')} 
            iconActive={require('../../assets/icon/mail-active.png')}
            onPress={this.handlePress.bind(this, 'mail')}
            active={this.state.active === 'mail'}
            />
          <ToolIcon 
            icon={require('../../assets/icon/setting.png')} 
            iconActive={require('../../assets/icon/setting-active.png')}
            onPress={this.handlePress.bind(this, 'setting')}
            active={this.state.active === 'setting'}
            />
        </div>
        <div className="foot-container">
          <ToolIcon icon={require('../../assets/icon/et-more.png')} />
        </div>
      </div>
    )
  }

  handlePress = (active) => {
    this.setState({ active })
  }
}