var mssql = require('mssql')
var sql_config = require('../sql_server').sql_config;


async function startInventory(inventory)
{
    let final_result;
    let  pool = await mssql.connect(sql_config);
    let request = await pool.request()
    .input('inventory',mssql.NVarChar,JSON.stringify(inventory))
    .query("declare @check_detail nvarchar(max) \
    select @check_detail = JSON_QUERY(@inventory,'$.check_detail') \
     \
    \
    EXEC checkDeviceStatus @check = @check_detail \
    \
    \
    declare @curr_check_id int \
     \
    select @curr_check_id = IDENT_CURRENT('Check_log') \
     \
    insert into Inventory values (@curr_check_id) \
     \
    declare @curr_inv_id int \
    select @curr_inv_id  = IDENT_CURRENT('Inventory') \
     \
    insert into Detailed_Inventory_Personnel (inventory,personnel) \
        select @curr_inv_id as inventory,id as personnel from openjson(@inventory,'$.personnel') with \
    ( \
        id int '$.id' \
    )").then((result) =>
    {   
        console.log("Result :");
        console.log(result);
        console.log("Rows affected :");
        console.log(result.rowsAffected);
        final_result = result.rowsAffected;
    });

    return final_result.reduce((sum,element) => sum + element);
}

async function getInventoryList()
{
    console.log('User get inventory list');
    
    
    try {
        await mssql.connect(sql_config);
        const result = await mssql.query`select Inventory.id, check_date as inventory_date from Inventory, Check_log where Inventory.check_log = Check_log.id`;   
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

async function getInventoryDeviceDetail(id)
{
    console.log('User inventory device detail ', id);
    
    
    let final_result;
    let  pool = await mssql.connect(sql_config);
    let request = await pool.request()
    .input('id',mssql.Int,id)
    .query('select device as id,name,Check_log_detail.division,Check_log_detail.status,Check_log_detail.current_value from Check_log_detail,Devices,Inventory where Devices.id = Check_log_detail.device and  Inventory.check_log = Check_log_detail.check_log_id and Inventory.id = @id \
    ').then((result) =>
    {   
        
        final_result = result;
    });
    return final_result.recordset;
}

async function getInventoryPersonnel(id)
{
    console.log('User inventory personnel detail ', id);
    
    
    let final_result;
    let  pool = await mssql.connect(sql_config);
    let request = await pool.request()
    .input('id',mssql.Int,id)
    .query('select Personnel.id as id,Personnel.name, position, Division.name as division from Detailed_Inventory_Personnel,Personnel,Division where personnel = Personnel.id and Division.id = Personnel.division and Detailed_Inventory_Personnel.inventory = @id \
    ').then((result) =>
    {   
        
        final_result = result;
    });
    return final_result.recordset;
}

module.exports = {startInventory,getInventoryDeviceDetail,getInventoryPersonnel,getInventoryList}