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

async function deviceCountByDivision(req,res)
{
    try
        {   
            console.log("User want to know count by year on division ",req.params.id)
            let result = await model.getDeviceCountBasedOnYearByDivision(req.params.id)
            res.send(result);
        }
        catch 
        {
            res.send({
                message:"An error occured, please try again"
            })
        }
}

module.exports = {statisticRepairPrice,deviceCountByDivision}