var mssql = require('mssql')

var sql_config = require('../sql_server').sql_config;



async function getUnit() {
    console.log('User get device units list');
    
    
    try {
        await mssql.connect(sql_config);
        const result = await mssql.query`select id,u_name,note from device_unit`;
        
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

module.exports = {getUnit}