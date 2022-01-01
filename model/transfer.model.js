var mssql = require('mssql')
var sql_config = require('../sql_server').sql_config;


async function addDevices(transfer)
{
    let final_result;
    let  pool = await mssql.connect(sql_config);
    let request = await pool.request()
    .input('json',mssql.NVarChar,JSON.stringify(transfer))
    .query("insert into Transfers (sender,receiver,transfer_date) \
    select sender,receiver,transfer_date \
    from openjson(@json,'$.transfer') with \
    ( \
        sender int '$.sender', \
        receiver int '$.receiver', \
        transfer_date date '$.transfer_date' \
    ) \
 \
DECLARE @new_transfer_id int \
SELECT @new_transfer_id = IDENT_CURRENT('Transfers') \
insert into Detailed_Transfers (transfers,device) \
select @new_transfer_id as transfers,id as device from openjson(@json,'$.devices') with \
( \
id int '$.id' \
) \
update Devices \
SET Devices.holding_division = ( select receiver from openjson(@json,'$.transfer') with \
                ( \
                    sender int '$.sender', \
                    receiver int '$.receiver', \
                    transfer_date date '$.transfer_date' \
                )) \
FROM Devices \
JOIN openjson(@json,'$.devices') with \
( \
id int '$.id' \
)	newdevices \
ON Devices.id = newdevices.id \
select * from Devices \
select Transfers.id,S.name as sender_name, R.name as receiver_name,Transfers.transfer_date from Transfers,Division S,Division R \
where Transfers.sender = S.id and Transfers.receiver = R.id").then((result) =>
    {   
        console.log("Result :");
        console.log(result);
        console.log("Rows affected :");
        console.log(result.rowsAffected);
        final_result = result.rowsAffected;
    });

    return final_result.reduce((sum,element) => sum + element);
}

async function getTransfers()
{
    console.log('User get transfers list');
    
    
    try {
        await mssql.connect(sql_config);
        const result = await mssql.query`select Transfers.id,S.name as sender_name, R.name as receiver_name,Transfers.transfer_date from Transfers,Division S,Division R
        where Transfers.sender = S.id and Transfers.receiver = R.id`;   
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


async function getDetailedTransferById(id)
{
    console.log('User get devices transfers detail ', id);
    
    
    let final_result;
    let  pool = await mssql.connect(sql_config);
    let request = await pool.request()
    .input('id',mssql.Int,id)
    .query('select id,name,specification,price from Detailed_Transfers,Devices where \
    Detailed_Transfers.device = Devices.id \
    and Detailed_Transfers.transfers = @id',(err,handle) => {
        if(err) console.log(err);
        else console.log(handle);
    }
    ).then((result) =>
    {   
        
        final_result = result;
    });
    return final_result.recordset;
}

module.exports = {addDevices,getTransfers,getDetailedTransferById}