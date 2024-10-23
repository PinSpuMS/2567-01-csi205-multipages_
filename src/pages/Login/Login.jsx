import { useRef, useEffect } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

import programmer from '../../assets/Home/programmer.gif'

import { verifyUser } from '../../data/users'

import './Login.css'

function Login({ setToken, setRole }) {
  const userRef = useRef()
  const passRef = useRef()

  useEffect(() => {
    userRef.current.focus()
  }, [])

  const programmerTooltip = (props) => (
    <Tooltip {...props}>
      Original Image from "https://outlane.co/now/new-shot-programmer-animation"
    </Tooltip>
  )

  const usernameTooltip = (props) => <Tooltip {...props}>type "user"</Tooltip>

  const passwordTooltip = (props) => <Tooltip {...props}>type "pass"</Tooltip>

  return (
    <div className='login-container'>
      <Form>
        <OverlayTrigger
          placement='right'
          delay={{ show: 250, hide: 400 }}
          overlay={programmerTooltip}
        >
          <a href='https://outlane.co/now/new-shot-programmer-animation'>
            <img src={programmer} alt='programmer' width={'240px'} />
          </a>
        </OverlayTrigger>

        <OverlayTrigger
          placement='right'
          delay={{ show: 250, hide: 400 }}
          overlay={usernameTooltip}
        >
          <InputGroup>
            <InputGroup.Text
              id='username'
              className='text-light bg-dark'
              style={{ width: '120px' }}
            >
              <span className='bi bi-person'>&nbsp;Username</span>
            </InputGroup.Text>

            <Form.Control
              aria-label='Username'
              aria-describedby='username'
              placeholder='user'
              ref={userRef}
              // title='typing "user"'
            />
          </InputGroup>
        </OverlayTrigger>

        <OverlayTrigger
          placement='right'
          delay={{ show: 250, hide: 400 }}
          overlay={passwordTooltip}
        >
          <InputGroup className='mt-2'>
            <InputGroup.Text
              className='text-light bg-dark'
              style={{ width: '120px' }}
            >
              <span className='bi bi-key'>&nbsp;Password</span>
            </InputGroup.Text>

            <Form.Control
              type='password'
              aria-label='Password'
              aria-describedby='password'
              placeholder='pass'
              autoComplete=''
              ref={passRef}
              // title='typing "pass"'
            />
          </InputGroup>
        </OverlayTrigger>

        <div className='d-flex flex-row justify-content-between mt-3'>
          <Button
            variant='danger'
            style={{ width: '120px' }}
            onClick={() => {
              userRef.current.value = ''
              passRef.current.value = ''
              userRef.current.focus()
            }}
          >
            Clear
          </Button>

          <Button
            type='submit'
            variant='primary'
            style={{ width: '120px' }}
            onClick={(e) => {
              const user = userRef.current.value.trim()
              const pass = passRef.current.value.trim()
              userRef.current.value = ''
              passRef.current.value = ''
              const userInfo = verifyUser(user, pass)
              if (userInfo === null) {
                alert('Wrong username or password')
                userRef.current.focus()
              } else {
                setToken(userInfo.token)
                setRole(userInfo.role)
              }
              e.preventDefault()
            }}
          >
            Login
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default Login
