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
    
    try
    {
    let result = await model.addnewSupplier(req.body);
    console.log(result);
    message.message = "New Supplier added " + req.body.name;
    res.send(message);
    }
    catch
    {
        message.message = "An error occured, please try again";
        res.send(message);
    }
    
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
        message.message = "Updated supplier " + req.body.id;
        res.send(message);
    }
    catch
    {
        message.message = "An error occured, please try again";
        res.send(message);
    }
}

async function delete_supplier(req,res){
    let message = {
        message:"default"
    }
    console.log(req.body);
    try {
        let result = await model.deleteSupplier(req.body.id);
        console.log(result);
        message.message = "Deleted record " + req.body.id;
        res.send(message);
    }
    catch {
        message.message = "An error occured, please try again";
        res.send(message);

    }
}

module.exports = {list,add,update,delete_supplier}