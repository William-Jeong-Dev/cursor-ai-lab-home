const fs = require('fs');
let pdf;
try {
    pdf = require('pdf-parse/lib/pdf-parse.js');
} catch (e) {
    try {
        pdf = require('pdf-parse');
    } catch (e2) {
        console.error("Cannot load pdf-parse");
        process.exit(1);
    }
}

const dataBuffer = fs.readFileSync('c:/Users/user/.gemini/antigravity/work1/코비스_AI_CRM_핵심_전략.pdf');

// Check if it's a function or object
if (typeof pdf !== 'function') {
    if (pdf.default && typeof pdf.default === 'function') {
        pdf = pdf.default;
    } else if (pdf.PDFParse) {
        // Some forks use this
        // logical guess: wrapper
        pdf = (buf) => new pdf.PDFParse(buf);
    }
}

console.log("Using PDF parser of type:", typeof pdf);

try {
    pdf(dataBuffer).then(function (data) {
        console.log("--- START TEXT ---");
        console.log(data.text);
        console.log("--- END TEXT ---");
    }).catch(function (error) {
        console.error("Error parsing PDF:", error);
    });
} catch (e) {
    console.error("Invocation failed:", e);
}
