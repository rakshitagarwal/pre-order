const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { mongoose } = require("mongoose");
const allRoutes = require('./routes/index.js');

const PORT = process.env.PORT || 4000; 

const app = express();

app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

mongoose.connect(process.env.MONGO_URL);

app.use(allRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});