import { NextResponse } from 'next/server';

const BASE = 'https://raw.githubusercontent.com/Betti-dil/Sunrise-glow/main/';

async function fetchText(path: string) {
  const res = await fetch(BASE + path);
  return res.ok ? res.text() : '';
}

export async function GET() {
  const [html, buttonsCss, chatGlowCss, pillsCss] = await Promise.all([
    fetchText('Sunrise-glow.html'),
    fetchText('Components/buttons.css'),
    fetchText('Components/chat-w-glow.css'),
    fetchText('Components/pills.css'),
  ]);

  let result = html;
  result = result.replace(
    /<link[^>]*href="Components\/buttons\.css"[^>]*>/,
    `<style>\n${buttonsCss}\n</style>`
  );
  result = result.replace(
    /<link[^>]*href="Components\/chat-w-glow\.css"[^>]*>/,
    `<style>\n${chatGlowCss}\n</style>`
  );
  result = result.replace(
    /<link[^>]*href="Components\/pills\.css"[^>]*>/,
    `<style>\n${pillsCss}\n</style>`
  );

  result = result.replace(/src="Icons\//g, `src="${BASE}Icons/`);

  return new NextResponse(result, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}
