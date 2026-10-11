const Excel = require('exceljs');
import { expect, test } from '@playwright/test'

async function writeExcel(filePath, searchText, replaceText) {

    const workbook = new Excel.Workbook();
    await workbook.xlsx.readFile(filePath)
    const worksheet = workbook.getWorksheet('Sheet1')
    const output = await readExcel(worksheet, searchText, replaceText);

    const Cell = worksheet.getCell(output.rown, output.col + 2)
    Cell.value = replaceText;
    console.log("update successfully");

    await workbook.xlsx.writeFile(filePath)
}


async function readExcel(worksheet, searchText) {
    let output = { rown: -1, col: -1 }
    worksheet.eachRow((row, rowNum) => {

        row.eachCell((cell, colNum) => {

            if (cell.value === searchText) {
                output.rown = rowNum;
                output.col = colNum;
            }


        })
    })
    return output;
}

//writeExcel('C://Users//Shriya//Downloads//testFile.xlsx', 'chacopi', 143);
//update Mango price

test.only('update download excel', async ({page}) => {
   await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html')

   const downloadPromise = page.waitForEvent('download')
   await page.getByRole('button',{name: 'Download'}).click();
   await downloadPromise;

   writeExcel('C://Users//Shriya//Downloads//download.xlsx', 'Mango', 143);

   await page.locator('#fileinput').click()
   await page.locator('#fileinput').setInputFiles('C://Users//Shriya//Downloads//download.xlsx');

   const textSearch =  page.getByText('Mango');
   const desiredRow = await page.getByRole('row').filter({has: textSearch})
   await expect(desiredRow.locator('#cell-4-undefined')).toContainText('143')
   //await page.pause()


})