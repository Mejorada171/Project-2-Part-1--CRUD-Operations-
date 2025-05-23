require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('Hello! Your server is working.');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(port, () => {
      console.log(`🚀 Server running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error);
  });


const specs = swaggerJsdoc({
  definition: { openapi: '3.0.0', info: { title: 'CRUD API', version: '1.0.0' } },
  apis: ['./routes/*.js']   // <-- JSDoc comments live here
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
