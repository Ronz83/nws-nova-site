import { useState, useEffect } from 'react';
import { WifiOff, AlertTriangle } from 'lucide-react';

export function OfflineBanner() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOffline = () => setIsOffline(true);
    const handleOnline = () => setIsOffline(false);

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] bg-amber-500 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between flex-wrap">
          <div className="w-0 flex-1 flex items-center">
            <span className="flex p-2 rounded-lg bg-amber-600/50">
              <WifiOff className="h-5 w-5 text-white" aria-hidden="true" />
            </span>
            <p className="ml-3 font-medium truncate">
              <span className="md:hidden">You're offline.</span>
              <span className="hidden md:inline">
                You're currently operating in Offline Mode. Some features may be temporarily disabled until your connection is restored.
              </span>
            </p>
          </div>
          <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
            <span className="flex items-center gap-2 text-sm font-bold bg-amber-600/30 px-3 py-1.5 rounded-full border border-amber-400/50">
              <AlertTriangle className="w-4 h-4" />
              Limited Access
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
