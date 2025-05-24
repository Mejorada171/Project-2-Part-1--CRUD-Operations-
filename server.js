require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const countryRoutes = require('./routes/countries');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err.message));

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Countries API');
});

app.use('/api/countries', countryRoutes);

app.use((err, _, res, __) => {          // global error handler
  res.status(err.status || 500).json({ message: err.message });
});

app.listen(process.env.PORT, () =>
  console.log(`API running on http://localhost:${process.env.PORT}`)
);
