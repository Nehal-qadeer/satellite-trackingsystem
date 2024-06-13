require('dotenv').config();
const redis = require('redis');
const express = require('express');
const mongoose = require('mongoose');
const Satellite = require('./models/Satellite');
const cors = require('cors'); // Import the cors package

const app = express();
const port = 3001;
// Enable CORS for all routes
app.use(cors());
// Create Redis client
const client = redis.createClient({
  password: 'ULpXSi6mbA8NKVzH2PLARURIeE7ts1tL',
  socket: {
    host: 'redis-18031.c10.us-east-1-4.ec2.redns.redis-cloud.com',
    port: 18031
  }
});

// Connect to Redis
client.connect()
  .then(() => {
    console.log('Connected to Redis');
  })
  .catch(err => {
    console.error('Could not connect to Redis:', err);
  });

// Replace the following with your MongoDB connection string
const uri = process.env.MONGODB_URI

mongoose.connect(uri)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.get('/api/latest-data', async (req, res) => {
  try {
    // Fetch the last three elements from the list
    const lastThreeData = await client.lRange('settlelite', -3, -1);
    
    if (lastThreeData && lastThreeData.length > 0) {
      const parsedObjects = lastThreeData.map(item => JSON.parse(item));
      parsedObjects.sort((a, b) => a.name.localeCompare(b.name));
      console.log('Last Three Objects:', parsedObjects);
     
    res.json(parsedObjects);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port,'0.0.0.0', () => {
  console.log(`Server running at http://localhost:${port}/`);
});
