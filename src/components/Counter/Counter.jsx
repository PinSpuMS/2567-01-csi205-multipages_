import { useEffect, useState } from 'react'

import './Counter.css'

function Counter(props) {
  const [value, setValue] = useState(props.value || 0)

  useEffect(() => {
    setValue(props.value || 0)
  }, [props.value])

  function decrement() {
    setValue(value - 1)
  }

  function increment() {
    setValue(value + 1)
  }

  return (
    <div className='counter-container'>
      <h3 className='counter-title'>{props.name || 'COUNTER'}</h3>
      <button className='btn btn-danger' onClick={decrement}>
        <span className='bi bi-dash'></span>
      </button>
      <span className='counter-value'>{value}</span>
      <button className='btn btn-success' onClick={increment}>
        <span className='bi bi-plus'></span>
      </button>
    </div>
  )
}

export default Counter
