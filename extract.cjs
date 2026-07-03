const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, 'ai_receptionist_original.html'), 'utf-8');

const bodyStart = html.indexOf('<body>') + 6;
const bodyEnd = html.indexOf('</body>');

const bodyHtml = html.substring(bodyStart, bodyEnd);
fs.writeFileSync(path.join(__dirname, 'ai_receptionist_body.html'), bodyHtml);
console.log('Done!');
