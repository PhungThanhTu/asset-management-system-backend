var model = require('../model/contract.model')

async function list(req,res) {
    try
    {
        let result = await model.getContracts();
        res.send(result);
    }
    catch 
    {
        res.send({
            message:"An error occured, please try again"
        })
    }
    
}

async function add(req,res)
{   
    let message = {
        message:"default",
    }
    
    try
    {
        let result = await model.addnewContract(req.body);
        console.log(result);
        
        if(result > 0)
        {
            message.message = "New Supplier added " + req.body.name + ", affected " + result + (result == 1? " row": "rows");
        }
        else 
        {
            message.message = "Eror occured, nothing updated in database";
        }
    }
    catch
    {
        message.message = "An error occured, please try again";
       
    }
    console.log(message);
    res.send(message);
    
}

async function update(req,res)
{
    let message = {
        message:"default"
    }
    console.log(req.body);

    try
    {
        let result = await model.updateContract(req.body);
        console.log(result);
        message.message = "Updated contract id " + req.body.id + ", affected " + result + (result == 1? " row": "rows");
        
    }
    catch
    {
        message.message = "An error occured, please try again";
    }
    console.log(message);
    res.send(message);
}

async function delete_contract(req,res)
{
    let message = {
        message:"default"
    }
    console.log(req.body);
    try {
        let result = await model.deleteContract(req.body.id);
        console.log(result);
        message.message = "Deleted contract id " + req.body.id  + ", affected " + result + (result == 1? " row": "rows");;
    }
    catch {
        message.message = "An error occured, please try again";

    }
    console.log(message);
    res.send(message);
}

module.exports = {list,add,delete_contract,update}