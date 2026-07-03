const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const buffer = execSync('git show 332f8dd8960b6ee9346004a32ea5833c62e80a66:public/ai-receptionist/index.html');
const html = buffer.toString('utf8');

// Extract CSS
const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/);
if (styleMatch) {
  let css = styleMatch[1];
  css = css.replace(/body\s*\{/g, '.funnel-theme {');
  css = css.replace(/h1, h2, h3, h4\s*\{/g, '.funnel-theme h1, .funnel-theme h2, .funnel-theme h3, .funnel-theme h4 {');
  css = css.replace(/h1\s*\{/g, '.funnel-theme h1 {');
  css = css.replace(/h2\s*\{/g, '.funnel-theme h2 {');
  css = css.replace(/h3\s*\{/g, '.funnel-theme h3 {');
  css = css.replace(/p\s*\{/g, '.funnel-theme p {');
  css = css.replace(/a\s*\{/g, '.funnel-theme a {');
  css = css.replace(/a:hover\s*\{/g, '.funnel-theme a:hover {');
  
  fs.writeFileSync(path.join(__dirname, 'src', 'funnel.css'), css);
}

// Extract Body
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

// Inject React onClick handlers for buttons
bodyHtml = bodyHtml.replace(/href="#book" className="btn btn-primary"/g, 'onClick={() => setIsBookingOpen(true)} className="btn btn-primary"');
bodyHtml = bodyHtml.replace(/href="#demo" className="btn btn-secondary"/g, 'onClick={() => setShowVoice(true)} className="btn btn-secondary"');

const component = `
import React, { useState } from 'react';
import BookingModal from '../components/BookingModal';
import { VoiceCallOverlay } from '../components/samantha/VoiceCallOverlay';

export default function AIReceptionist() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [showVoice, setShowVoice] = useState(false);

  return (
    <div className="funnel-theme">
      ${bodyHtml}
      
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />

      {showVoice && (
        <VoiceCallOverlay
          demoId="nws-giveaway-demo"
          businessName="Your Business"
          primaryColor="#2BD9C2"
          apiBase=""
          onClose={() => setShowVoice(false)}
        />
      )}
    </div>
  );
}
`;

fs.writeFileSync(path.join(__dirname, 'src', 'pages', 'AIReceptionist.tsx'), component);
console.log('AI Receptionist restored!');
