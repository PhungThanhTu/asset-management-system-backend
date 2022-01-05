var mssql = require('mssql')
var sql_config = require('../sql_server').sql_config;


async function listSpoiledDevice()
{
    console.log('User get spoiled device list');
    
    
    try {
        await mssql.connect(sql_config);
        const result = await mssql.query`
        select id,name,specification,status from Devices where status = 'Spoiled'`;
        
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

async function getRepairList()
{
    console.log('User get repair list');
    
    
    try {
        await mssql.connect(sql_config);
        const result = await mssql.query`select Repair_bill.id, Repairer.name as repairer,repair_date,sum_money as total_bill from Repair_bill,Repairer where Repair_bill.repairer = Repairer.id`;   
        const list = result.recordset;
        console.log(list);
        return list;

        
    }
    catch {
        return {
            message:'Error Occured, please try again'
        }
    }
}

async function getRepairDetailById(id)
{
    console.log('User inventory device detail ', id);
    
    
    let final_result;
    let  pool = await mssql.connect(sql_config);
    let request = await pool.request()
    .input('id',mssql.Int,id)
    .query('select bill,Devices.id,name,Devices.specification, Repair_bill_detail.price as repair_price from Repair_bill_detail,Devices where Devices.id = Repair_bill_detail.device and Repair_bill_detail.bill = @id \
    ').then((result) =>
    {   
        
        final_result = result;
    });
    return final_result.recordset;
}

async function repairDevices(repair)
{
    let final_result;
    let  pool = await mssql.connect(sql_config);
    let request = await pool.request()
    .input('repair_value',mssql.NVarChar,JSON.stringify(repair))
    .query("EXEC repair_device @repair = @repair_value").then((result) =>
    {   
        console.log("Result :");
        console.log(result);
        console.log("Rows affected :");
        console.log(result.rowsAffected);
        final_result = result.rowsAffected;
    });

    return final_result.reduce((sum,element) => sum + element);
}


module.exports = {listSpoiledDevice,getRepairList,getRepairDetailById,repairDevices}