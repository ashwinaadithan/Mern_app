import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createCar } from '../features/cars/carSlice'

function CarForm() {
  const [text, setText] = useState('')
  const [file, setFile] = useState('')

  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(createCar({ text, file }))
    setText('')
    setFile('')
  }

  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='text'>Car</label>
          <input
            type='text'
            name='text'
            id='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <label htmlFor='file'>Car Image</label>
          <input
            type='file'
            name='photo'
            accept='.png, .jpg, .jpeg'
            id='file'
            value={file}
            onChange={(e) => setFile(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <button className='btn btn-block' type='submit'>
            Add Car
          </button>
        </div>
      </form>
    </section>
  )
}

export default CarForm
