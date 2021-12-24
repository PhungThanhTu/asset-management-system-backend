// ms sql queries
var mssql = require('mssql')

var sql_config = require('../sql_server').sql_config;
// class supplier
class Supplier{
    constructor(name,address,phone){
        this.id = id;
        this.name = name;
        this.address = address;
        this.phone = phone;
    }
}

async function getSuppliers() {
    console.log('User get suppliers list');
    
    
    try {
        await mssql.connect(sql_config);
        const result = await mssql.query`select id,name,address,phone from Supplier`;
        
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

async function addnewSupplier(supplier){
    let final_result;
    let  pool = await mssql.connect(sql_config);
    let request = await pool.request()
    .input('name',mssql.NVarChar,supplier.name)
    .input('address',mssql.NVarChar,supplier.address)
    .input('phone',mssql.VarChar,supplier.phone)
    .query('insert into Supplier (name,address,phone) values (@name,@address,@phone)').then((result) =>
    {   
        console.log("Rows affected :");
        console.log(result.rowsAffected);
        final_result = result.rowsAffected;
    });
    return final_result[0];
}

async function updateSupplier(supplier){
        let  pool = await  mssql.connect(sql_config);
        let request = await pool.request()
        .input('id',mssql.Int,supplier.id)
        .input('name',mssql.NVarChar,supplier.name)
        .input('address',mssql.NVarChar,supplier.address)
        .input('phone',mssql.VarChar,supplier.phone)
        .query('update Supplier set name = @name,address = @address, phone = @phone where id = @id').then((result) =>
        {   
            console.log("Rows affected :");
            console.log(result.rowsAffected);
            final_result = result.rowsAffected;
        });
        return final_result[0];
  
}

async function deleteSupplier(supplierId)
{
    let result;

        let  pool = await  mssql.connect(sql_config);
        let request = await pool.request()
        .input('id',mssql.Int,supplierId)
        .query('delete from Supplier where id = @id').then((result) =>
        {   
            console.log("Rows affected :");
            console.log(result.rowsAffected);
            final_result = result.rowsAffected;
        });
        return final_result[0];
 }

module.exports = {getSuppliers,addnewSupplier,updateSupplier,deleteSupplier}