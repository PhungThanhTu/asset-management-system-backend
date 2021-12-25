var model = require('../model/unit.model');

async function list(req,res) {
    try
    {
        let result = await model.getUnit();
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