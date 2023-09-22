
const cheerio = require('cheerio');
const fs = require('fs');
const pdf = require('pdf-parse');


const axios=require('axios');


const url="https://www.use.or.ug/content/corporate-announcements";
const baseurl="https://www.use.or.ug";
const results=[];
(async ()=>{
    const res=await axios(url);
    const $=cheerio.load(res.data);
    const dataelement= $("tbody>tr");
    for(const element of dataelement){
        const titleelement=$(element).find("a");
        const announcements=titleelement.text().trim();
        const sizeelement=$(element).find("td:nth-child(2)");
        const size=sizeelement.text();
        const dataelement=$(element).find("td:nth-child(3)");
        const date=dataelement.text().slice(0,10);
        const timeelement=$(element).find("td:nth-child(3)");
        const time=timeelement.text().slice(11,19);
        const pdfbase=$(element).find("a").attr("href");
        const encodepdf=pdfbase.replace(/\s/g,"%20");
        const pdflink=baseurl+encodepdf;
        results.push({announcements, size, currentdate, time, pdflink});

    }
    const csv=pdf(results);
    writeFileSync("finaloutput.csv",csv);


})();