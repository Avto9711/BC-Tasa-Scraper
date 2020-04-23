const excelP = require('./src/excelProcess')
const scrapper = require('./src/scrapper/scrapper');

const express = require('express')
const app = express()


const USDapiUrl = "/api/v1/USD";
app.get('/', async function (req, res) {

    res.send(`${USDapiUrl} for detatils`);
})
app.get(USDapiUrl, async function (req, res) {
    let excelUrl = await scrapper();
    let USDObj = await excelP(excelUrl);
    res.send(USDObj)
})
const port  = process.env.PORT || 1337
app.listen(port,()=>{
    console.log("Running on " + port)
})