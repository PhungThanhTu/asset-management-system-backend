// ms sql queries
var mssql = require('mssql')

var sql_config = require('../sql_server').sql_config;
// class supplier
class Supplier{
    constructor(name,address,phone){
        this.name = name;
        this.address = address;
        this.phone = phone;
    }
}

// get login credentials
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
    let result;
    try {
        let  pool = await  mssql.connect(sql_config);
        let request = await pool.request()
        .input('name',mssql.NVarChar,supplier.name)
        .input('address',mssql.NVarChar,supplier.address)
        .input('phone',mssql.VarChar,supplier.phone)
        .query('insert into Supplier (name,address,phone) values (@name,@address,@phone)',(err,handle) => {
            result = handle;
            console.log("User add value : ");
            console.log(supplier);
            console.log("Result :")
            console.log(result);
        })
    }
      catch (err) {
        result = err;
    }
    return result;
}

module.exports = {getSuppliers,addnewSupplier}