var mssql = require('mssql')

var sql_config = require('../sql_server').sql_config;



async function getType() {
    console.log('User get device type list');
    
    
    try {
        await mssql.connect(sql_config);
        const result = await mssql.query`select id,t_name,note from device_type`;
        
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

module.exports = {getType}