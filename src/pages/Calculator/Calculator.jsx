import { useEffect } from 'react'

import './Calculator.css'

const DEBUG = false
const MAX_DIGITS = 13
const THOUSAND_SEPARATOR = ','

function Calculator() {
  let state = 'first'
  let first = 0
  let second = 0
  let operator = '?'
  let display = '0'

  useEffect(() => {
    initial()
    render()
    displayLog()

    // document.addEventListener('keydown', (e) => {
    //   if (e.key === ' ') runClick()
    //   else if (e.key === '+' || e.key === '=')
    //     operatorClick(document.getElementById('plus'))
    //   else if (e.key === '-') operatorClick(document.getElementById('minus'))
    //   else if (e.key === 'Enter') equalClick()
    //   else if (e.key === 'Escape') clearClick()
    //   else if (e.key >= '0' && e.key <= '9')
    //     numberClick(document.getElementById(`n${e.key}`))
    //   e.stopImmediatePropagation()
    // })
  })

  const clearClick = () => {
    // console.log('clear clicked')
    // press C/CE while in "first" state
    if (state === 'first') {
      display = '0'
      first = Number(display)
    }

    // press C/CE while in "operator" state
    else if (state === 'operator') {
      if (display === '0') {
        initial()
        state = 'first'
      }
      display = '0'
      second = Number(display)
    }

    // press C/CE while in "second" state
    else if (state === 'second') {
      if (display !== '0') {
        state = 'operator'
      } else {
        initial()
        state = 'first'
      }
      display = '0'
      second = Number(display)
    }

    // render ui
    render()

    // display log
    displayLog()
  }

  const equalClick = () => {
    // console.log('equal click')

    // press '=' while in "operator" state
    if (state === 'operator') {
      display = String(operator === '+' ? first + second : first - second)
      first = Number(display)
      state = 'second'
    }

    // press '=' while in "second" state
    else if (state === 'second') {
      display = String(operator === '+' ? first + second : first - second)
      first = Number(display)
    }

    // render ui
    render()

    // display log
    displayLog()
  }

  const operatorClick = (btn) => {
    // console.log('operator clicked')
    // console.log(btn)

    // press +/- while in "first" state
    if (state === 'first') {
      second = first
      operator = btn.innerText
      state = 'operator'
    }

    // press +/- while in "operator" state
    else if (state === 'operator') {
      operator = btn.innerText
    }

    // press +/- while in "second" state
    else if (state === 'second') {
      display = String(operator === '+' ? first + second : first - second)
      first = Number(display)
      operator = btn.innerText
      state = 'operator'
    }

    // render ui
    render()

    // display log
    displayLog()
  }

  const numberClick = (btn) => {
    // console.log('number clicked')
    // console.log(btn)

    // press number while in "first" state
    if (state === 'first') {
      if (display === '0') {
        display = btn.innerText
      } else {
        if (display.length < MAX_DIGITS) display += btn.innerText
      }
      first = Number(display)
    }

    // press number while in "operator" state
    else if (state === 'operator') {
      display = btn.innerText
      second = Number(display)
      state = 'second'
    }

    // press number while in "second" state
    else if (state === 'second') {
      if (display === '0') {
        display = btn.innerText
      } else {
        if (display.length < 9) display += btn.innerText
      }
      second = Number(display)
    }

    // render ui
    render()

    // display log
    displayLog()
  }

  const render = () => {
    // render display
    // fixed for introduce by minus sign!!!!
    let displayString = ''
    for (let i = display.length - 1; i >= 0; i--) {
      if ((display.length - i) % 3 === 0 && i !== 0) {
        displayString = THOUSAND_SEPARATOR + display[i] + displayString
      } else {
        displayString = display[i] + displayString
      }
    }
    document.getElementById('display').value = displayString

    // render C/CE button
    if (
      (state === 'first' && first === 0) ||
      (state === 'operator' && second === 0)
    ) {
      document.getElementById('clear').innerText = 'CE'
    } else {
      document.getElementById('clear').innerText = 'C'
    }

    // render +/- button
    if (state === 'operator') {
      if (operator === '+') {
        document.getElementById('plus').classList.add('yellow')
        document.getElementById('minus').classList.remove('yellow')
      } else {
        document.getElementById('minus').classList.add('yellow')
        document.getElementById('plus').classList.remove('yellow')
      }
    } else {
      document.getElementById('plus').classList.remove('yellow')
      document.getElementById('minus').classList.remove('yellow')
    }
  }

  const initial = () => {
    // initial state
    state = 'first'
    first = 0
    second = 0
    operator = '?'
    display = '0'
  }

  const displayLog = () => {
    // display log
    DEBUG &&
      console.log(
        `"${state}": first:${first}, second:${second}, operator:'${operator}'`
      )
  }

  // const checkKeyboard = (event) => {
  //   // console.log(`Key down: ${event.key}`)
  //   if (event.key === 'Enter') {
  //     equalClick()
  //   } else if (event.key === 'Escape') {
  //     clearClick()
  //   } else if (event.key === '+' || event.key === '=') {
  //     operatorClick(document.getElementById('plus'))
  //   } else if (event.key === '-') {
  //     operatorClick(document.getElementById('minus'))
  //   } else if (event.key >= '0' && event.key <= '9') {
  //     numberClick(document.getElementById(`n${event.key}`))
  //   }
  // }

  // document.addEventListener('DOMContentLoaded', () => {
  //   // initialization
  //   initial()
  //   // render ui
  //   render()
  //   // display log
  //   displayLog()
  //   // check keyboard
  //   document.addEventListener('keydown', checkKeyboard)
  // })

  return (
    <div className='calculator-container'>
      <table>
        <tbody>
          <tr>
            <td colSpan={5} className='calculator-td'>
              <input
                type='text'
                className='calculator-input'
                id={'display'}
                value={'0'}
                readOnly={true}
              />
            </td>
          </tr>

          <tr>
            <td colSpan={5} className='calculator-td'>
              <div style={{ height: '0.5rem' }}></div>
            </td>
          </tr>

          <tr>
            <td className='calculator-td'>
              <button
                className='calculator-button calculator-button-green'
                disabled
              >
                <b>MC</b>
              </button>
            </td>
            <td className='calculator-td'>
              <button
                className='calculator-button calculator-button-green'
                disabled
              >
                MR
              </button>
            </td>
            <td className='calculator-td'>
              <button
                className='calculator-button calculator-button-green'
                disabled
              >
                M+
              </button>
            </td>
            <td className='calculator-td'>
              <button
                className='calculator-button calculator-button-green'
                disabled
              >
                M-
              </button>
            </td>
            <td className='calculator-td'>
              <button
                className='calculator-button calculator-button-orange'
                onClick={clearClick}
                id='clear'
              >
                CE
              </button>
            </td>
          </tr>

          <tr>
            <td className='calculator-td'>
              <button
                id='n7'
                className='calculator-button calculator-button-blue'
                onClick={(e) => numberClick(e.target)}
              >
                7
              </button>
            </td>
            <td className='calculator-td'>
              <button
                id='n8'
                className='calculator-button calculator-button-blue'
                onClick={(e) => numberClick(e.target)}
              >
                8
              </button>
            </td>
            <td className='calculator-td'>
              <button
                id='n9'
                className='calculator-button calculator-button-blue'
                onClick={(e) => numberClick(e.target)}
              >
                9
              </button>
            </td>
            <td className='calculator-td'>
              <button
                className='calculator-button calculator-button-green'
                disabled
              >
                &divide;
              </button>
            </td>
            <td className='calculator-td'>
              <button
                className='calculator-button calculator-button-green'
                disabled
              >
                &radic;
              </button>
            </td>
          </tr>
          <tr>
            <td className='calculator-td'>
              <button
                id='n4'
                className='calculator-button calculator-button-blue'
                onClick={(e) => numberClick(e.target)}
              >
                4
              </button>
            </td>
            <td className='calculator-td'>
              <button
                id='n5'
                className='calculator-button calculator-button-blue'
                onClick={(e) => numberClick(e.target)}
              >
                5
              </button>
            </td>
            <td className='calculator-td'>
              <button
                id='n6'
                className='calculator-button calculator-button-blue'
                onClick={(e) => numberClick(e.target)}
              >
                6
              </button>
            </td>
            <td className='calculator-td'>
              <button
                className='calculator-button calculator-button-green'
                disabled
              >
                &times;
              </button>
            </td>
            <td className='calculator-td'>
              <button
                className='calculator-button calculator-button-green'
                disabled
              >
                1/x
              </button>
            </td>
          </tr>
          <tr>
            <td className='calculator-td'>
              <button
                id='n1'
                className='calculator-button calculator-button-blue'
                onClick={(e) => numberClick(e.target)}
              >
                1
              </button>
            </td>
            <td className='calculator-td'>
              <button
                id='n2'
                className='calculator-button calculator-button-blue'
                onClick={(e) => numberClick(e.target)}
              >
                2
              </button>
            </td>
            <td className='calculator-td'>
              <button
                id='n3'
                className='calculator-button calculator-button-blue'
                onClick={(e) => numberClick(e.target)}
              >
                3
              </button>
            </td>
            <td className='calculator-td'>
              <button
                id='minus'
                className='calculator-button calculator-button-green-equal'
                onClick={(e) => operatorClick(e.target)}
              >
                &minus;
              </button>
            </td>
            <td className='calculator-td'>
              <button
                className='calculator-button calculator-button-green'
                disabled
              >
                %
              </button>
            </td>
          </tr>
          <tr>
            <td className='calculator-td'>
              <button
                id='n0'
                className='calculator-button calculator-button-blue'
                onClick={(e) => numberClick(e.target)}
              >
                0
              </button>
            </td>
            <td className='calculator-td'>
              <button
                className='calculator-button calculator-button-blue-disabled'
                disabled
              >
                .
              </button>
            </td>
            <td className='calculator-td'>
              <button
                className='calculator-button calculator-button-blue-disabled'
                disabled
              >
                +/-
              </button>
            </td>
            <td className='calculator-td'>
              <button
                id='plus'
                className='calculator-button calculator-button-green-equal'
                onClick={(e) => operatorClick(e.target)}
              >
                +
              </button>
            </td>
            <td className='calculator-td'>
              <button
                id='equal'
                className='calculator-button calculator-button-green-equal'
                onClick={equalClick}
              >
                =
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Calculator
