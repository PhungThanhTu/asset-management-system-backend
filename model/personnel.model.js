// ms sql queries
var mssql = require('mssql')

var sql_config = require('../sql_server').sql_config;
// class supplier


async function getPersonnel() {
    console.log('User get personnel list');
    
    
    try {
        await mssql.connect(sql_config);
        const result = await mssql.query`select Personnel.id,Personnel.name,position,Division.name as division from Personnel, Division where Division.id = Personnel.id`;
        
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

async function getPersonnelWithId() {
    console.log('User get personnel list');
    
    
    try {
        await mssql.connect(sql_config);
        const result = await mssql.query`select Personnel.id,Personnel.name,position,division from Personnel`;
        
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


async function addnewPersonnel(personnel){
    let final_result;
    let  pool = await mssql.connect(sql_config);
    let request = await pool.request()
    .input('name',mssql.NVarChar,personnel.name)
    .input('position',mssql.NVarChar,personnel.position)
    .input('division',mssql.Int,personnel.division)
    .query('insert into Personnel (name,position,division) values (@name,@position,@division)').then((result) =>
    {   
        console.log("Rows affected :");
        console.log(result.rowsAffected);
        final_result = result.rowsAffected;
    });
    return final_result[0];
}

async function updatePersonnel(personnel){
        let  pool = await  mssql.connect(sql_config);
        let request = await pool.request()
        .input('id',mssql.Int,personnel.id)
        .input('name',mssql.NVarChar,personnel.name)
        .input('position',mssql.NVarChar,personnel.position)
        .input('division',mssql.Int,personnel.division)
        .query('update Personnel set name = @name,position = @Position,division = @division where id = @id').then((result) =>
        {   
            console.log("Rows affected :");
            console.log(result.rowsAffected);
            final_result = result.rowsAffected;
        });
        return final_result[0];
  
}

async function deletePersonnel(id)
{
    let result;

        let  pool = await  mssql.connect(sql_config);
        let request = await pool.request()
        .input('id',mssql.Int,id)
        .query('delete from Personnel where id = @id').then((result) =>
        {   
            console.log("Rows affected :");
            console.log(result.rowsAffected);
            final_result = result.rowsAffected;
        });
        return final_result[0];
 }

module.exports = {getPersonnel,addnewPersonnel,updatePersonnel,deletePersonnel,getPersonnelWithId}