import fs from 'fs';
import pdf from 'pdf-parse';

const dataBuffer = fs.readFileSync('c:/Users/user/.gemini/antigravity/work1/코비스_AI_CRM_핵심_전략.pdf');

pdf(dataBuffer).then(function (data) {
    console.log(data.text);
}).catch(function (error) {
    console.error("Error reading PDF:", error);
});
