
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://news_user:jgZYG12La5ts1aFy@cluster0.uhtrr.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run(req,res) {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const newsCollection=client.db("news_portal").collection("news");
    if(req.method==="GET")
    {
        const news=await newsCollection.find({}).toArray();
        res.send({messege:"success", status:200,data:news})
    }
    if(req.method==="POST")
    {
        const news=req.body;
        const result=await newsCollection.insertOne(news)
        res.send(result)
    }
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
export default run;
