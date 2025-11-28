export const WHATSAPP_NUMBER = "919497544143";
export const TEL_NUMBER = "+919497544143";

export function openWhatsApp(message: string) {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

export function telHref() {
  return `tel:${TEL_NUMBER}`;
}
