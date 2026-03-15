// index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://faaliha2007_db_user:faali123@nammakadaicluster.rmf01aw.mongodb.net/nammaKadaiNew?retryWrites=true&w=majority")
  .then(() => console.log("DB connected..."))
  .catch(err => console.log("DB connection error:", err));

// Mongoose model for drinks
const Drinks = mongoose.model(
  "Drink",
  {
    name: String,
    price: Number,
    type: String,
    keywords: [String],
    available: { type: Boolean, default: true }
  },
  "drinks"
);

// Route: GET /menu
app.get("/menu", async (req, res) => {
  try {
    const drinks = await Drinks.find();
    console.log("Fetched from DB:", drinks);
    res.json(drinks);
  } catch (err) {
    console.log("Error fetching menu:", err);
    res.status(500).send(err.message);
  }
});

// Route: POST /order
app.post("/order", (req, res) => {
  console.log("Order received:", req.body);
  res.send({ message: `Order for ${req.body.name} received! ✅` });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));