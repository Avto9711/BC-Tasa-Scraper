const XLSX = require('xlsx'),
      fetch = require('node-fetch');


const COMPRA_CELL_LETTER = "D";
const VENTA_CELL_LETTER = "E";

module.exports = async function processExcel(excelUrl) {
    console.log("Excel Url:", excelUrl);
    const usdObject = await fetch(excelUrl)
        .then(res => res.buffer())
        .then(buffer => {
            const workbook = XLSX.read(buffer, {
                type: 'buffer'
            });
            const first_sheet_name = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[first_sheet_name];
            const lastRow = parseInt(worksheet['!ref'].split(":")[1].substr(1));

            const compraValueWS = worksheet[COMPRA_CELL_LETTER + lastRow.toString()];
            const ventaValueWS = worksheet[VENTA_CELL_LETTER + lastRow.toString()];
            return {
                USD: {
                    compra: compraValueWS.v,
                    venta: ventaValueWS.v
                }
            }
        })
        .catch(err => console.error(err));
    return usdObject
}