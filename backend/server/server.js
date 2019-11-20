/* eslint-disable no-console */
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
const port = 3001;

const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017/mydb';

// middleware to connect MongoDB
const connectDb = async (req, res, next) => {
  try {
    const client = await MongoClient.connect(url);
    res.locals.db = client.db('mydb');
    next();
  } catch (error) {
    console.log('db error', error);
  }
};

app.get('/', connectDb, async (req, res) => {
  const { year = null, recclass = null } = req.query;
  try {
    const dbo = res.locals.db;
    let records = null;
    const collection = await dbo.collection('meoteorites');
    if (year) {
      // convert string year into same format with year in db
      const convertedYear = new Date(Date.parse(year)).toISOString().replace('Z', '');
      records = await collection.find({ year: convertedYear }).toArray();
    } else if (recclass) {
      records = await collection.find({ recclass }).toArray();
    }
    res.send(records);
  } catch (error) {
    console.log('error', error);
  }
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));
