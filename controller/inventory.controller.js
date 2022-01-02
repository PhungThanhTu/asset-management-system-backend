
var express = require('express');
var model = require('../model/inventory.model')

async function makeInventory(req,res)
{
    console.log("user attempt to make an inventory with these infomation :");
    console.log(req.body);
    console.log("JSON data is : ");
    console.log(JSON.stringify(req.body));
    // declare result
    let message = {
        message:"default"
    }
    try {
        let result = await model.startInventory(req.body);
        message.message = "New inventory has been made  , affected " + result + (result == 1? " row": " rows");
    }
    catch
    {
        message.message = "Error ocurred, please try again"
    }
    res.send(message);
}

async function getInventoryList(req,res)
{
    try
    {
        let result = await model.getInventoryList();
        res.send(result);
    }
    catch
    {
        res.send({
            "message":"An error has occured, please try again"
        })
    }
}

async function getInventoryDeviceDetail(req,res)
{
    try {
        let result = await model.getInventoryDeviceDetail(req.params.id);
        res.send(result);
    }
    catch
    {
        res.send({
            "message":"An error has occured, please try again"
        })
    }
}


async function getInventoryPersonnelDetail(req,res)
{
    try {
        let result = await model.getInventoryPersonnel(req.params.id);
        res.send(result);
    }
    catch
    {
        res.send({
            "message":"An error has occured, please try again"
        })
    }
}

module.exports = {makeInventory,getInventoryList,getInventoryDeviceDetail,getInventoryPersonnelDetail}