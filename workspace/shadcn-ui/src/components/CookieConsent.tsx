import { useEffect, useState } from "react";

const CONSENT_KEY = "analytics_consent";

export default function CookieConsent() {
  const [consent, setConsent] = useState<boolean | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored === null) setConsent(null); else setConsent(stored === "true");
  }, []);

  if (consent !== null) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-sm text-slate-800">We use cookies to improve your experience.</div>
        <div className="flex gap-2">
          <button className="border px-3 py-2" onClick={() => { localStorage.setItem(CONSENT_KEY, "false"); setConsent(false); }}>Reject</button>
          <button className="bg-slate-900 text-white px-3 py-2" onClick={() => { localStorage.setItem(CONSENT_KEY, "true"); setConsent(true); }}>Accept</button>
        </div>
      </div>
    </div>
  );
}
