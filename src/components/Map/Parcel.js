import { Feature } from 'ol'
import LineString from 'ol/geom/LineString'
import Point from 'ol/geom/Point'
import { fromLonLat } from 'ol/proj'

const startCoords = [
  2.345151901245117,
  48.89259960797655
]
const endCoords = [
  2.3438644409179688,
  48.81048112472012
]
const from = new Point(fromLonLat(startCoords))
const to = new Point(fromLonLat(endCoords))

const startTime = new Date()

const parcel = new Feature({
  geometry: new Point(fromLonLat(startCoords))
})

const trajectory = new LineString([
  fromLonLat(startCoords),
  fromLonLat(endCoords)
])

// console.log('From:', from)
// console.log('To:', to)
// console.log('Parcel:', parcel)
// console.log('trajectory:', trajectory)

const moveParcel = (newCoords, parcel) => {
  parcel.getGeometry().setCoordinates(newCoords)
}

const computePos = (trajectory, speed, elapsed) => {
  // console.log("T,S,E", trajectory, speed, elapsed)

  const distance = speed * elapsed // speed and time units have to be consistent !
  const length = trajectory.getLength(trajectory)

  const fractionDone = [distance / length]
  const newCoords = trajectory.getCoordinateAt(fractionDone)

  // console.log(newCoords)

  return newCoords
}

const updateParcel = _ => {
  const elapsed = new Date() - startTime// In milisecs
  const oldPos = parcel.getGeometry().flatCoordinates
  const newPos = computePos(trajectory,
    100, // speed in m/s
    elapsed / 1000// in seconds
  )
  let delta = newPos ? [
    newPos[0] - oldPos[0],
    newPos[1] - oldPos[1]
  ] : [0, 0]

  if (newPos) {
    moveParcel(newPos, parcel)
  } else {
    alert('newPos oob - clearing')
    clearInterval(updateInterval)
  }

  return delta
}

const updateInterval = setInterval(_ => {
  parcel.delta = updateParcel()
}, 500)

console.log(parcel)
export default parcel
