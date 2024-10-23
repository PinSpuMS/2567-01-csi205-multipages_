import { useEffect, useState } from 'react'

import Variable from '../Variable/Variable'

import './Temperatures.css'

function Temperatures({ name, initCelsius }) {
  const [celsius, setCelsius] = useState(0)
  const [fahrenheit, setFahrenheit] = useState(0)
  const [kelvin, setKelvin] = useState(0)

  useEffect(() => {
    setCelsius(initCelsius || 0)
    setFahrenheit(cToF(initCelsius || 0))
    setKelvin(cToK(initCelsius || 0))
  }, [initCelsius])

  const setNewCelsius = (newCelsius) => {
    setCelsius(newCelsius)
    setFahrenheit(cToF(newCelsius))
    setKelvin(cToK(newCelsius))
  }

  const setNewFahrenheit = (NewFahrenheit) => {
    setCelsius(fToC(NewFahrenheit))
    setFahrenheit(NewFahrenheit)
    setKelvin(fToK(NewFahrenheit))
  }
  const setNewKelvin = (newKelvin) => {
    setCelsius(kToC(newKelvin))
    setFahrenheit(kToF(newKelvin))
    setKelvin(newKelvin)
  }

  const cToF = (c) => (c * 9) / 5 + 32
  const cToK = (c) => c + 273.15
  const fToC = (f) => ((f - 32) * 5) / 9
  const fToK = (f) => ((f + 459.67) * 5) / 9
  const kToC = (k) => k - 273.15
  const kToF = (k) => (k * 9) / 5 - 459.67

  return (
    <div className='temperatures-container'>
      <h3 className='temperatures-title'>{name || 'TEMPERATURES'}</h3>
      <h3 className='temperatures-values'>
        <span className='badge bg-primary'>{celsius.toFixed(2)} °C</span>
        <span className='badge bg-primary'>{cToF(celsius).toFixed(2)} °F</span>
        <span className='badge bg-primary'>{kelvin.toFixed(2)} °K</span>{' '}
      </h3>
      <div className='temp-variables'>
        <Variable
          className='variable'
          name={`CELSIUS`}
          value={celsius}
          setValue={setNewCelsius}
        />
        <Variable
          className='variable'
          name={`FAHRENHEIT`}
          bn
          value={fahrenheit}
          setValue={setNewFahrenheit}
        />
        <Variable
          className='variable'
          name={'KELVIN'}
          value={kelvin}
          setValue={setNewKelvin}
        />
      </div>
    </div>
  )
}

export default Temperatures
