import './Footer.css'

function Footer() {
  return (
    <div className='footer-container'>
      <h3>
        <span className='badge bg-info'>SPU</span>
        &nbsp;&minus;&nbsp;
        <span className='badge' style={{ backgroundColor: 'purple' }}>
          SIT
        </span>
        &nbsp;&minus;&nbsp;
        <span className='badge bg-warning'>CSI</span>
      </h3>
    </div>
  )
}

export default Footer
