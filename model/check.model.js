var mssql = require('mssql')
var sql_config = require('../sql_server').sql_config;


async function checkDevices(data)
{
    let final_result;
    let  pool = await mssql.connect(sql_config);
    let request = await pool.request()
    .input('check',mssql.NVarChar,JSON.stringify(data))
    .query("\
    insert into Check_log (check_date)  \
                        select check_date \
                        from openjson(@check,'$.check') with    \
                        (   \
                            check_date date '$.check_date'  \
                        )   \
    DECLARE @new_log_id int \
    SELECT @new_log_id = IDENT_CURRENT('Check_log') \
    \
    insert into Check_log_detail (check_log_id,device,division,status,current_value) \
                select @new_log_id as check_log_id,device,division,status,current_value from openjson(@check,'$.detail') with \
    ( \
        device int '$.id', \
        division int '$.division', \
        status nvarchar(50) '$.status', \
        current_value money '$.current_value' \
    ) \
    \
    UPDATE Devices \
    SET    status = device_data.status, \
           current_value = device_data.current_value \
    FROM   Devices \
    JOIN   OPENJSON(@check, '$.detail') \
           WITH ( \
           id int '$.id', \
           status nvarchar(50) '$.status', \
           current_value money '$.current_value' \
           ) device_data \
           ON Devices.id = device_data.id").then((result) =>
           {   
               console.log("Result :");
               console.log(result);
               console.log("Rows affected :");
               console.log(result.rowsAffected);
               final_result = result.rowsAffected;
           }).catch(() => final_result = 0);
       
           return final_result.reduce((sum,element) => sum + element);
}

async function listCheckLog()
{
    console.log('User get check log list');
    
    
    try {
        await mssql.connect(sql_config);
        const result = await mssql.query`select id,check_date from Check_log`;   
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

async function listCheckLogDetail(id)
{
    console.log('User get check log detail ', id);
    
    
    let final_result;
    let  pool = await mssql.connect(sql_config);
    let request = await pool.request()
    .input('id',mssql.Int,id)
    .query('select device,division,status,current_value from Check_log_detail where \
    check_log_id = @id').then((result) =>
    {   
        
        final_result = result;
    });
    return final_result.recordset;
}

module.exports = {checkDevices,listCheckLog,listCheckLogDetail}