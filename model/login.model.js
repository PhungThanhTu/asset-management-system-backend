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

async function checkUsernameExist(username)
{
    try {
        await mssql.connect(sql_config);
        const result = await mssql.query`select username from Account where username =${username}`;
        console.log(result.recordset);
        console.log(result.recordset.length);
        if(result.recordset.length > 0)
            return true;
        else return false;

    }
    catch {
        
        console.log("New account cannot be created duo to connection error");
        return null;
    }
}

// create new account

async function addnewAccount(username,password){
    let result;
    try {
        let  pool = await  mssql.connect(sql_config);
        let  request = await  pool.request()
        .input('username',mssql.VarChar,username)
        .input('password',mssql.VarChar,password)
        .query('insert into Account (username,password) values (@username,@password)',(err, handle) => {
            result = handle;
      });
    }
      catch (err) {
        result = err;
    }
    return result;
}

module.exports = {getLoginData,addnewAccount,checkUsernameExist}