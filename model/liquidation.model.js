var mssql = require('mssql')
var sql_config = require('../sql_server').sql_config;


async function listNeedLiquidatingDeviceByDivision(id)
{
    console.log('User get device list based on holding division id ', id);
    
    
    let final_result;
    let  pool = await mssql.connect(sql_config);
    let request = await pool.request()
    .input('id',mssql.Int,id)
    .query("select id,name,specification,price,status,current_value from Devices where holding_division = @id and Devices.status in ('Need Liquidating')").then((result) =>
    {    
        final_result = result;
    });
    return final_result.recordset;
}

async function startLiquidation(liquidation)
{
    let final_result;
    let  pool = await mssql.connect(sql_config);
    let request = await pool.request()
    .input('liquidation',mssql.NVarChar,JSON.stringify(liquidation))
    .query("declare @check_detail nvarchar(max) \
    select @check_detail = JSON_QUERY(@liquidation,'$.check_detail') \
      \
     \
    EXEC checkDeviceStatus @check = @check_detail \
     \
     \
    declare @curr_check_id int \
     \
    select @curr_check_id = IDENT_CURRENT('Check_log') \
    \
    insert into Liquidation values (@curr_check_id) \
    \
    declare @curr_liq_id int \
    select @curr_liq_id  = IDENT_CURRENT('Liquidation') \
    \
    insert into Detailed_liquidation_personnel (liquidation,personnel) \
        select @curr_liq_id as liquidation,id as personnel from openjson(@liquidation,'$.personnel') with \
    ( \
        id int '$.id' \
    ) \
    ").then((result) =>
    {   
        console.log("Result :");
        console.log(result);
        console.log("Rows affected :");
        console.log(result.rowsAffected);
        final_result = result.rowsAffected;
    });

    return final_result.reduce((sum,element) => sum + element);
}

async function getLiquidationList()
{
    console.log('User get inventory list');
    
    
    try {
        await mssql.connect(sql_config);
        const result = await mssql.query`select Liquidation.id, check_date as liquidation_date from Liquidation, Check_log where Liquidation.check_log = Check_log.id`;   
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

async function getLiquidationDeviceDetail(id)
{
    console.log('User liquidation device detail ', id);
    
    
    let final_result;
    let  pool = await mssql.connect(sql_config);
    let request = await pool.request()
    .input('id',mssql.Int,id)
    .query('select device as id,Devices.name,Division.name as division,Check_log_detail.status,Check_log_detail.current_value from Check_log_detail,Devices,Liquidation,Division where Division.id = Check_log_detail.division and Devices.id = Check_log_detail.device and  Liquidation.check_log = Check_log_detail.check_log_id and Liquidation.id = @id \
    ').then((result) =>
    {   
        
        final_result = result;
    });
    return final_result.recordset;
}

async function getLiquidationPersonnel(id)
{
    console.log('User liquidation personnel detail ', id);
    
    
    let final_result;
    let  pool = await mssql.connect(sql_config);
    let request = await pool.request()
    .input('id',mssql.Int,id)
    .query('select Personnel.id as id,Personnel.name, position, Division.name as division from Detailed_liquidation_personnel,Personnel,Division where personnel = Personnel.id and Division.id = Personnel.division and Detailed_liquidation_personnel.liquidation = @id \
    ').then((result) =>
    {   
        
        final_result = result;
    });
    return final_result.recordset;
}

async function getLiquidationYear()
{
    console.log('User get inventory list');
    
    
    try {
        await mssql.connect(sql_config);
        const result = await mssql.query`select distinct year(check_date) as year from Liquidation, Check_log where Liquidation.check_log = Check_log.id`;   
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

async function getLiquidationListByYear(year)
{
    console.log('User list liquidation devices by year ', year);
    
    
    let final_result;
    let  pool = await mssql.connect(sql_config);
    let request = await pool.request()
    .input('year',mssql.Int,year)
    .query('select device as id,Devices.name,Division.name as division,Check_log_detail.status,Check_log_detail.current_value from Check_log_detail,Devices,Liquidation,Check_log,Division where Division.id = Check_log_detail.division and Devices.id = Check_log_detail.device and  Liquidation.check_log = Check_log_detail.check_log_id and Check_log.id = Liquidation.check_log and year(check_date) = @year \
    ').then((result) =>
    {   
        
        final_result = result;
    });
    return final_result.recordset; 
}

module.exports = {startLiquidation,getLiquidationList,getLiquidationDeviceDetail,getLiquidationPersonnel,listNeedLiquidatingDeviceByDivision,getLiquidationListByYear,getLiquidationYear}