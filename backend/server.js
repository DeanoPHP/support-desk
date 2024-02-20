const express = require('express');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 3001;
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db')
const colors = require('colors')

const user = require('./routes/userRoutes');

// Connect to DB
connectDB()
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    msg: 'Welcome to the support desk',
  });
});

app.use('/api/v1/users', user);
app.use(errorHandler);

app.listen(PORT, () => console.log(`You are listening on port ${PORT}`));
