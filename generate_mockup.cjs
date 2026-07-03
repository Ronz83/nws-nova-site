const fs = require('fs');
const path = require('path');
const htmlPath = path.join(__dirname, 'public', 'business-audit', 'index.html');
const rawHtml = fs.readFileSync(htmlPath, 'utf8');

let styleContent = '';
const styleStart = rawHtml.indexOf('<style>');
const styleEnd = rawHtml.indexOf('</style>');
if (styleStart !== -1 && styleEnd !== -1) {
  styleContent = rawHtml.substring(styleStart + 7, styleEnd);
}

const bodyStart = rawHtml.indexOf('<body>') + 6;
let bodyContent = rawHtml.substring(bodyStart, rawHtml.indexOf('</body>'));

bodyContent = bodyContent.replace('https://noveltywebsolutions.com/book', '/ai-receptionist').replace('Book a Free Strategy Call', 'Meet Samantha, Your AI Receptionist');

bodyContent = bodyContent.replace(/`/g, '\\`').replace(/\$/g, '\\$');
styleContent = styleContent.replace(/`/g, '\\`').replace(/\$/g, '\\$');
styleContent = styleContent.replace(/body\s*\{/g, '.business-audit-mockup-wrapper {');

const component = `
const htmlContent = \`${bodyContent}\`;
const styleContent = \`${styleContent}\`;

export default function BusinessAuditMockup() {
  return (
    <div className="business-audit-mockup-wrapper">
      <style dangerouslySetInnerHTML={{ __html: styleContent }} />
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
}
`;

fs.writeFileSync(path.join(__dirname, 'src', 'components', 'BusinessAuditMockup.tsx'), component);
console.log('Mockup generated with new CTA!');
