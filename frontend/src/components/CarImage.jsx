import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createCar } from '../features/cars/carSlice'

function CarImage() {
  const [file, setFile] = useState('')

  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(createCar({ file }))
    setFile('')

  const formData = new FormData();

  formData.append("carImage", file);
  }

  return (
    <section className='form'>
      <form onSubmit={onSubmit} encType="multipart/form-data">
        <div className='form-group'>
          <label htmlFor='file'>Car Image</label>
          <input
            type='file'
            name='carImage'
            id='file'
            value={file}
            onChange={(e) => setFile(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <button className='btn btn-block' type='submit'>
            Add Image
          </button>
        </div>
      </form>
    </section>
  )
}

export default CarImage
