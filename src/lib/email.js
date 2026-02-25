import emailjs from "@emailjs/browser";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export async function sendContactEmail({ name, email, message }) {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    throw new Error("EmailJS not configured. Check .env.local.");
  }

const avatar_url = `https://robohash.org/${encodeURIComponent(email)}?set=set4&size=80x80`;

const templateParams = {
  name,
  email,
  reply_to: email,
  message,
  time: new Date().toLocaleString(),
  title: `Message from ${name}`,
  avatar_url,
};

  return emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, { publicKey: PUBLIC_KEY });
}