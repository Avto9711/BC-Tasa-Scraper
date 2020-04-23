const excelP = require('./src/excelProcess')

const express = require('express')
const app = express()


const USDapiUrl = "/api/v1/USD";
app.get('/', async function (req, res) {

    res.send(`${USDapiUrl} for detatils`);
})
app.get(USDapiUrl, async function (req, res) {
    let USDObj = await excelP("https://cdn.bancentral.gov.do/documents/estadisticas/mercado-cambiario/documents/TASA_DOLAR_REFERENCIA_MC.xls");
    res.send(USDObj)
})
const port  = process.env.PORT || 1337
app.listen(port,()=>{
    console.log("Running on " + port)
})