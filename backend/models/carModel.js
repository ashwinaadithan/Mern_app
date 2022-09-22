const mongoose = require('mongoose')

const carSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    text: {
      type: String,
      required: [true, 'Please add a text value'],
    },
    Image: {
      img: 
        { data: Buffer, contentType: String }
    }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Car', carSchema)
