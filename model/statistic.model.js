// ms sql queries
var mssql = require('mssql')

var sql_config = require('../sql_server').sql_config;

async function statisticRepairPriceYear()
{
    console.log('User get spoiled device list');
    
    
    try {
        await mssql.connect(sql_config);
        const result = await mssql.query`
        select year(repair_date) as year ,sum(sum_money) as repair_price from Repair_bill GROUP BY year(repair_date)`;
        
        const list = result.recordset;
        console.log(list);
        return list;
        
    }
    catch {
        return {
            message:'Connection Error'
        }
    }
}

module.exports = {statisticRepairPriceYear}