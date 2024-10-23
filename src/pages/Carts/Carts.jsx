import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

import './Carts.css'

function Carts({ carts, setCarts }) {
  return (
    <div className='carts-container'>
      <div className='carts-items-container'>
        {carts.map((cart) => {
          return (
            <Card
              style={{ width: '13rem', boxShadow: '0 0 0.25rem gray' }}
              key={cart.id}
            >
              <Card.Img variant='top' src={cart.thumbnailUrl} />
              <Card.Body>
                <Card.Title>{cart.title}</Card.Title>
                <Card.Text>
                  <b>{cart.price}</b>
                </Card.Text>
                <Button
                  variant='outline-danger'
                  onClick={() =>
                    setCarts(carts.filter((c) => c.id !== cart.id))
                  }
                >
                  Remove from Carts
                </Button>
              </Card.Body>
            </Card>
          )
        })}
      </div>
      <h4 style={{ margin: '1rem 0 0.5rem 0' }}>
        Product:&nbsp;
        <span className='badge bg-success'>
          {carts.length}
          &nbsp;
          {carts.length === 1 ? 'item' : 'items'}
        </span>
        &nbsp;&minus;&nbsp;Total Price:&nbsp;
        <span className='badge bg-success'>
          ${carts.reduce((p, c) => p + c.price, 0).toFixed(2)}
        </span>
      </h4>
      {/* {carts.length > 0 && ( */}
      <button
        className={
          'btn ' +
          (carts.length === 0 ? 'btn-outline-secondary' : 'btn-outline-warning')
        }
        style={{ marginBottom: '0.5rem' }}
        disabled={carts.length === 0}
      >
        <span className='bi bi-credit-card'></span>
        &nbsp;Checkout
      </button>
      {/* )} */}
    </div>
  )
}

export default Carts
