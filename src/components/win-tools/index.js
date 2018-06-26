import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './style.scss'
import * as storage from '../../services/storage'

var electron = null
var ipcRenderer = null
var remote = null
var win = null

export default class WinTools extends PureComponent {

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
    if (process.env.ELECTRON) {
      electron = await import('electron')
      ipcRenderer = electron.ipcRenderer
      remote = electron.remote
      win = remote.getCurrentWindow()
      
    }
    ipcRenderer && ipcRenderer.on('blurWindow', (evt, arg) => {
      this.setState({ blurStyle: 'blur' })
    })
    ipcRenderer && ipcRenderer.on('focusWindow', (evt, arg) => {
      this.setState({ blurStyle: null })
    })
    console.log(await storage.getItem('app'))
  }

  render () {
    const { mode } = this.props
    return (
      <div className={classnames('win-tools', this.state.blurStyle)}>
        <a className="tool-close" onClick={this.handleClose}></a>
        <a className="tool-min" onClick={this.handleMinimize}></a>
        <a className="tool-full" onClick={this.handleFullScreen}></a>
      </div>
    )
  }

  handleClose = () => {
    if (!ipcRenderer) return
    ipcRenderer.send('win-tools', 'hide')
  }

  handleMinimize = () => {
    if (!remote) return
    let win = remote.getCurrentWindow()
    win.minimize()
  }

  handleFullScreen = () => {
    if (!remote) return
    let win = remote.getCurrentWindow()
    let isFullscreen = win.isFullScreen()
    win.setFullScreen(!isFullscreen)
  }
}