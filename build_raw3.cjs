const fs = require('fs');
const html = fs.readFileSync('live_audit.html', 'utf8');

const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/);
const styleContent = styleMatch ? styleMatch[1] : '';

const bodyMatch = html.match(/<body>([\s\S]*?)<script>/);
let bodyContent = bodyMatch ? bodyMatch[1] : '';

const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/);
const scriptContent = scriptMatch ? scriptMatch[1] : '';

const component = `// @ts-nocheck
import React, { useEffect } from 'react';

const styleContent = \`${styleContent.replace(/\`/g, '\\`').replace(/\$/g, '\\$')}\`;

const htmlContent = \`${bodyContent.replace(/\`/g, '\\`').replace(/\$/g, '\\$')}\`;

export default function BusinessAuditMockup() {
  useEffect(() => {
${scriptContent}
  }, []);

  return (
    <div className="business-audit-mockup-wrapper bg-transparent w-full">
      <style dangerouslySetInnerHTML={{ __html: styleContent }} />
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
}
`;

fs.writeFileSync('src/components/BusinessAuditMockup.tsx', component);
console.log('Recreated BusinessAuditMockup.tsx from live_audit.html');
