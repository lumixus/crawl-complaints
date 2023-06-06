import {parse} from 'csv-parse';
import fs, {appendFileSync} from 'fs';


fs.createReadStream('./arcelik.csv')
.pipe(parse({delimiter: ",", from_line: 2}))
.on("data", function(row){
    console.log(row);
    let category = "";
    row[1] = row[1].replaceAll(',','');
    row[1] = row[1].replaceAll('\n', '');
    row[1] = row[1].toLowerCase();
    /* if(row[1].includes("arızalı")){
        category = "Arızalı Ürün";
    } else if(row[1].includes("müşteri hizmetleri")){
        category = "Müşteri Hizmetleri";
    } else if(row[1].includes("servis")){
        category = "Servis Hizmeti";
    }

    if(category !== ""){
        appendFileSync(`./train_data_arcelik.csv`, category + "," + row[1].toLowerCase() + "\n", {encoding: 'utf8'});
    } */
    appendFileSync(`./all_data.csv`, "Arçelik," + row[1].toLowerCase() + "\n", {encoding: 'utf8'});
})


fs.createReadStream('./beko.csv')
.pipe(parse({delimiter: ",", from_line: 2}))
.on("data", function(row){
    console.log(row);
    let category = "";
    row[1] = row[1].replaceAll(',','');
    row[1] = row[1].replaceAll('\n', '');
    row[1] = row[1].toLowerCase();
    /* if(row[1].includes("arızalı")){
        category = "Arızalı Ürün";
    } else if(row[1].includes("müşteri hizmetleri")){
        category = "Müşteri Hizmetleri";
    } else if(row[1].includes("servis")){
        category = "Servis Hizmeti";
    }

    if(category !== ""){
        appendFileSync(`./train_data_beko.csv`, category + "," + row[1].toLowerCase() + "\n", {encoding: 'utf8'});
    } */
    appendFileSync(`./all_data.csv`, "Beko," + row[1].toLowerCase() + "\n", {encoding: 'utf8'});
})



fs.createReadStream('./vestel.csv')
.pipe(parse({delimiter: ",", from_line: 2}))
.on("data", function(row){
    console.log(row);
    let category = "";
    row[1] = row[1].replaceAll(',','');
    row[1] = row[1].replaceAll('\n', '');
    row[1] = row[1].toLowerCase();

    /* if(row[1].includes("arızalı")){
        category = "Arızalı Ürün";
    } else if(row[1].includes("müşteri hizmetleri")){
        category = "Müşteri Hizmetleri";
    } else if(row[1].includes("servis")){
        category = "Servis Hizmeti";
    }
    
    if(category !== ""){
        appendFileSync(`./train_data_vestel.csv`, category + "," + row[1].toLowerCase() + "\n", {encoding: 'utf8'});
    } */
    appendFileSync(`./all_data.csv`, "Vestel," + row[1].toLowerCase() + "\n", {encoding: 'utf8'});
})
