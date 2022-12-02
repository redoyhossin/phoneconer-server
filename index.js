const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
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
    // API Collection

    const productcategoriesCollection = client.db('phonecorner').collection('productcategories');

    const productsCollection = client.db('phonecorner').collection('products');

    const BookingsmodalCollection = client.db('phonecorner').collection('bookedmodal');

    const collectionUser = client.db('phonecorner').collection('saveduser');

    // API Collection

    // jwt verify
    function jwtVerify(req, res, next) {
      const jwtheader = req.headers.authorization;
      if (!jwtheader) {
        return res.status(401).send('Unauthorized')
      }
      const tokes = jwtheader.split(' ')[1];
      jwt.verify(tokes, process.env.ACCESS_TOKEN, function (err, decoded) {
        // console.log(decoded.foo) 
        if (err) {
          return res.status(403).send({ message: 'forbidden access' })
        }
        req.decoded = decoded;
        next();
      })
    }
    // jwt verify


    // productcategories

    app.get('/allproductcategories', async (req, res) => {
      const query = {};
      const cursor = productcategoriesCollection.find(query)
      const result = await cursor.toArray();
      res.send(result);
    })

    // productcategories

    // productdata

    app.get('/allproduct', async (req, res) => {
      const query = {};
      const cursor = productsCollection.find(query)
      const result = await cursor.toArray();
      res.send(result);
    });


    app.get('/allproducts/:id', async (req, res) => {
      const id = req.params.id;
      const query = { product_id: id }
      const catagory_news = productsCollection.find(query)
      const result = await catagory_news.toArray()
      res.send(result)
      console.log(result)
    })


    // app.get('/allproduc/:id', async (req, res) => {
    //   const id = req.params.id;
    //   const query={_id:id}
    //   const catagory_news = productsCollection.find(query)
    //   const result=await catagory_news.ObjectId()
    //   console.log(result);
    //   res.send(result)
    // })


    //   app.get('/produ/:id', (req, res) => {
    //     const id = req.params.id;
    //     const result = productsCollection.find(p=> p._id===id);
    //     console.log(result)
    //     res.send(result)
    //  })

    // productdata

    // Bookingsmodal and get

    app.post('/modalbook', async (req, res) => {
      const booking = req.body;
      const result = await BookingsmodalCollection.insertOne(booking)
      res.send(result);
    })

    app.get('/modalbook', jwtVerify, async (req, res) => {
      const email = req.query.email;
      const decodedmail = req.decoded.email;

      if (email !== decodedmail) {
        return res.status(403).send({ message: 'forbidden access' })
      }
      const query = { email: email }
      const modalbook = await BookingsmodalCollection.find(query).toArray();
      res.send(modalbook);
    });


    // Bookingsmodal and get


    // jwt token
    app.get('/jwttoken', async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const user = await collectionUser.findOne(query);
      if (user) {
        const tokens = jwt.sign({ email }, process.env.ACCESS_TOKEN, { expiresIn: 60 * 60 })
        return res.send({ accessToken: tokens });
      }
      res.status(403).send({ accessToken: '' })
    })

    // jwt token

    // saved user

    app.post('/saveduser', async (req, res) => {
      const user = req.body;
      const result = await collectionUser.insertOne(user)
      res.send(result)
    })

    // saved user


    
    // usersget

    app.get('/alluser', async (req, res) => {
      const query = {};
      const cursor = collectionUser.find(query)
      const result = await cursor.toArray();
      res.send(result);
    });
    // usersget

  }
  finally {

  }
}
phonecorner().catch(console.dir)





app.get('/', (req, res) => {
  res.send('servar12');
});

app.listen(Port, () => {
  console.log('runnin servar12')
});

module.exports = app;


