import React from 'react'
import olMap from 'ol/Map'
import View from 'ol/View'

import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js'
import {OSM, Vector as VectorSource} from 'ol/source.js'
import {Circle as CircleStyle, Stroke, Style} from 'ol/style.js'

import parcel from './Parcel'

const image = new CircleStyle({
  radius: 5,
  fill: null,
  stroke: new Stroke({color: 'red', width: 1})
})

const styles = {
  'Point': new Style({
    image: image
  })
}

class Map extends React.Component {
  constructor(props) {
    super(props)
    // this.mapRef = React.createRef()
    this.parcel = parcel
    this.view = new View({
      center: this.parcel.getGeometry().getCoordinates(),
      zoom: 10
    })
    this.updateView = this.updateView.bind(this)
    this.parcel.getGeometry().on('change', this.updateView)
  }
  componentDidMount() {
    this.map = new olMap({
      view: this.view,
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        new VectorLayer({
          source: new VectorSource({
            features: [
              this.parcel
            ]
          }),
          style: styles['Point']
        })
      ],
      target: 'map'
    })
    window.map = this.map // Fuck this
    // apply('map', '/fiord-color-gl-style.json')
  }
  updateView() {
    const viewCenter = this.view.getCenter()
    const delta = this.parcel.delta || [0,0]
    this.view.setCenter([
      viewCenter[0] + delta[0],
      viewCenter[1] + delta[1]
    ])
    this.parcel.delta = [0,0]
  }
  render() {
    return <div id="map" />
  }
}

export default Map
