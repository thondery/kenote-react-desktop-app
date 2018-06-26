import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Toolbar from '../toolbar'
import Sider from '../sider'
import './style.scss'

export default class CoreLayout extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
  }

  static defaultProps = {
    children: null
  }

  constructor (props) {
    super(props)
  }

  render () {
    const { children } = this.props
    return (
      <div className="layout-warpper">
        <Toolbar />
        <div className="layout-container">
          <Sider />
          <div className="main-warpper">
            {children}
          </div>
        </div>
      </div>
    )
  }
}