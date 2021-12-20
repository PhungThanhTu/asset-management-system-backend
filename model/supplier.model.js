// ms sql queries
var mssql = require('mssql')

var sql_config = require('../sql_server').sql_config;

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

module.exports = {getSuppliers}