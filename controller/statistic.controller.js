var model = require('../model/statistic.model');


async function statisticRepairPrice(req,res) {
    try
    {
        let result = await model.statisticRepairPriceYear();
        res.send(result);
    }
    catch 
    {
        res.send({
            message:"An error occured, please try again"
        })
    }
    
}

module.exports = {statisticRepairPrice}