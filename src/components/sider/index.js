import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import './style.scss'

export default class Sider extends PureComponent {

  static propTypes = {
    
  }

  static defaultProps = {
    
  }

  constructor (props) {
    super(props)
  }

  render () {
    const { children } = this.props
    return (
      <div className="sider-warpper">
        
      </div>
    )
  }
}