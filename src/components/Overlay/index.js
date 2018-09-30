import React, { Component } from 'react'

import AddParcel from './widgets/addParcel'
import Menu from './menu'

class Overlay extends Component {
  render() {
    return (
      <div className='Overlay clickthrough'>
        <Menu>
          <AddParcel />
        </Menu>
      </div>
    )
  }
}

export default Overlay
