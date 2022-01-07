var mssql = require('mssql')

var sql_config = require('../sql_server').sql_config;



// get the newest contract id
async function getContractLatestIdentity()
{
    console.log('Get last identity ');
    
    
    try {
        await mssql.connect(sql_config);
        const result = await mssql.query`SELECT IDENT_CURRENT('Contracts') as id`;   
        const list = result.recordset;
        console.log(list);
        return list[0].id;

        
    }
    catch {
        return 0;
    }
}

async function addDevices(device)
{
    let final_result;
    let  pool = await mssql.connect(sql_config);
    let request = await pool.request()
    .input('json',mssql.NVarChar,JSON.stringify(device))
    .query("INSERT INTO Devices (name,price,specification,production_year,implement_year,status,annual_value_lost,contract_id,unit,type,current_value,holding_division) \
    SELECT name,price,specification,production_year,implement_year,status,annual_value_lost,contract_id,unit,type,current_value,holding_division\
    FROM OpenJson(@json) WITH( \
    name nvarchar(50) '$.name',\
    price money '$.price', \
    specification nvarchar(50) '$.specification', \
    production_year int '$.production_year', \
    implement_year int '$.implement_year', \
    status nvarchar(50) '$.status', \
    annual_value_lost float '$.annual_value_lost', \
    contract_id int '$.contract_id', \
    unit int '$.unit', \
    type int '$.type', \
    current_value money '$.current_value', \
    holding_division int '$.holding_division' \
    )").then((result) =>
    {   
        console.log("Rows affected :");
        console.log(result.rowsAffected);
        final_result = result.rowsAffected;
    });

    return final_result.reduce((sum,element) => sum + element);
}


async function getDevicesByDivision(id)
{
    console.log('User get device list based on holding division id ', id);
    
    
    let final_result;
    let  pool = await mssql.connect(sql_config);
    let request = await pool.request()
    .input('id',mssql.Int,id)
    .query('select id,name,specification,price,status,current_value from Devices where holding_division = @id and status not in(\'Liquidated\')').then((result) =>
    {   
        
        final_result = result;
    });
    return final_result.recordset;
}

async function getDeviceByContract(id)
{
    console.log('User get device list based on contract id ', id);
    
    
    let final_result;
    let  pool = await mssql.connect(sql_config);
    let request = await pool.request()
    .input('id',mssql.Int,id)
    .query('select id,name,specification,price from Devices where contract_id = @id and status not in(\'Liquidated\')').then((result) =>
    {   
        
        final_result = result;
    });
    return final_result.recordset;
}

async function getDevicesByDivisionAndContract(division,contract)
{
    console.log('User get device list based on holding division id ', division , " and contract id : ",contract);
    
    
    let final_result;
    let  pool = await mssql.connect(sql_config);
    let request = await pool.request()
    .input('division',mssql.Int,division)
    .input('contract',mssql.Int,contract)
    .query('select id,name,specification,price from Devices where contract_id = @contract and holding_division = @division').then((result) =>
    {   
        
        final_result = result;
    });
    return final_result.recordset;
}

async function getDeviceDetailById(id)
{
    console.log('User get device list based on holding division id ', id);
    
    
    let final_result;
    let  pool = await mssql.connect(sql_config);
    let request = await pool.request()
    .input('id',mssql.Int,id)
    .query('select Devices.id,Devices.name,Devices.price, Devices.specification, Devices.production_year, Devices.implement_year, Devices.status, \
    Devices.annual_value_lost,Devices.contract_id,Division.name as holding_division,Division.type as division_type, device_unit.u_name as unit, device_type.t_name as type, \
    device_type.note as note, Devices.current_value \
                                                    from Devices,Division,device_unit,device_type where \
                                                            Devices.holding_division = Division.id and \
                                                            Devices.unit = device_unit.id and \
                                                            Devices.type = device_type.id and \
                                                            Devices.id = @id').then((result) =>
    {   
        
        final_result = result;
    });
    return final_result.recordset[0];
}

async function getDeviceList()
{
    try {
        await mssql.connect(sql_config);
        const result = await mssql.query`select * from Devices where status not in(\'Liquidated\')`;
        
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



module.exports = {addDevices,getContractLatestIdentity,getDevicesByDivision,getDeviceByContract,getDevicesByDivisionAndContract,getDeviceDetailById,getDeviceList}