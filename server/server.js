
const express = require('express');
const app = express();
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const cors = require('cors');

const port = process.env.PORT || 5000;

app.use(express.json({extended:false}));
app.use(bodyParser.urlencoded({
  extended:false
}))
app.use(bodyParser.json());
app.use(cors());


const base_string= "https://images-api.nasa.gov/"

app.get('/search/:query', (req,res)=>{
  console.log('retrieving query');
  console.log(req.params.query);


 fetch(base_string+"search?="+req.params.query, {
    method: "GET",
  })
  .then((res)=>{
    var data = res.json();
    return data;
  })
  .then(function(data){
    console.log(data);
    res.send(data);
  })
})

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));