const express = require('express');
const app = express();
app.use(express.json()); 
require('dotenv').config();
const connectDatabase = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userDataRoutes = require('./routes/userdataRoutes');
const sendCrypto = require('./controllers/faucet/sendCryptoController');
const cors = require('cors');

app.use(cors());
app.get('/', (req, res) => {
  res.send('Hello World!');
});

connectDatabase()
app.use('/api/auth', authRoutes);
app.use('/api/user', userDataRoutes);
app.post('/api/sendCBC', sendCrypto);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});