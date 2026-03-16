import { NextResponse } from 'next/server';

const HTML_URL = 'https://raw.githubusercontent.com/Betti-dil/Sunrise-glow/main/Sunrise-glow.html';

export async function GET() {
  const res = await fetch(HTML_URL, { next: { revalidate: 60 } });
  let html = await res.text();
  // Rewrite relative asset paths to raw GitHub URLs
  const base = 'https://raw.githubusercontent.com/Betti-dil/Sunrise-glow/main/';
  html = html.replace(/src="Icons\//g, `src="${base}Icons/`);
  html = html.replace(/src="Components\//g, `src="${base}Components/`);
  html = html.replace(/href="Components\//g, `href="${base}Components/`);
  return new NextResponse(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
}
