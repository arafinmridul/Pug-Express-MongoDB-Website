const express = require("express");
const app = express();
const path = require("path");
const port = 8000;

//EXPRESS SPECIFIC STUFF
//app.use(express.static('static', options)); //reference, express api reference
app.use('/static', express.static('static')); //now loading files from public directory
app.use(express.urlencoded()); //parses incoming requests with urlencoded payloads and is based on body-parser

//PUG SPECIFIC STUFF
app.set('views', path.join(__dirname, 'views')); //setting the 'views' directory to get pug file
app.set('view engine', 'pug'); //using the Pug template engine

//ENDPOINTS
app.get('/', (req, res)=>{
    const params = {};
    res.status(200).render('home.pug', params);
});
app.get('/contact', (req, res)=>{
    const params = {};
    res.status(200).render('contact.pug', params);
});

//SERVER
app.listen(port, ()=>{
    console.log("server started on 8000 port");
} )