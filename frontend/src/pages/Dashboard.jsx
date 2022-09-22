import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import CarImage from '../components/CarImage'
import CarForm from '../components/CarForm'
import CarItem from '../components/CarItem'
import Spinner from '../components/Spinner'
import { getCars, reset } from '../features/cars/carSlice'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { cars, isLoading, isError, message } = useSelector(
    (state) => state.cars
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getCars())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  		
  if (isLoading) {
    return <Spinner />
  }


  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>Cars Dashboard</p>
      </section>

      <CarForm />
      
      <section className='content'>
        {cars.length > 0 ? (
          <div className='cars'>
            {cars.map((car) => (
              <CarItem key={car._id} car={car} />
            ))}
          </div>
        ) : (
          <h3>You haven't added any cars</h3>
        )}
      </section>
    </>
  )
}

export default Dashboard
