import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { rootActions } from '../reduxs'

@connect(
  state => ({
    initialPending       : state.Root.initialPending,
    initialProgress      : state.Root.initialProgress,
  }),
  dispatch => ({
    actions: bindActionCreators({ ...rootActions }, dispatch)
  })
)
export class AppEntry extends PureComponent {

  constructor (props) {
    super(props)
  }

  componentDidMount () {
    this.props.actions.initialProgress(65)
  }

  componentDidUpdate(prevProps, prevState) {
    const { initialPending, initialProgress } = prevProps
    if (this.props.initialPending) {
      this.props.initialProgress === 65 && this.props.actions.initialProgress(100)
      this.props.initialProgress === 100 && this.props.actions.initialComplete()
    }
  }

  render () {
    const { children, location } = this.props
    return this.renderProgress(children)
  }

  renderProgress = (children) => {
    const { initialPending, initialProgress } = this.props
    return initialPending ? (
      <div className="app-initial-page">
        <div className="progress-span">Loading... {initialProgress}%</div>
        <div className="layout-progress-bar">
          <div className="progress-bar-container">
            <div className="progress-bar-pending" style={{ width: `${initialProgress}%` }} />
          </div>
        </div>
      </div>
    ) : children
  }
}

export class NotFound extends PureComponent {

  render () {
    const { children, location } = this.props
    return (
      <div>
        NotFound
      </div>
    )
  }
}