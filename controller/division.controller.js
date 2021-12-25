var model = require('../model/division.model');

async function list(req,res) {
    try
    {
        let result = await model.getDivision();
        res.send(result);
    }
    catch 
    {
        res.send({
            message:"An error occured, please try again"
        })
    }
    
}

module.exports = {list}