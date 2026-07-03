const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function processPage(pageName, componentName) {
  console.log('Processing ' + pageName);
  const buffer = execSync(`git show 332f8dd8960b6ee9346004a32ea5833c62e80a66:public/${pageName}/index.html`);
  const html = buffer.toString('utf8');

  // We already extracted the CSS from ai-receptionist into funnel.css, 
  // so we don't need to re-extract the CSS unless there's specific differences.
  // Let's assume funnel.css has everything or we'll just extract it if it's missing.

  const bodyStart = html.indexOf('<body>') + 6;
  const bodyEnd = html.indexOf('</body>');
  let bodyHtml = html.substring(bodyStart, bodyEnd);

  bodyHtml = bodyHtml.replace(/class=/g, 'className=');

  const voidTags = ['img', 'input', 'hr', 'br', 'source'];
  voidTags.forEach(tag => {
      const regex = new RegExp(`<${tag}([^>]*?)(?<!/)>`, 'g');
      bodyHtml = bodyHtml.replace(regex, `<${tag}$1 />`);
  });

  bodyHtml = bodyHtml.replace(/style="([^"]+)"/g, (match, p1) => {
      const parts = p1.split(';');
      const obj = {};
      parts.forEach(part => {
          if (!part.trim()) return;
          let [key, value] = part.split(':');
          if (!key || !value) return;
          key = key.trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
          obj[key] = value.trim();
      });
      return `style={${JSON.stringify(obj)}}`;
  });

  bodyHtml = bodyHtml.replace(/stroke-width/g, 'strokeWidth');
  bodyHtml = bodyHtml.replace(/stroke-linecap/g, 'strokeLinecap');
  bodyHtml = bodyHtml.replace(/stroke-linejoin/g, 'strokeLinejoin');
  bodyHtml = bodyHtml.replace(/fill-rule/g, 'fillRule');
  bodyHtml = bodyHtml.replace(/clip-rule/g, 'clipRule');

  // Let's put standard imports for now, we'll manually patch routing later if needed.
  let component = `
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ${componentName}() {
  const navigate = useNavigate();
  return (
    <div className="funnel-theme">
      ${bodyHtml}
    </div>
  );
}
`;

  fs.writeFileSync(path.join(__dirname, 'src', 'pages', `${componentName}.tsx`), component);
  console.log(`${componentName} restored!`);
}

processPage('smart-start', 'SmartStart');
processPage('business-audit', 'BusinessAudit');
