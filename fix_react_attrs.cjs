const fs = require('fs');
const path = require('path');

['AIReceptionist', 'SmartStart'].forEach(f => {
  const p = path.join(__dirname, 'src', 'pages', f + '.tsx');
  let c = fs.readFileSync(p, 'utf8');
  
  c = c.replace(/onclick=/g, 'onClick=');
  c = c.replace(/oninput=/g, 'onInput=');
  c = c.replace(/for=/g, 'htmlFor=');
  
  fs.writeFileSync(p, c);
});
console.log('React attributes fixed!');
