const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.log('MongoDB error:', err));

app.use('/api/auth', require('./routes/auth'));

app.get('/', (req, res) => {
  res.send('✅ Timer Backend is running!');
});

app.listen(5000, () => {
  console.log('🚀 Server running on http://localhost:5000');
});
