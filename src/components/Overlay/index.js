import React, { Component } from 'react'

import { Button } from 'antd'

import AddParcel from './widgets/addParcel'

class Overlay extends Component {
  constructor(props) {
    super(props)
    this.state = {
      creating: ''
    }
  }
  render() {
    return (
      <div className='Overlay clickthrough'>
        <AddParcel />
      </div>
    )
  }
}

export default Overlay
