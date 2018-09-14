import React from 'react'
import olMap from 'ol/Map'
import View from 'ol/View'

import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js'
import {OSM, Vector as VectorSource} from 'ol/source.js'
import {Circle as CircleStyle, Stroke, Style} from 'ol/style.js'

// Nik, la flemme d'eject
// import { apply } from 'ol-mapbox-style'

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
    setInterval(_ => {
      this.view.setCenter(this.parcel.getGeometry().flatCoordinates)
    }, 1000/25)
  }
  componentDidMount() {
    const map = new olMap({
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
    // apply('map', '/fiord-color-gl-style.json')
  }
  render() {
    return <div id="map" />
  }
}

export default Map
