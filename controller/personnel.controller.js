var model = require('../model/personnel.model');
var express = require('express');

async function list(req,res) {
    try
    {
        let result = await model.getPersonnel();
        res.send(result);
    }
    catch 
    {
        res.send({
            message:"An error occured, please try again"
        })
    }
    
}


async function listFull(req,res) {
    try
    {
        let result = await model.getPersonnelWithId();
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
            result = await model.addnewPersonnel(req.body);
            console.log("User attempt to add personnel with these information : ");
            console.log(req.body);
            if(result > 0)
            {
                message.message = "New personnel added " + req.body.name + ", affected " + result + (result == 1? " row": "rows");
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
        let result = await model.updatePersonnel(req.body)
        console.log(result);
        message.message = "Updated personnel id " + req.body.id + ", affected " + result + (result == 1? " row": "rows");
        
    }
    catch
    {
        message.message = "An error occured, please try again";
    }
    console.log(message);
    res.send(message);
}

async function delete_personnel(req,res){
    let message = {
        message:"default"
    }
    console.log(req.body);
    try {
        let result = await model.deletePersonnel(req.params.id)
        console.log(result);
        message.message = "Deleted supplier id " + req.params.id  + ", affected " + result + (result == 1? " row": "rows");;
    }
    catch {
        message.message = "An error occured, please try again";

    }
    console.log(message);
    res.send(message);
}

module.exports = {list,add,update,delete_personnel,listFull}