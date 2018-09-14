import React, { Component } from 'react'

import { Button, Modal } from 'antd'

class AddParcel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // Modal info
      open: false,
      // Parcel form info => move to other component ?
      weight: 0,
      x: 0,
      y: 0,
      z: 0
    }

    this.setOpen = this.setOpen.bind(this)
  }
  setOpen(open) {
    this.setState({
      ...this.state,
      open
    })
  }
  submitForm({ weight, x, y, z }) {
    this.setState({
      ...this.state,
      open: false,
      weight, x, y, z
    })
  }
  render() {
    const { open } = this.state
    return (
      <div>
        <Button type="primary" onClick={_ => this.setOpen(true)}>
               Add Parcel
        </Button>
        <Modal
          visible={ open }
          title="Add Parcel"
          onOk={_ => this.setOpen(false)}
          onCancel={_ => this.setOpen(false)}>

          <div>TODO: Add parcel creation form</div>
          <div>TODO: x, y, z, weight</div>
          <div>TODO: And pickup / delivery positions (GPS for now)</div>

        </Modal>
      </div>
    )
  }
}

export default AddParcel
