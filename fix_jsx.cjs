const fs = require('fs');
const path = require('path');

['AIReceptionist', 'SmartStart'].forEach(f => {
  const p = path.join(__dirname, 'src', 'pages', f + '.tsx');
  let c = fs.readFileSync(p, 'utf8');
  
  // Replace HTML comments <!-- ... --> with JSX comments {/* ... */}
  // Be careful with multi-line comments
  c = c.replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}');
  
  // Some SVG properties might still be broken if they have colons like xmlns:xlink, xml:space
  c = c.replace(/xmlns:xlink/g, 'xmlnsXlink');
  c = c.replace(/xml:space/g, 'xmlSpace');
  c = c.replace(/xlink:href/g, 'xlinkHref');
  
  fs.writeFileSync(p, c);
});
console.log('Comments and XML tags fixed!');
