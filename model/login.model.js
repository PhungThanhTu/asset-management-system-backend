// ms sql queries
var mssql = require('mssql')

var sql_config = require('../sql_server').sql_config;

// get login credentials
async function getLoginData(username,password) {
    console.log('User login with ['+username,',',password,']');
    let message = {
        message:'default'
    }
    try {
        await mssql.connect(sql_config);
        const result = await mssql.query`select password from Account where username =${username}`;
        try {
            const cpassword = result.recordset[0].password;
            message.message = password == cpassword ? 'success':'wrong password';
            
            return message;
        }
        catch
        {
            message.message = 'authentication failed';
            return message;
        }
    }
    catch {
        message.message = 'connection error';
        return message;
    }
    
    
}

module.exports = {getLoginData}