var express = require('express');
var mssql = require('mssql')

var sql_config = require('../sql_server')

var router = express.Router();

router.get('/:username/:password', (req,res) => {
    mssql.connect(sql_config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new mssql.Request();
           
        // query to the database and get the records
        request.query('select * from Account where username = ' + '\'' + req.params.username + '\'', function (err, recordset) {
            
            if (err) console.log(err)

            let message = {
                'message':'default'
            }

            // send records as a response
            try
            {
                if( recordset.recordset[0].password !== req.params.password)
                {
                    message.message = 'wrong password';
                    console.log(recordset.recordset[0].password);
                }
                else
                {
                    message.message = 'success';
                    console.log(recordset.recordset[0].password);
                }
            }
            catch
            {
                message.message = 'authentication failed';
            }

            res.send(message);
            
        });
        
        console.log(req.params.username);
        console.log(req.params.password);
    });
})

router.get('/test',(req,res) => {
    console.log(req.params);
})

module.exports = router;