const express = require("express");
const router = express.Router();
const Trainseats = require("../models/seatrev");



router.post("/trains/seats", async (req, res) => {
  const { trainId, trainnm, fromlocation,tolocation,datearrived,dateleave,passengers,statustrain,BookingNo,seatno,Price} = req.body;
 
  const trainseatssch = new Trainseats({
    trainId,
    trainnm,
  fromlocation,
  tolocation,
  datearrived,
  dateleave,
  passengers,
  statustrain,
  BookingNo,
  seatno,
  Price
  });

  try {
    const trainseats = await trainseatssch.save();
    res.status(201).json(trainseats);
  } catch (error) {
    res.status(500).json({ message: "Error saving location", error });
  }
});

router.get('/trains/seats', async (req, res) => {
    try {
      const seats = await Trainseats.find(); // Use the User model to query user data
      res.json(seats);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  });
  router.post('/train/searchseats', async (req, res) => {
    const { fromlocation,tolocation,datearrived,passengers} = req.body;

    // Build a query object based on the parameters
    let query = {
        fromlocation,
  tolocation,
  datearrived,
  passengers,
  
    };

    if (fromlocation) query.fromlocation = { $regex: new RegExp(fromlocation, 'i') };
    if (tolocation) query.tolocation = { $regex: new RegExp(tolocation, 'i') };
   
  if (passengers) query.passengers = Number(passengers);
    if (datearrived) {
        // Convert datearrived to a Date object
        const dateArrived = new Date(datearrived);
        
        // Check if the date is valid
        if (!isNaN(dateArrived.getTime())) {
            query.datearrived = { $gte: dateArrived };
        } else {
            return res.status(400).send('Invalid date format');
        }
    }

    try {
        const items = await Trainseats.find(query);
        console.log(items);
        res.json(items);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Server error');
    }
});







module.exports = router;
