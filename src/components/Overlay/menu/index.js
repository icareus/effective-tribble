import React, { Component } from 'react'
import { Button, Collapse, Drawer } from 'antd'

import Feature from 'ol/Feature'
import Point from 'ol/geom/Point.js'
import VectorSource from 'ol/source/Vector.js'
import { Vector as VectorLayer } from 'ol/layer.js'

const { Panel } = Collapse

const styles = {
  openButton: {
    position: 'absolute',
    left: '10px',
    top: '10px'
  }
}

class Menu extends Component {
  state = {
    visible: false
  }

  showDrawer = () => {
    this.setState({
      visible: true,
    })
  }

  onClose = () => {
    this.setState({
      visible: false,
    })
  }

  startPick = () => {
      document.body.style.cursor = 'crosshair'
      window.map.addEventListener('click', this.getPick)
  }
  getPick = ({ coordinate }) => {
    document.body.style.cursor = 'default'
    window.map.removeEventListener('click', this.getPick)
    this.setState({
      ...this.state,
      startLocation: coordinate
    })
    this.markLocation(coordinate)
  }

  // Ughly placeholder
  markLocation = coordinate => {
    const marker = new Feature({
      geometry: new Point(coordinate),
      name: 'Quest Start'
    })
    const source = new VectorSource({ features: [marker] })
    if (!this.markersLayer) {
      this.markersLayer = new VectorLayer()
      window.map.addLayer(this.markersLayer)
    }
    this.markersLayer.setSource(source)
  }

  render() {
    return (
      <div>
        <Button type='primary' onClick={this.showDrawer} style={styles.openButton}>
          Settings
        </Button>
        <Drawer className='clickthrough'
          title='Settings'
          placement='left'
          mask={false}
          closable={true}
          onClose={this.onClose}
          visible={this.state.visible || false}
        >
        <Collapse
          bordered={false}
          defaultActiveKey={['2', '3']}>
          <Panel header="Create Quest" key="1">
            <Button onClick={this.startPick}>
              <img
                width='32px'
                height='32px'
                src="/res/svg/pick-location-icon.svg"
                alt="Pick location" />
              Start Location
            </Button>
            { this.state.startLocation &&
              <p>
                x: {this.state.startLocation[0]}<br />
                y: {this.state.startLocation[1]}
              </p>
            }
          </Panel>
        </Collapse>
        </Drawer>
      </div>
    )
  }
}

export default Menu
