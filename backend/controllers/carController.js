const asyncHandler = require('express-async-handler');
const { path } = require('express/lib/application');
const multer = require('multer')
const { v4: uuidv4 } = require('uuid');
const Car = require('../models/carModel')
const User = require('../models/userModel')

/* const storage = mutler.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'images');
  },
  filename: function(req, file, cb) {
    cb(null, uuidv4() + '_' + Date.now() + path.extname(file.originalname));
  }
})

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if(allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

let upload = mutler({storage, fileFilter}); */

// @desc    Get cars
// @route   GET /api/cars
// @access  Private
const getCars = asyncHandler(async (req, res) => {
  const cars = await Car.find({ user: req.user.id })

  res.status(200).json(cars)
})

// @desc    Set car
// @route   POST /api/cars
// @access  Private
const setCar = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('Please add a text field')
  }

  const car = await Car.create({
    text: req.body.text,
    user: req.user.id,
  })

  res.status(200).json(car)
})

// @desc    Update car
// @route   PUT /api/cars/:id
// @access  Private
const updateCar = asyncHandler(async (req, res) => {
  const car = await Car.findById(req.params.id)

  if (!car) {
    res.status(400)
    throw new Error('Car not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the car user
  if (car.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedCar)
})

// @desc    Delete car
// @route   DELETE /api/cars/:id
// @access  Private
const deleteCar = asyncHandler(async (req, res) => {
  const car = await Car.findById(req.params.id)

  if (!car) {
    res.status(400)
    throw new Error('Car not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the car user
  if (car.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await car.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getCars,
  setCar,
  updateCar,
  deleteCar,
}
