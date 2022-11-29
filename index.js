const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
require('dotenv').config();
const Port = process.env.Port || 5000;



// medleware set
app.use(cors());
app.use(express.json());








const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.j9rm2ly.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function phonecorner() {
  try {
   


  }
  finally {
    
  }
}
phonecorner().catch(console.dir)





app.get('/', (req, res) => {
  res.send('servar assignment 12');
});

app.listen(Port, () => {
  console.log('runnin servar assignment 12')
});

module.exports = app;


