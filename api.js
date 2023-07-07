const express = require('express');
require('./config');
const dbConnect = require('./mongodb');
const mongodb = require('mongodb');
const app = express();
const book = require('./book');

app.use(express.json()); //json format a data post kortasi postman theke tai
//express 4.6 er age body parser use korte hoito kintu ekhon express.jon use kora hoy
//(***)req accept korar jonne express.jon or bodyParser duitar ekta use korley hoilo

app.get("/library",async (req,resp)=>{
    let data = await dbConnect();
    data = await data.find().toArray();
    resp.send(data)
});

app.get("/book/:name",async (req,resp)=>{ //books get by name
    let data = await book.find(
        {
            "$or":[
                {"name":{$regex:req.params.name}},
            ]
        }
    )
    resp.send(data);

})

app.get("/book/:id",(req,res)=>{ //books get by id
    book.findById(req.params.id)
    .then(result=>{
        res.status(200).json({
            book:result
        })
    })
})

app.post('/',async (req,resp)=>{
    let data = await dbConnect();
    let result = await data.insertOne(req.body);

    resp.send(result);
});

app.put('/:name',async(req,resp)=>{ // name copy kore postman er query te dile oi ta update hbe 
    let data = await dbConnect();
    let result = data.updateOne(
        {name:req.params.name},
        {$set:req.body}
    )
    resp.send({result:"updated"});
});

app.delete("/:id",async(req,resp)=>{ // id copy kore postman er queary te dile dlt hoye jabe
    const data = await dbConnect();
    const result = data.deleteOne({_id: new mongodb.ObjectId(req.params.id)})
    resp.send(result)
})

app.listen(3000);