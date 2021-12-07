const express = require('express')
const app = express()
const port = 3000

var mysql = require('./db_config')

app.use(express.json())



app.get('/', (req, res) => {
  
  console.log(req.body);
  res.json(sampleJsonData);
})

app.post('/login/',(req,res) => {
    var reqbody = req.body;
    console.log(reqbody);
    if(reqbody.username == 'admin' && reqbody.password == "admin")
      res.send(successMessage);
    else
      res.send(failMessage);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
  
})

