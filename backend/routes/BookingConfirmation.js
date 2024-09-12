const express = require("express");
const router = express.Router();
const Trainseats = require("../models/seatrev");
const Booking = require('../models/Bookconf'); // Ensure the path is correct


router.post("/trains/Bookingseats", async (req, res) => {
    const {
      customerName,
      trainName,
      fromLocation,
      toLocation,
      dateArrived,
      seatNo,
      bookingNo,
      Price,
      status,
      dateToLeave,
      nic,
      email,
       age ,
       gender
    } = req.body;
  
    try {
      const newBooking = new Booking({
        customerName,
        trainName,
        fromLocation,
        toLocation,
        dateArrived,
        seatNo,
        bookingNo,
        Price,
        status,
        dateToLeave,
        nic,
         email,
          age ,
          gender
      
      });
  
      const savedBooking = await newBooking.save();
      res.status(201).json(savedBooking);
    } catch (error) {
      console.log('Error creating booking:', {
        message: error.message,
        stack: error.stack,
        name: error.name,
      }); // Log detailed error information
      res.status(500).json({ message: 'Error creating booking', error: error.message });
    }
  });
  module.exports = router;