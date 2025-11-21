// Centralized contact helpers and constants
export const WHATSAPP_NUMBER = '919497544143'; // Business WhatsApp (no plus)
export const TEL_NUMBER = '+919497544143'; // Telephone link with plus

export function openWhatsApp(message: string) {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function openTel() {
  window.open(`tel:${TEL_NUMBER}`);
}

export function telHref() {
  return `tel:${TEL_NUMBER}`;
}
