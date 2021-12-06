const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

const sampleJsonData = [
    {
        username:'admin',
        password:'admin',
    }
]

app.get('/', (req, res) => {
  
  console.log(req.body);
  res.json(sampleJsonData);
})

app.post('/',(req,res) => {
    console.log(req.body);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})