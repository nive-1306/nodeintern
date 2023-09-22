const url="https://www.use.or.ug/content/corporate-announcements";
const baseurl="https://www.use.or.ug";
const fs = require('fs');
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const inputFilePath = 'announcements.csv'; // Replace with the path to your CSV file
const outputFilePath = 'output.csv'; // Replace with the desired output path
const results = [];

fs.createReadStream(inputFilePath)
  .pipe(csv())
  .on('data', (row) => {
    // Split the "FullName" column into "FirstName" and "LastName"
    const [Currentdate, Time] = row.date.split(' ');
    
    // Add the split columns to the row
    row.Currentdate = Currentdate;
    row.Time = Time;
    const pdfbase=$(element).find("a").attr("href");
    const encodepdf=pdfbase.replace(/\s/g, "%20");
    const pdf= baseurl+encodepdf;

    
    results.push(row);
  })
  .on('end', () => {
    // Write the modified data to a new CSV file
    const csvWriter = createCsvWriter({
      path: outputFilePath,
      header: Object.keys(results[0]).map((columnName) => ({ id: columnName, title: columnName })),
    });

    csvWriter
      .writeRecords(results)
      .then(() => console.log('CSV file has been split and saved to output.csv'));
      const csv=parse(results);
      writeFileSync("announcements.csv",csv);


  });

