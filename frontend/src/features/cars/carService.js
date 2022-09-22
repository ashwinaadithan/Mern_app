import axios from 'axios'

const API_URL = '/api/cars/'

// Create new car
const createCar = async (carData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, carData, config)

  return response.data
}

// Get user cars
const getCars = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

// Delete user car
const deleteCar = async (carId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + carId, config)

  return response.data
}

const carService = {
  createCar,
  getCars,
  deleteCar,
}

export default carService
