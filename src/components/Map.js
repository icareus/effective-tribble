import React from 'react'
import olMap from 'ol/Map';
import View from 'ol/View';

import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js';
import {OSM, Vector as VectorSource} from 'ol/source.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import {Circle as CircleStyle, Stroke, Style} from 'ol/style.js';

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

const fakeMapData = {
  "type": "Point",
  "coordinates": [
    2.345151901245117,
    48.89259960797655
  ]
}

const fakeDestination = {
  "type": "Point",
  "coordinates": [
    2.3438644409179688,
    48.81048112472012
  ]
}

class Map extends React.Component {
  constructor(props) {
    super(props)
    this.mapRef = React.createRef()
    this.parcelFeature = (new GeoJSON())
      .readFeatures(fakeMapData, {
          featureProjection: 'EPSG:3857'
      })
    this.destinationFeature = (new GeoJSON())
      .readFeatures(fakeDestination, {
          featureProjection: 'EPSG:3857'
      })
    this.origin = this.parcelFeature[0].getGeometry().getCoordinates()
  }
  componentDidMount() {
    const map = new olMap({
      view: new View({
        center: this.parcelFeature[0].getGeometry().getCoordinates(),
        zoom: 10
      }),
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        new VectorLayer({
          source: new VectorSource({
            features: this.parcelFeature
          }),
          style: styles['Point']
        })
      ],
      target: 'map'
    });
    let moveInterval = setInterval(_ => {
      const parcel = this.parcelFeature[0]
      const dest = this.destinationFeature[0]
      const destCoords = dest.getGeometry().getCoordinates()// [x, y]
      const parcelCoords = parcel.getGeometry().getCoordinates()
      console.log('coords', destCoords, parcelCoords)

      const delta = [
        destCoords[0] - parcelCoords[0],
        destCoords[1] - parcelCoords[1]
      ]
      const distance = Math.sqrt(Math.pow(delta[0] + delta[1], 2))
      const speed = 1000
      if (distance <= 2 * speed) {
        alert('Parcel has reached its destination.')
        parcel.getGeometry().setCoordinates(destCoords)

        clearInterval(moveInterval)
        return
      }
      console.log('distance', distance)

      const directionVector = [
        destCoords[0] - this.origin[0],
        destCoords[1] - this.origin[1]
      ]
      const vLength = Math.sqrt(Math.pow((directionVector[0] + directionVector[1]), 2))
      const unitVector = [
        directionVector[0] / vLength,
        directionVector[1] / vLength
      ]
      const move = [
        unitVector[0] * speed,
        unitVector[1] * speed
      ]
      const newCoords = [
        parcelCoords[0] + move[0],
        parcelCoords[1] + move[1]
      ]

      parcel.getGeometry().setCoordinates(newCoords)
      console.log(`
        Old coords: ${parcelCoords}\n
        New coords: ${newCoords}\n
        Dst coords: ${destCoords}`)
    }, 1000)
  }
  render() {
    return <div id="map" />
  }
}

export default Map
