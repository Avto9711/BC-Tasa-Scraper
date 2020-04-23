const excelP = require('./src/excelProcess')

const express = require('express')
const app = express()
const  env  = require("dotenv");

env.config()

const urlExcel = process.env.URL_EXCEL

const USDapiUrl = "/api/v1/USD";
app.get('/', async function (req, res) {

    res.send(`${USDapiUrl} for detatils`);
})
app.get(USDapiUrl, async function (req, res) {
    let USDObj = await excelP(urlExcel);
    res.send(USDObj)
})
const port  = process.env.PORT || 1337
app.listen(port,()=>{
    console.log("Running on " + port)
})