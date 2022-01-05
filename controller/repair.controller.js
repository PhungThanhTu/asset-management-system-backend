var model = require('../model/repair.model');
var express = require('express');

async function listSpoiled(req,res) {
    try
    {
        let result = await model.listSpoiledDevice();
        res.send(result);
    }
    catch 
    {
        res.send({
            message:"An error occured, please try again"
        })
    }
    
}

async function listBill(req,res){
    try
    {
        let result = await model.getRepairList();
        res.send(result);
    }
    catch 
    {
        res.send({
            message:"An error occured, please try again"
        })
    }
}

async function getRepairBillDetail(req,res)
{
    try {
        let result = await model.getRepairDetailById(req.params.id);
        res.send(result);
    }
    catch
    {
        res.send({
            "message":"An error has occured, please try again"
        })
    }
}

async function repair(req,res)
{
    console.log("user attempt to repair devices with these infomation :");
    console.log(req.body);
    console.log("JSON data is : ");
    console.log(JSON.stringify(req.body));
    // declare result
    let message = {
        message:"default"
    }
    try {
        let result = await model.repairDevices(req.body);
        message.message = "New repair has been made  , affected " + result + (result == 1? " row": " rows");
    }
    catch
    {
        message.message = "Error ocurred, please try again"
    }
    res.send(message);
}


module.exports = {listSpoiled,listBill,getRepairBillDetail,repair}