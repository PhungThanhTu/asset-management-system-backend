// ms sql queries
var mssql = require('mssql')

var sql_config = require('../sql_server').sql_config;

// get contract list
async function getContracts() {
    console.log('User get contracts list');
    
    
    try {
        await mssql.connect(sql_config);
        const result = await mssql.query`select id,supplier,price,import_date from Contracts`;
        
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

async function addnewContract(contract){

    let final_result;
    let  pool = await mssql.connect(sql_config);
    let request = await pool.request()
        .input('supplier',mssql.Int,contract.supplier)
        .input('import_date',mssql.Date,contract.import_date)
        .query('insert into Contracts (supplier,price,import_date) values (@supplier,0,@import_date)').then((result) =>
    {   
        console.log("Rows affected :");
        console.log(result.rowsAffected);
        final_result = result.rowsAffected;
    });
    return final_result[0];
}

async function updateContract(contract){
    let  pool = await  mssql.connect(sql_config);
    let request = await pool.request()
    .input('id',mssql.Int,contract.id)
    .input('supplier',mssql.Int,contract.supplier)
    .input('import_date',mssql.Date,contract.import_date)
    .query('update Contracts set supplier = @supplier,import_date = @import_date where id = @id').then((result) =>
    {   
        console.log("Rows affected :");
        console.log(result.rowsAffected);
        final_result = result.rowsAffected;
    });
    return final_result[0];

}

async function deleteContract(contractId)
{
    let result;

        let  pool = await  mssql.connect(sql_config);
        let request = await pool.request()
        .input('id',mssql.Int,contractId)
        .query('delete from Contracts where id = @id').then((result) =>
        {   
            console.log("Rows affected :");
            console.log(result.rowsAffected);
            final_result = result.rowsAffected;
        });
        return final_result[0];
 }

module.exports = {getContracts,addnewContract,updateContract,deleteContract}