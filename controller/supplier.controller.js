var model = require('../model/supplier.model');
var express = require('express');

async function list(req,res) {
    let result = await model.getSuppliers();
    res.send(result);
}

async function add(req,res)
{   
    let message = {
        message:"default",
    }
    let result = await model.addnewSupplier(req.body);
    console.log(result);
    message.message = "New Supplier added " + req.body.name;
    res.send(message);
}

module.exports = {list,add}