import Counter from '../../components/Counter/Counter'
import Timer from '../../components/Timer/Timer'
import Add from '../../components/Add/Add'
import Temperatures from '../../components/Temperatures/Temperatures'

import background from '../../assets/Components/background.jpg'

import './Components.css'
import { useEffect } from 'react'

function Components() {
  useEffect(() => {
    const bg = document.getElementsByClassName('components-container')[0]
    bg.style.backgroundImage = `url(${background})`
    bg.style.backgroundSize = 'cover'
    bg.style.backgroundPosition = 'center'
  }, [])

  return (
    <div className='components-container'>
      <h2>
        <span className='badge bg-black'>REACT COMPONENTS</span>
      </h2>
      <div className='components-container-1'>
        <div className='components-container-2'>
          <Counter name={'COUNTER'} value={0} />
          <Timer className='timer' name={'TIMER'} value={0} running={false} />
        </div>
        <div>
          <Add className='add' v1={0} v2={0} />
        </div>
      </div>

      <Temperatures className='temp' name={'TEMPERATURES'} initCelsius={25} />
      {/* 
      <h3>
        <span className='badge bg-dark'>นายสมชาย ขยันเรียน รหัส 66123456</span>
      </h3>
*/}
    </div>
  )
}

export default Components
