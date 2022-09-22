const express = require('express')
const multer = require('multer')
const router = express.Router()
const {
  getCars,
  setCar,
  updateCar,
  deleteCar,
} = require('../controllers/carController')


/* const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./frontend/public/uploads/")
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname)
  }
})

const upload = multer */

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getCars).post(protect, setCar)
router.route('/:id').delete(protect, deleteCar).put(protect, updateCar)

module.exports = router
