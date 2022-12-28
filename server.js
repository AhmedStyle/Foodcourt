const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('Connected to the Mongodb server'))
  .catch((err) => {
    console.log(err);
  });

// not finished all routes in the main server

app.use(express.json());
app.use('/api/users', require('./routes/users'));
app.use('/api/register', require('./routes/register'));
app.use('/api/auth', require('./routes/auth'));
// app.use("/api/restaurants", require("./routes/restaurant"));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
