const express = require('express');
const app = express();
const port = 8887;
const bodyParser = require('body-parser');
var params1;
app.use(bodyParser.json());
app.use((req, res, next) => {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Methods",
"PUT, PATCH, DELETE");
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
next();
})
app.listen(port, () => console.log(`Server running at localhost: ${port}!`))

app.post('/insertdb', (req, res, next) => { 
    var params = '';   
   
const input = req.body.params; 
const params1 = input.dn;
const params2 = input.dcn;
console.log(params2)
const mongoose = require ('mongoose');
const DataBase = `mongodb://localhost:27017/${params1}`;
console.log("av")
const roomSchema = new mongoose.Schema({
    cid: Number,
    date: String,
    cname: String,
    cad: String,
    cem: String,
    room: [{ desc1: String,
        length1: Number,
        width1: Number,
        color4: String,
        typeP: String,}]
    
}, {collection: params2});
const roomtest = mongoose.model(`${params2}`, roomSchema);
mongoose.connect(DataBase,
{useNewUrlParser: true, useUnifiedTopology: true} );
const db = mongoose.connection;
db.on('error', (err) => { console.log(err); })
db.once('open', () => {
    console.log('Test')


    app.post('/insert', (req, res) => {
        let input = req.body.params;
        roomtest.create(input)
        .then(
        result => {
        res.send({"message": 'Record added'});
        },
        err => { res.send(err.message); } )
        .catch( err => { console.log(err); } );
        });


        app.put('/update', (req, res) => {
            let   input = req.body.params;
               var key = {cid: input.cid}
               console.log(key)
               var in3 =  {$set:{  
                cname: input.cname,
                cad: input.cad,
                cem: input.cem,
                room: input.room,
                }}
             console.log(input.room)
                roomtest.updateOne(key, in3 )
                .then(
                result => {
                console.log("true")
                res.send(result);
                },
                err => { res.send(err.message); } )
                .catch( err => { console.log(err); } );
                });

  app.get('/retrieve', (req, res) => {
         let  input = req.query;
            
            roomtest.find(input)
            .then(
            result => {
            res.send(result);
            console.log('Swami:'+params1)
            },
            err => { res.send(err.message); } )
            .catch( err => { console.log(err); } );
            });
        
            app.delete('/delete', (req, res) => {
               let input = req.query;
                roomtest.deleteMany(input)
                .then(
                result => {
                
                  res.send({"message": 'Record Removed'});
                
                },
                err => { res.send(err.message); } )
                .catch( err => { console.log(err); } );
                });     

                
             app.delete('/deleteEach', (req, res) => {
                 let input = req.query;
                    console.log(input)
                    roomtest.deleteOne(input) 
                    .then(
                    result => {
                     res.send({"message": 'One Record Deleted'});
                   
             
                    },
                    err => { res.send(err.message); } )
                    .catch( err => { console.log(err); } );
                    });
            
                   
}); 
 
 })

