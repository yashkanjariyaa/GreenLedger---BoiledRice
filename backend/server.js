const express = require('express');
const app = express();
require('dotenv').config();
const connectDatabase = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');

app.use(cors());
app.get('/', (req, res) => {
  res.send('Hello World!');
});

connectDatabase()
app.use('/api/auth', authRoutes);
app.use('/api', userRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});