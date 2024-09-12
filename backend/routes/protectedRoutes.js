const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

// Example of a protected route
// Example of a protected route
router.get("/protected-data", authMiddleware, (req, res) => {
  res.json({
    message: "This is protected data, only accessible with a valid token.",
  });
});

module.exports = router;
