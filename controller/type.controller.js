var model = require('../model/type.model');

async function list(req,res) {
    try
    {
        let result = await model.getType();
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