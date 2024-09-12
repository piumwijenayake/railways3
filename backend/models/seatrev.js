const mongoose = require("mongoose");

const trainLocationSchema = new mongoose.Schema({
  trainId: { type: String, required: true },
  trainnm: { type: String, required: true },
  fromlocation: { type: String, required: true },
  tolocation: { type: String, required: true },
  datearrived: { type: Date, required: true},
  dateleave: { type: Date, required: true},
  passengers: { type: Number, required: true},
  statustrain: { type: String, required: true },
  BookingNo: { type: String, required: true },
  seatno: { type: String, required: true },
  Price: { type: String, required: true }

});

const trainseatsd = mongoose.model("trainseats", trainLocationSchema);

module.exports = trainseatsd;