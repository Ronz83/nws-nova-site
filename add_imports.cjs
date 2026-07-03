const fs = require('fs');

['AIReceptionist', 'SmartStart', 'BusinessAudit'].forEach(f => {
  const p = 'src/pages/' + f + '.tsx';
  let c = fs.readFileSync(p, 'utf8');
  c = c.replace(/import React/, 'import "../funnel.css";\nimport React');
  fs.writeFileSync(p, c);
});
console.log('Imports added!');
