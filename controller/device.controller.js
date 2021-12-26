var model = require('../model/device.model');
var express = require('express');
var contract_model = require('../model/contract.model');

async function addManyDevices(req,res)
{
    let message = {
        message:"default",
    }
    
    
    
        let result;
        try
        {   
            console.log("User attempt to add devices with these information : ");
            console.log(req.body);
            result = await model.addDevices(req.body.devices);
            console.log("Row affected : ",result);
            if(result > 0)
            {
                message.message = "New Devices Added , affected " + result + (result == 1? " row": " rows");
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

async function getDevices(req,res)
{   
    if(req.query.contract && req.query.division)
    {
        try
        {
            let result = await model.getDevicesByDivisionAndContract(req.query.division,req.query.contract);
            res.send(result);
        }
        catch 
        {
            res.send({
                message:"An error occured, please try again"
            })
        }
    }
    else if(req.query.division)
    {
        try
        {
            let result = await model.getDevicesByDivision(req.query.division);
            res.send(result);
        }
        catch 
        {
            res.send({
                message:"An error occured, please try again"
            })
        }
    }
    else if(req.query.contract)
    {
        try
        {
            let result = await model.getDeviceByContract(req.query.contract);
            res.send(result);
        }
        catch 
        {
            res.send({
                message:"An error occured, please try again"
            })
        }
    }
    else
    {
        res.send({
            message:"No queries, please input valid query format in API URL"
        })
    }
}

async function addContractAndDevices(req,res)
{   
    // declare result
    let message = {
        message:"default"
    }
    let contractResult;
    let deviceResult;
    var lastContractId;
    try
    {
        // add contract
        contractResult = await contract_model.addnewContract(req.body.contract);
        // find that contract identity
        lastContractId = await model.getContractLatestIdentity();
        // edit devices input contract_id
        let editedDevices = req.body.devices;
        editedDevices.forEach(element => {
            element.contract_id = lastContractId;
        });
        console.log("Edited devices list data : ");
        console.log(editedDevices);
        // add devices
        deviceResult = await model.addDevices(editedDevices);
        let result = contractResult + deviceResult;
        // finish
        message.message = "User added contract and devices, affected " + result + (result == 1? " row": " rows");
    }
    catch
    {
        message.message = "Error ocurred, please try again"
    }
    res.send(message);
}



module.exports = {addManyDevices,getDevices,addContractAndDevices}