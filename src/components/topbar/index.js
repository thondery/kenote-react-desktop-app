import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './style.scss'

var electron = null
var ipcRenderer = null

export default class Topbar extends PureComponent {

  static propTypes = {
    
  }

  static defaultProps = {
    
  }

  state = {
    blurStyle: null
  }

  constructor (props) {
    super(props)
  }

  async componentDidMount () {
    //electron = await import('electron')
    //ipcRenderer = electron.ipcRenderer
  }

  render () {
    return (
      <div className="topbar-container">
        <div />
        
      </div>
    )
  }
}