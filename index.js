const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected..."))
  .catch(err => console.log("DB connection error:", err));

const Drinks = mongoose.model("Drink", {
  name: String,
  price: Number,
  type: String,
  keywords: [String],
  available: { type: Boolean, default: true }
}, "drinks");


app.get("/menu", async (req, res) => {
  try {
    const drinks = await Drinks.find();
    console.log("Fetched from DB:", drinks);
    res.json(drinks);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post("/order", (req, res) => {
  console.log("Order received:", req.body);
  res.send("Order received! ✅");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));