import { useEffect, useState } from 'react'

import './Timer.css'

function Timer(props) {
  const MINUTE_SECONDS = 60
  const HOUR_SECONDS = 60 * MINUTE_SECONDS
  const DAY_SECONDS = 24 * HOUR_SECONDS

  const [running, setRunning] = useState(false)
  const [second, setSecond] = useState(0)

  useEffect(() => {
    setRunning(props.running || false)
    setSecond(props.value || 0)
  }, [props])

  useEffect(() => {
    let interval = null

    if (running) {
      interval = setInterval(() => {
        setSecond((prev) => prev + 1)
      }, 1000)
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [running, second])

  function timeToScreen(time) {
    const days = Math.floor(time / DAY_SECONDS)
    const hours = Math.floor((time % DAY_SECONDS) / HOUR_SECONDS)
    const minutes = Math.floor((time % HOUR_SECONDS) / MINUTE_SECONDS)
    const seconds = Math.floor(time % MINUTE_SECONDS)
    let displayString = ''
    if (days > 0) {
      displayString = `${days}d ${hours < 10 ? '0' + hours : hours}h ${
        minutes < 10 ? '0' + minutes : minutes
      }m ${seconds < 10 ? '0' + seconds : seconds}s`
    } else if (hours > 0) {
      displayString = `${hours}h ${minutes < 10 ? '0' + minutes : minutes}m ${
        seconds < 10 ? '0' + seconds : seconds
      }s`
    } else if (minutes > 0) {
      displayString = `${minutes}m ${seconds < 10 ? '0' + seconds : seconds}s`
    } else {
      displayString = `${seconds}s`
    }
    return displayString
  }

  function resetClick() {
    setRunning(false)
    setSecond(props.value || 0)
  }

  function runClick() {
    setRunning(!running)
  }

  return (
    <div className='timer-container'>
      <h3 className='timer-title'>{props.name || 'TIMER'}</h3>
      <div className='timer-screen'>{timeToScreen(second)}</div>
      <div className='timer-buttons'>
        <button className='btn btn-danger' onClick={resetClick}>
          <span className='bi bi-arrow-counterclockwise'>&nbsp;Reset</span>
        </button>
        <button
          className={'btn ' + (running ? 'btn-warning' : 'btn-success')}
          onClick={runClick}
        >
          <span className={running ? 'bi bi-pause' : 'bi bi-play'}>
            &nbsp;{running ? 'Pause' : 'Run'}
          </span>
        </button>
      </div>
    </div>
  )
}

export default Timer
