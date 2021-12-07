const express = require('express')
const app = express()
const port = 3000

// routes 
var login = require('./routes/login');

app.use(express.json());
app.use('/login',login);



app.get('/',(req,res) => {

})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
  
})

