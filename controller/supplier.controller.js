var model = require('../model/supplier.model');
var express = require('express');

async function list(req,res) {
    try
    {
        let result = await model.getSuppliers();
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
            result = await model.addnewSupplier(req.body);
            console.log("User attempt to add supplier with these information : ");
            console.log(req.body);
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
        let result = await model.updateSupplier(req.body);
        console.log(result);
        message.message = "Updated supplier id " + req.body.id + ", affected " + result + (result == 1? " row": "rows");
        
    }
    catch
    {
        message.message = "An error occured, please try again";
    }
    console.log(message);
    res.send(message);
}

async function delete_supplier(req,res){
    let message = {
        message:"default"
    }
    console.log(req.body);
    try {
        let result = await model.deleteSupplier(req.body.id);
        console.log(result);
        message.message = "Deleted supplier id " + req.body.id  + ", affected " + result + (result == 1? " row": "rows");;
    }
    catch {
        message.message = "An error occured, please try again";

    }
    console.log(message);
    res.send(message);
}

module.exports = {list,add,update,delete_supplier}