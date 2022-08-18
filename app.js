const express = require("express");
const app = express();
const path = require("path");
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://localhost:27017/danceWeb');
}
//SCHEMA
const formSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    passion: String
  });

const forms = mongoose.model('contforms', formSchema);


//EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static'));
app.use(express.urlencoded()); //parses incoming requests

//PUG SPECIFIC STUFF
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//ENDPOINTS
app.get('/', (req, res)=>{
    const params = {};
    res.status(200).render('home.pug', params);
});
app.get('/contact', (req, res)=>{
    const params = {};
    res.status(200).render('contact.pug', params);
});

app.post('/contact', (req, res)=>{
    const myData = new forms(req.body);
    myData.save().then(()=>{
        res.send("this item has been saved in the database");
    }).catch(()=>{
        res.status(400).send("Item was not saved in the database");
    });
});

//SERVER
const port = 8000;
app.listen(port, ()=>{
    console.log("server started on 8000 port");
} )