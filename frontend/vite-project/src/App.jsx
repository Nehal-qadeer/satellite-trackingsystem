import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MapView from './mapView'

function App() {
  const position = { lat: 30.3753, lng: 69.3451 };
  const positionKarachi = { lat: 24.8607, lng: 67.0011 };
  const positionLahore = { lat: 31.5204, lng: 74.3587 };
  const positionIslamabd = { lat: 33.6995, lng: 73.0363 };
  const [count, setCount] = useState(0)
  const location = {
    address: "1600 Amphitheatre Parkway, Mountain View, california.",
    lat: 37.42216,
    lng: -122.08427,
  };
  return (
    <>
      <h1 style={{textAlign:'center'}}>Satellite Data</h1>
      <div>
        <MapView />
      </div>
    </>
  )
}

export default App
