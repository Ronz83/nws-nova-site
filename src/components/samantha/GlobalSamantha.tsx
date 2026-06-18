import { useEffect } from 'react';

export function GlobalSamantha() {
  useEffect(() => {
    // Inject Samantha Voice Widget
    const voiceScript = document.createElement('script');
    voiceScript.src = "https://beta.leadconnectorhq.com/loader.js";
    voiceScript.setAttribute('data-resources-url', "https://beta.leadconnectorhq.com/chat-widget/loader.js");
    voiceScript.setAttribute('data-widget-id', "6914a81b33e99255993705fa");
    voiceScript.async = true;
    document.body.appendChild(voiceScript);

    // Inject Samantha Chat Widget
    const chatScript = document.createElement('script');
    chatScript.src = "https://beta.leadconnectorhq.com/loader.js";
    chatScript.setAttribute('data-resources-url', "https://beta.leadconnectorhq.com/chat-widget/loader.js");
    chatScript.setAttribute('data-widget-id', "6a2f1df4e20523fdce316b75");
    chatScript.async = true;
    document.body.appendChild(chatScript);

    return () => {
      // Cleanup
      if (document.body.contains(voiceScript)) document.body.removeChild(voiceScript);
      if (document.body.contains(chatScript)) document.body.removeChild(chatScript);
      
      const widgets = document.querySelectorAll('chat-widget');
      widgets.forEach(w => w.remove());
    };
  }, []);

  return null;
}
