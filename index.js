require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8000;

// routes
const authorityRouter = require('./routes/authority.js');
const walletRouter = require('./routes/wallet.js');
const signUpRouter = require('./routes/peopleRoute');


// database connection
mongoose
  .connect("mongodb://localhost/faucets", {
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
app.use('/wallet', walletRouter);
app.use('/people', signUpRouter);


app.get('/', (req, res) => {
  res.send('faucets server')
})


app.listen(port, () => console.log('Listening on the port', port));
