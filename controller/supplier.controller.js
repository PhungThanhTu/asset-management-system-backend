var model = require('../model/supplier.model');
var express = require('express');

async function list(req,res) {
    let result = await model.getSuppliers();
    res.send(result);
}

module.exports = {list}