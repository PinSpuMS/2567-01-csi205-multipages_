import { useState, useEffect } from 'react'
import './Animation.css'

import groundField from '../../assets/Animation/field.jpg'
import basketball from '../../assets/Animation/basketball.png'
import football from '../../assets/Animation/football.png'
import volleyball from '../../assets/Animation/volleyball.png'
import human from '../../assets/Animation/human.png'
import cartoon from '../../assets/Animation/cartoon.png'
import logo from '../../assets/Animation/logo.png'

const initBall = 'basketball'
const initRun = true

// global constants
const fieldWidth = 986
const fieldHeight = 480
const fieldBorder = 2

const ballSize = 150
const ballSpeedX = 5
const ballSpeedY = 5
const ballMaxSpeedRotationAngle = 8

const maxLeft = fieldWidth - 2 * fieldBorder - ballSize
const maxTop = fieldHeight - 2 * fieldBorder - ballSize

function Animation() {
  const [ball, setBall] = useState('')

  useEffect(() => {
    setIsRunning(initRun)
    setBall(initBall)
    document.getElementById(initBall).click()
  }, [])

  // global variables
  const [ballLeft, setBallLeft] = useState(maxLeft / 2)
  const [ballTop, setBallTop] = useState(maxTop / 2)
  const [ballAngle, setBallAngle] = useState(0)
  const [ballSpeedAngle, setBallSpeedAngle] = useState(1)
  // let ballLeft = maxLeft / 2
  // let ballTop = maxTop / 2
  // let ballAngle = 0
  // let ballSpeedAngle = 1

  const [isRunning, setIsRunning] = useState(false)
  const [isGoingRight, setIsGoingRight] = useState(true)
  const [isGoingDown, setIsGoingDown] = useState(true)
  // let isRunning = false
  // let isGoingRight = true
  // let isGoingDown = true

  useEffect(() => {
    drawField()
    render()

    // document.addEventListener('keydown', (e) => {
    //   console.log(`key: '${e.key}'`)
    //   if (e.key === '0') ballSelect('none')
    //   else if (e.key === '1') ballSelect('basketball')
    //   else if (e.key === '2') ballSelect('football')
    //   else if (e.key === '3') ballSelect('volleyball')
    //   else if (e.key === '4') ballSelect('human')
    //   else if (e.key === '5') ballSelect('cartoon')
    //   else if (e.key === '6') ballSelect('logo')
    //   else if (e.key === ' ') runClick()
    //   e.stopImmediatePropagation()
    // })
  })

  useEffect(() => {
    let interval = null
    if (isRunning) {
      // set process interval times (40 f/s)
      interval = setInterval(process, 25)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, ballTop, ballLeft])

  const runClick = () => {
    setIsRunning(!isRunning)

    // force render to make sure that button is rendered
    render()
  }

  const ballSelect = (b) => {
    // console.log(b)

    const ball = document.getElementById('animation-ball')

    // set ball background image
    if (b === 'none') ball.style.backgroundImage = 'none'
    else if (b === 'basketball')
      ball.style.backgroundImage = `url(${basketball})`
    else if (b === 'football') ball.style.backgroundImage = `url(${football})`
    else if (b === 'volleyball')
      ball.style.backgroundImage = `url(${volleyball})`
    else if (b === 'human') ball.style.backgroundImage = `url(${human})`
    else if (b === 'cartoon') ball.style.backgroundImage = `url(${cartoon})`
    else if (b === 'logo') ball.style.backgroundImage = `url(${logo})`
    setBall(b)
  }

  const render = () => {
    // render ball
    const ball = document.getElementById('animation-ball')
    ball.style.left = `${ballLeft}px`
    ball.style.top = `${ballTop}px`
    ball.style.width = `${ballSize}px`
    ball.style.height = `${ballSize}px`
    ball.style.transform = `rotate(${ballAngle}deg)`
  }

  const calculate = () => {
    let newTop, newLeft, newAngle

    // check left direction
    if (isGoingRight) {
      newLeft = ballLeft + ballSpeedX
      if (newLeft >= maxLeft) {
        newLeft = maxLeft - (newLeft - maxLeft)
        setIsGoingRight(false)
        setBallSpeedAngle(
          Math.random() * ballMaxSpeedRotationAngle -
            ballMaxSpeedRotationAngle / 2
        )
      }
    }
    // check right direction
    else {
      // calculate ball speed in right direction
      newLeft = ballLeft - ballSpeedX
      if (newLeft <= 0) {
        newLeft = -newLeft
        setIsGoingRight(true)
        setBallSpeedAngle(
          Math.random() * ballMaxSpeedRotationAngle -
            ballMaxSpeedRotationAngle / 2
        )
      }
    }
    setBallLeft(newLeft)

    // check down direction
    if (isGoingDown) {
      newTop = ballTop + ballSpeedY
      if (newTop >= maxTop) {
        newTop = maxTop - (newTop - maxTop)
        setIsGoingDown(false)
        setBallSpeedAngle(
          Math.random() * ballMaxSpeedRotationAngle -
            ballMaxSpeedRotationAngle / 2
        )
      }
    }
    // check up direction
    else {
      newTop = ballTop - ballSpeedY
      if (newTop <= 0) {
        newTop = -newTop
        setIsGoingDown(true)
        setBallSpeedAngle(
          Math.random() * ballMaxSpeedRotationAngle -
            ballMaxSpeedRotationAngle / 2
        )
      }
    }
    setBallTop(newTop)

    // calculate ball angle
    newAngle = ballAngle + ballSpeedAngle
    if (newAngle < 0) {
      newAngle += 360
    } else if (newAngle >= 360) {
      newAngle -= 360
    }
    setBallAngle(newAngle)

    // console.log(newLeft, newTop, newAngle, isGoingRight, isGoingDown)
  }

  const drawField = () => {
    // console.log('xxx')
    // render field by fieldWidth and fieldHeight
    const field = document.getElementById('animation-field')
    field.style.backgroundImage = `url(${groundField})`
    field.style.width = `${fieldWidth}px`
    field.style.height = `${fieldHeight}px`
  }

  const process = () => {
    if (isRunning) {
      // calculation
      calculate()

      // render ui
      render()
    }
  }

  return (
    <div className='animation-container'>
      <div id='animation-field'>
        <div id='animation-ball'></div>
      </div>

      <div id='animation-control'>
        <button
          id='animation-run'
          className={'btn ' + (isRunning ? 'btn-danger' : 'btn-success')}
          onClick={runClick}
        >
          <span className={'bi ' + (isRunning ? 'bi-pause' : 'bi-play')}>
            &nbsp;{isRunning ? 'PAUSE' : 'RUN'}
          </span>
        </button>

        <span className='animation-ball-select'>
          <button
            id='none'
            className={
              'btn ' +
              (ball === 'none' ? 'btn-secondary' : 'btn-outline-secondary')
            }
            onClick={() => ballSelect('none')}
          >
            {/* <span className='bi bi-0-circle'>&nbsp;None</span> */}
            None
          </button>

          <button
            id='basketball'
            className={
              'btn ' +
              (ball === 'basketball' ? 'btn-primary' : 'btn-outline-primary')
            }
            onClick={() => ballSelect('basketball')}
          >
            {/* <span className='bi bi-1-circle'>&nbsp;Basketball</span> */}
            Basketball
          </button>

          <button
            id='football'
            className={
              'btn ' +
              (ball === 'football' ? 'btn-primary' : 'btn-outline-primary')
            }
            onClick={() => ballSelect('football')}
          >
            {/* <span className='bi bi-2-circle'>&nbsp;Football</span> */}
            Football
          </button>

          <button
            id='Volleyball'
            className={
              'btn ' +
              (ball === 'volleyball' ? 'btn-primary' : 'btn-outline-primary')
            }
            onClick={() => ballSelect('volleyball')}
          >
            {/* <span className='bi bi-3-circle'>&nbsp;Volleyball</span> */}
            Volleyball
          </button>

          <button
            id='human'
            className={
              'btn ' +
              (ball === 'human' ? 'btn-primary' : 'btn-outline-primary')
            }
            onClick={() => ballSelect('human')}
          >
            {/* <span className='bi bi-4-circle'>&nbsp;Human</span> */}
            Human
          </button>

          <button
            id='cartoon'
            className={
              'btn ' +
              (ball === 'cartoon' ? 'btn-primary' : 'btn-outline-primary')
            }
            onClick={() => ballSelect('cartoon')}
          >
            {/* <span className='bi bi-5-circle'>&nbsp;Cartoon</span> */}
            Cartoon
          </button>

          <button
            id='logo'
            className={
              'btn ' + (ball === 'logo' ? 'btn-primary' : 'btn-outline-primary')
            }
            onClick={() => ballSelect('logo')}
          >
            {/* <span className='bi bi-6-circle'>&nbsp;Logo</span> */}
            Logo
          </button>
        </span>
      </div>
    </div>
  )
}

export default Animation
