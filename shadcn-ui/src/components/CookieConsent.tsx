import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { initGA, GA_TRACKING_ID } from '@/lib/analytics';

const CONSENT_KEY = 'analytics_consent';

export default function CookieConsent() {
  const [consent, setConsent] = useState<boolean | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored === null) {
      setConsent(null);
    } else {
      setConsent(stored === 'true');
    }
  }, []);

  useEffect(() => {
    if (consent && GA_TRACKING_ID && !GA_TRACKING_ID.includes('XXXXXXXX')) {
      // Initialize GA only after consent
      initGA();
    }
  }, [consent]);

  if (consent !== null) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-sm text-slate-800">We use cookies to improve your experience. By continuing, you agree to our use of analytics cookies.</div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => {
            localStorage.setItem(CONSENT_KEY, 'false');
            setConsent(false);
          }}>Reject</Button>
          <Button onClick={() => {
            localStorage.setItem(CONSENT_KEY, 'true');
            setConsent(true);
          }}>Accept</Button>
        </div>
      </div>
    </div>
  );
}
