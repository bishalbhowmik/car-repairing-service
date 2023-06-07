const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;
const cors = require('cors');
require('dotenv').config();

//middleware
app.use(cors());
app.use(express.json());


console.log(process.env.DB_USER);
console.log(process.env.DB_PASSWORD) ;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.fgswukf.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

function verifyJwt (req,res,next){
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(401).send({message:'AuthHeader value not found'})
    }
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN, function(err,decoded){
        if(err){
            return res.status(403).send({message:'Error from verify process'})
        }

        
        req.decoded= decoded;
        // console.log(req.decoded);
        next();
    })
}



async function run() {
    try{
        const servicesCollection = client.db('geniusCar').collection('services');
        const ordersCollection = client.db('geniusCar').collection('orders');

        app.get('/services',async(req,res)=>{
            const query ={};
            const cursor = servicesCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        })
        app.get('/services/:id', async(req,res)=>{
            const id= req.params.id;
            const query = {_id: new ObjectId(id)};
            const service = await servicesCollection.findOne(query);
         
            res.send(service); 
        })


        /// json web token

        app.post('/jwt', async(req,res)=>{
            const user = req.body;
            const token = jwt.sign(user, process.env.ACCESS_TOKEN,{expiresIn:'1d'});
            console.log(token);
            res.send({token})

        })

        

        app.get('/orders',verifyJwt, async(req,res)=>{

            const decoded = req.decoded;
            console.log(decoded);
            if(decoded.email !== req.query.email){
                res.status(401).send({message: 'Error from orders'})
            }

            let que ={};
            if(req.query.email){
                que= {
                    email: req.query.email
                }               
            }
            const cursor = ordersCollection.find(que);
            const result = await cursor.toArray();
            
            res.send(result);

        })

        app.post('/orders',async(req,res)=>{
            const userInfo = req.body;
            const result = await ordersCollection.insertOne(userInfo);
            res.send(result);


        })

        app.patch('/orders/:id', async(req,res)=>{
            const id = req.params.id;
            const status = req.body.status;
            const query = {_id: new ObjectId(id)};

            const update = {
                $set :{
                    status:status
                }
            }

            const result = await ordersCollection.updateOne(query,update);
            res.send(result);

        })

        app.delete('/orders/:id',async(req,res)=>{
            const id = req.params.id;
            const query = {_id : new ObjectId(id)};
            const result = await ordersCollection.deleteOne(query);
            res.send(result);
        })
    }
    finally {

    }
}
run().catch(error=>console.log(error));




app.get('/', (req, res) => {
    res.send('Genius Car server is running');
})

app.listen(port, () => {
    console.log('Server is running on port', port);
})