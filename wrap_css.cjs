const fs = require('fs');
const path = require('path');

let css = fs.readFileSync(path.join(__dirname, 'src', 'funnel.css'), 'utf-8');

// Use CSS nesting which Vite supports!
css = `.funnel-theme {
${css}
}`;

fs.writeFileSync(path.join(__dirname, 'src', 'funnel.css'), css);
console.log('funnel.css wrapped in nesting!');
