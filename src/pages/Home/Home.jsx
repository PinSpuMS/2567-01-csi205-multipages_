import pin from '../../assets/Home/pin.jpg'
import programmer from '../../assets/Home/programmer.gif'

import './Home.css'

function Home() {
  return (
    <div className='home-container'>
      <div className='card' style={{ boxShadow: '0 0 0.125rem lightgray' }}>
        <img src={pin} className='card-img-top' alt='pin' />
        <div className='card-body p-2'>
          <table>
            <tr valign='top'>
              <td>
                <span className='bi bi-person'></span>
              </td>
              <td>
                <b>Pin Chatkaewmanee</b>, D.Eng. (Instructor)
              </td>
            </tr>
            <tr valign='top'>
              <td>
                <span className='bi bi-check-lg'></span>
              </td>
              <td>
                Computer Science and Software Development Innovation Department
                (<b>CSI</b>)
              </td>
            </tr>
            <tr valign='top'>
              <td>
                <span className='bi bi-check-lg'></span>
              </td>
              <td>
                School of Information Technology (<b>SIT</b>)
              </td>
            </tr>
            <tr valign='top'>
              <td>
                <span className='bi bi-check-lg'></span>
              </td>
              <td>
                Sripatum University (<b>SPU</b>)
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div
        className='home-course-container p-2'
        style={{ boxShadow: '0 0 0.125rem lightgray' }}
      >
        <p>
          <b>CSI205 Front End Software Development</b>, this course teaches
          several topics as follows:
        </p>
        <ul>
          <li>
            <b>Basic UX/UI:</b> review the background basic to design friendly
            web interface with UX research (study in previous course)
          </li>
          <li>
            <b>Traditional HTML/CSS/JS:</b> learn from ground start from nothing
            with basic used of HTML tags, then make webpage look petty using
            CSS, and finally write a JavaScript to interact with user or handle
            DOM events inside a webpage
          </li>
          <li>
            <b>React web application:</b> start form basic idea of React such as
            Virtual DOM, both class and function components, props and states,
            and ton of React hook examples
          </li>
          <li>
            <b>Prepare Back End Interfaces: </b> An example prepared for future
            interfaces to Back End via APIs
          </li>
          <li>
            <b>Basic DevOp:</b> such as virtual machine, container technology,
            version control and deployment tools
          </li>
        </ul>
        Hope, you enjoy this course :)
        <div className='mt-2'>
          <img className='home-img' src={programmer} alt='programmer' />
        </div>
      </div>
    </div>
  )
}

export default Home
