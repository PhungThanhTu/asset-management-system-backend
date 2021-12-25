var mssql = require('mssql')

var sql_config = require('../sql_server').sql_config;



async function getDivision() {
    console.log('User get division list');
    
    
    try {
        await mssql.connect(sql_config);
        const result = await mssql.query`select id,name,type from Division`;   
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

module.exports = {getDivision}