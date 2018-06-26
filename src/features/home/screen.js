import React, { PureComponent } from 'react'
import CoreLayout from '../../components/core-layout'
import Topbar from '../../components/topbar'

export default class Home extends PureComponent {

  render () {
    return (
      <CoreLayout>
        <Topbar />
        <div className="mainbody-container">

        </div>
      </CoreLayout>
    )
  }
}