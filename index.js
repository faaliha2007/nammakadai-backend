
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());


const MONGO_URI = "mongodb+srv://faaliha2007_db_user:faali123@nammakadaicluster.rmf01aw.mongodb.net/nammaKadaiNew?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI)
  .then(() => console.log("DB connected..."))
  .catch(err => console.log("DB connection error:", err));

const Drink = mongoose.model("Drink", {
  name: String,
  price: Number,
  type: String,
  keywords: [String],
  available: { type: Boolean, default: true }
}, "drinks");


app.get("/menu", async (req, res) => {
  try {
    const drinks = await Drink.find();
    res.json(drinks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.post("/order", (req, res) => {
  console.log("Order received:", req.body);
  res.json({ message: `Order for ${req.body.name} received! ✅` });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
