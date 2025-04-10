const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const authRoute = require('./routes/authRoute');
const mongoose = require('mongoose');
const postRoute = require('./routes/postRoute');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

dotenv.config()

app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res ) => {
  res.send("Server is healthy!")
});

app.use('/api/auth', authRoute);
app.use('/api/posts/', postRoute);


// Connect to MongoDB
mongoose.connect(process.env.DB_URL)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log("MongoDB connection error: ", err.message));

module.exports = app;