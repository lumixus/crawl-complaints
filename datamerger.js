import {parse} from 'csv-parse';
import fs, {appendFileSync} from 'fs';


let [arcelik_firstCategory, arcelik_secondCategory, arcelik_thirdCategory] = [0, 0, 0];
let [beko_firstCategory, beko_secondCategory, beko_thirdCategory] = [0, 0, 0];
let [vestel_firstCategory, vestel_secondCategory, vestel_thirdCategory] = [0, 0, 0];



fs.createReadStream('./train_data_arcelik.csv')
.pipe(parse({delimiter: ",", from_line: 1}))
.on("data", function(row){
    console.log(row);
    row[0] = row[0].toLowerCase();
    if(row[0] == "arızalı ürün" && arcelik_firstCategory <= 70){
        appendFileSync(`./train_data_merge.csv`, row[0] + "," + row[1].toLowerCase() + "\n", {encoding: 'utf8'});
        arcelik_firstCategory++;
    } else if(row[0] == "müşteri hizmetleri" && arcelik_secondCategory <= 70){
        appendFileSync(`./train_data_merge.csv`, row[0] + "," + row[1].toLowerCase() + "\n", {encoding: 'utf8'});
        arcelik_secondCategory++;
    } else if(row[0] == "servis hizmeti" && arcelik_thirdCategory <= 70){
        appendFileSync(`./train_data_merge.csv`, row[0] + "," + row[1].toLowerCase() + "\n", {encoding: 'utf8'});
        arcelik_thirdCategory++;
    }
})




fs.createReadStream('./train_data_beko.csv')
.pipe(parse({delimiter: ",", from_line: 1}))
.on("data", function(row){
    console.log(row);
    row[0] = row[0].toLowerCase();
    if(row[0] == "arızalı ürün" && beko_firstCategory <= 70){
        appendFileSync(`./train_data_merge.csv`, row[0] + "," + row[1].toLowerCase() + "\n", {encoding: 'utf8'});
        beko_firstCategory++;
    } else if(row[0] == "müşteri hizmetleri" && beko_secondCategory <= 70){
        appendFileSync(`./train_data_merge.csv`, row[0] + "," + row[1].toLowerCase() + "\n", {encoding: 'utf8'});
        beko_secondCategory++;
    } else if(row[0] == "servis hizmeti" && beko_thirdCategory <= 70){
        appendFileSync(`./train_data_merge.csv`, row[0] + "," + row[1].toLowerCase() + "\n", {encoding: 'utf8'});
        beko_thirdCategory++;
    }
})



fs.createReadStream('./train_data_vestel.csv')
.pipe(parse({delimiter: ",", from_line: 1}))
.on("data", function(row){
    console.log(row);
    row[0] = row[0].toLowerCase();
    if(row[0] == "arızalı ürün" && vestel_firstCategory <= 70){
        appendFileSync(`./train_data_merge.csv`, row[0] + "," + row[1].toLowerCase() + "\n", {encoding: 'utf8'});
        vestel_firstCategory++;
    } else if(row[0] == "müşteri hizmetleri" && vestel_secondCategory <= 70){
        appendFileSync(`./train_data_merge.csv`, row[0] + "," + row[1].toLowerCase() + "\n", {encoding: 'utf8'});
        vestel_secondCategory++;
    } else if(row[0] == "servis hizmeti" && vestel_thirdCategory <= 70){
        appendFileSync(`./train_data_merge.csv`, row[0] + "," + row[1].toLowerCase() + "\n", {encoding: 'utf8'});
        vestel_thirdCategory++;
    }
})
