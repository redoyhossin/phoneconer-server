const express = require('express');
const cors = require('cors');
const app = express();
const Port = process.env.Port || 5000;



// medleware set
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send('servar assignment 12');
});

app.listen(Port, () => {
  console.log('runnin servar assignment 12')
});

module.exports = app;


