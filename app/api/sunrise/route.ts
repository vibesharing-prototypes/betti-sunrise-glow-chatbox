import { NextResponse } from 'next/server';

const BASE = 'https://raw.githubusercontent.com/Betti-dil/Sunrise-glow/main/';

async function fetchText(path: string) {
  const res = await fetch(BASE + path, { next: { revalidate: 60 } });
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

  // Inline CSS (raw.githubusercontent serves text/plain, browsers ignore it)
  result = result.replace(
    /<link[^>]*href=\"Components\/buttons\.css\"[^>]*>/,
    '<style>\n' + buttonsCss + '\n</style>'
  );
  result = result.replace(
    /<link[^>]*href=\"Components\/chat-w-glow\.css\"[^>]*>/,
    '<style>\n' + chatGlowCss + '\n</style>'
  );
  result = result.replace(
    /[^>]*href=\"Components\/pills\.css\"[^>]*>/,
    '<style>\n' + pillsCss + '\n</style>'
  );

  // Rewrite icon src to absolute GitHub raw URLs
  result = result.replace(/src=\"Icons\//g, 'src=\"' + BASE + 'Icons/');

  return new NextResponse(result, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
    },
  });
}
