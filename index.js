require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');

//Middleware
app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.zxhv2tb.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const run = async () => {
  try {
    await client.connect();
    const userDataCollection = client.db('faucets_app').collection('users');

    app.put('/user/:email', async (req, res) => {
      const email = req.params.email;
      const userInfo = req.body;
      console.log(userInfo);
      const filter = { email: email };
      const options = { upsert: true };
      const doc = { $set: userInfo };

      const result = await userDataCollection.updateOne(filter, doc, options);
      res.send({ message: 'Successfully created ', result });
    });
  } catch (error) {
    console.log(error);
  }
};

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello from server');
});

app.listen(port, () => console.log('Listening on the port', port));
