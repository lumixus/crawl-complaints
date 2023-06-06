import dotenv from "dotenv";
import { getComplaintSlug } from "./helper.js";
import jsdom from 'jsdom';
import { appendFileSync } from "fs";
import axios from "axios";

dotenv.config();

const { JSDOM } = jsdom;

const company = 'vestel';


try {
        

    let pageNumber = 1;

    let complaints = [];

    appendFileSync(`./${company}.csv`, `title, content\n`);

    for(pageNumber; pageNumber <= 300; pageNumber++){
        console.log(pageNumber);

    const {data} = await axios.get(`https://www.sikayetvar.com/${company}?page=${pageNumber}`);

    const DOM = new JSDOM(data);

    const window = DOM.window;

    const document = window.document;

    const complaintClasses = document.querySelectorAll('.complaint-card');

    const slugs = getComplaintSlug(complaintClasses);

    for(const slug of slugs){
        await sleep(500);
        const response = await axios.get(`https://www.sikayetvar.com${slug}`);
        console.log(slug);
        const complaintDOM = new JSDOM(response.data);

        const complaintWindow = complaintDOM.window;

        const complaintDocument = complaintWindow.document;

        const complaintCard = complaintDocument.getElementsByClassName('complaint-card')[0];

        let title = complaintCard.getElementsByClassName('complaint-title')[0].textContent.trim();
        let content = complaintCard.getElementsByClassName('card-text')[0].textContent.trim();

        title = title.replaceAll(`"`,'');
        title = title.replaceAll(',','');

        content = content.replaceAll(`"`,'');
        content = content.replaceAll(',','');



        const complaint = {
            title: title,
            content: content
        }


        complaints.push(complaint);
    }

}

    for(const complaint of complaints){
        if(complaint.title.trim() !== "" && complaint.content.trim() !== ""){
            const csv = `"${complaint.title}","${complaint.content}"\n`;
            appendFileSync(`./${company}.csv`, csv);
        }
    }

} 

    catch (error) {
        console.log(error);
    }



    function sleep(ms) {
        return new Promise((resolve) => {
          setTimeout(resolve, ms);
        });
      }
