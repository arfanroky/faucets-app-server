require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8000;

// routes
const authorityRouter = require('./routes/authority.js');
const walletRouter = require('./routes/wallet.js');
const peopleRouter = require('./routes/peopleRoute');

// database connection
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connection Successfully'))
  .catch((err) => console.log(err));


//Middleware
app.use(express.json());
app.use(cors());


// api
app.use('/authority', authorityRouter);
app.use('/wallet',cors() ,walletRouter);
app.use('/people', peopleRouter);
// app.use('/people', peopleRouter);


app.get('/', (req, res) => {
  res.send('faucets server')
})


app.listen(port, () => console.log('Listening on the port', port));
