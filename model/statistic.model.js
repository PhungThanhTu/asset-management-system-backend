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


async function getDeviceCountBasedOnYearByDivision(id)
{
    console.log('User get division statistics about device count on year ', id);
    
    
    let final_result;
    let  pool = await mssql.connect(sql_config);
    let request = await pool.request()
    .input('division',mssql.Int,id)
    .query('select avg(count_table.count_device) as count, year(count_table.check_date) as year from ( select count(*) as count_device, Inventory.id, Check_log.check_date from Inventory, Check_log, Check_log_detail where Inventory.check_log = Check_log.id and Check_log.id = Check_log_detail.check_log_id  and Check_log_detail.division = @division and Check_log_detail.status not in(\'Liquidated\',\'Lost\',\'Transfered Outside\') group by Inventory.id,Check_log.id, check_date ) count_table group by year(check_date)').then((result) =>
    {   
        
        final_result = result;
    });
    return final_result.recordset;
}

module.exports = {statisticRepairPriceYear,getDeviceCountBasedOnYearByDivision}