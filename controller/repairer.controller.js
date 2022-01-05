var model = require('../model/repairer.model');
var express = require('express');

async function list(req,res) {
    try
    {
        let result = await model.getRepairers();
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
    
    
    
        let result;
        try
        {
            result = await model.addnewRepairer(req.body);
            console.log("User attempt to add repairer with these information : ");
            console.log(req.body);
            if(result > 0)
            {
                message.message = "New Repairer added " + req.body.name + ", affected " + result + (result == 1? " row": "rows");
            }
            else 
            {
                message.message = "Eror occured, nothing updated in database";
            }

            }
        catch
        {
            message.message = "Eror occured, nothing updated in database";
        }
        
        console.log(message);
        res.send(message);
       
        
    
    
}

async function update(req,res){
    let message = {
        message:"default"
    }
    console.log(req.body);

    try
    {
        let result = await model.updateRepairer(req.body);
        console.log(result);
        message.message = "Updated repairer id " + req.body.id + ", affected " + result + (result == 1? " row": "rows");
        
    }
    catch
    {
        message.message = "An error occured, please try again";
    }
    console.log(message);
    res.send(message);
}

async function delete_repairer(req,res){
    let message = {
        message:"default"
    }
    console.log(req.body);
    try {
        let result = await model.deleteRepairer(req.params.id);
        console.log(result);
        message.message = "Deleted repairer id " + req.params.id  + ", affected " + result + (result == 1? " row": "rows");;
    }
    catch {
        message.message = "An error occured, please try again";

    }
    console.log(message);
    res.send(message);
}


module.exports = {list,add,update,delete_repairer}