const mongoose = require('mongoose');

const trainBook = new mongoose.Schema({
  customerName: { type: String, required: true },
  trainName: { type: String, required: true },
  fromLocation: { type: String, required: true },
  toLocation: { type: String, required: true },
  dateArrived: { type: Date, required: true },
  seatNo: { type: String, required: true },
  bookingNo: { type: String, required: true },
  Price: { type: String, required: true }, // Notice 'Price' vs. 'price'
  status: { type: String, required: true },
  dateToLeave: { type: Date, required: true },
  nic: { type: String, required: true },
  email: { type: String, required: true },
  age : { type: String, required: true },
  gender: { type: String, required: true }
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

const trainseatsd = mongoose.model('Booking', trainBook);

module.exports = trainseatsd;
