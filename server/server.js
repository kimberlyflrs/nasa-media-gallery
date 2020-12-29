
const express = require('express');
const app = express();
const fetch = require('node-fetch');

const port = process.env.PORT || 5000;

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

const base_string= "https://images-api.nasa.gov/"

app.get('/query', (req,res)=>{
  console.log('retrieving query');
  console.log(req.query);
  /*fetch(base_string+"search?="+req.query, {
    method: "GET",
  })
  .then((res)=>{
    var data = res.json();
    return data;
  })
  .then(function(data){
    console.log(data);
    res.send(data);
  })*/
})

