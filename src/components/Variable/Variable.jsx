import './Variable.css'

function Variable({ type, name, value, setValue }) {
  return (
    <div className='variable-container'>
      <h3 className='variable-title'>{name || 'COUNTER'}</h3>
      <button className='btn btn-danger' onClick={() => setValue(value - 1)}>
        <span className='bi bi-dash'></span>
      </button>
      <span className='variable-value'>
        {type && type === 'int' ? value : Number(value).toFixed(2)}
      </span>
      <button className='btn btn-success' onClick={() => setValue(value + 1)}>
        <span className='bi bi-plus'></span>
      </button>
    </div>
  )
}

export default Variable
