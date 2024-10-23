import { useEffect, useState } from 'react'

import Variable from '../Variable/Variable'

import './Add.css'

function Add({ v1, v2 }) {
  const [a, setA] = useState(0)
  const [b, setB] = useState(0)

  useEffect(() => {
    setA(v1 || 0)
    setB(v2 || 0)
  }, [v1, v2])

  return (
    <div className='add-container'>
      <h3 className='add-title'>ADD</h3>
      <h3 className='display-variables'>
        <span className='badge bg-secondary'>A = {a}</span>
        <span className='badge bg-primary'>A + B = {a + b}</span>
        <span className='badge bg-secondary'>B = {b}</span>
      </h3>
      <div className='add-variables'>
        <Variable type={'int'} name={'A'} value={a} setValue={setA} />
        <Variable type={'int'} name={'B'} value={b} setValue={setB} />
      </div>
    </div>
  )
}

export default Add
