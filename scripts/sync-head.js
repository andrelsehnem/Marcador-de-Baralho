const fs = require('fs');
const path = require('path');

const sourceIndexPath = path.join(__dirname, '../index.html');
const distIndexPath = path.join(__dirname, '../dist/index.html');

if (!fs.existsSync(sourceIndexPath)) {
  console.log('❌ Arquivo index.html da raiz não encontrado');
  process.exit(0);
}

if (!fs.existsSync(distIndexPath)) {
  console.log('❌ Arquivo dist/index.html não encontrado');
  process.exit(0);
}

const sourceHtml = fs.readFileSync(sourceIndexPath, 'utf8');
let distHtml = fs.readFileSync(distIndexPath, 'utf8');

const sourceLangMatch = sourceHtml.match(/<html\b[^>]*lang=["']([^"']+)["'][^>]*>/i);

if (sourceLangMatch) {
  const sourceLang = sourceLangMatch[1];
  distHtml = distHtml.replace(/<html\b([^>]*)>/i, (match, attrs) => {
    if (/\slang=["'][^"']+["']/i.test(attrs)) {
      return `<html${attrs.replace(/\slang=["'][^"']+["']/i, ` lang="${sourceLang}"`)}>`;
    }

    return `<html${attrs} lang="${sourceLang}">`;
  });
}

function extractTag(html, pattern) {
  return html.match(pattern)?.[0]?.trim() || null;
}

function upsertBlock(html, existingPattern, newBlock) {
  if (!newBlock) {
    return html;
  }

  if (existingPattern.test(html)) {
    return html.replace(existingPattern, newBlock);
  }

  return html.replace('</head>', `    ${newBlock}\n</head>`);
}

const blocks = {
  viewport: extractTag(sourceHtml, /<meta\b[^>]*name=["']viewport["'][^>]*>/i),
  themeColor: extractTag(sourceHtml, /<meta\b[^>]*name=["']theme-color["'][^>]*>/i),
  description: extractTag(sourceHtml, /<meta\b[^>]*name=["']description["'][^>]*>/i),
  appleMobileWebAppCapable: extractTag(sourceHtml, /<meta\b[^>]*name=["']apple-mobile-web-app-capable["'][^>]*>/i),
  appleMobileWebAppStatusBarStyle: extractTag(sourceHtml, /<meta\b[^>]*name=["']apple-mobile-web-app-status-bar-style["'][^>]*>/i),
  title: extractTag(sourceHtml, /<title[\s\S]*?<\/title>/i),
  icon: extractTag(sourceHtml, /^[ \t]*<link\b.*rel=["'][^"']*icon[^"']*["'].*$/im),
  gtagSrc: extractTag(sourceHtml, /<script\b[^>]*src=["']https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=[^"']+["'][^>]*><\/script>/i),
  gtagInline: extractTag(sourceHtml, /<script>\s*window\.dataLayer = window\.dataLayer \|\| \[\];[\s\S]*?<\/script>/i),
};

distHtml = upsertBlock(
  distHtml,
  /<meta\b[^>]*name=["']viewport["'][^>]*>/i,
  blocks.viewport
);

distHtml = upsertBlock(
  distHtml,
  /<meta\b[^>]*name=["']theme-color["'][^>]*>/i,
  blocks.themeColor
);

distHtml = upsertBlock(
  distHtml,
  /<meta\b[^>]*name=["']description["'][^>]*>/i,
  blocks.description
);

distHtml = upsertBlock(
  distHtml,
  /<meta\b[^>]*name=["']apple-mobile-web-app-capable["'][^>]*>/i,
  blocks.appleMobileWebAppCapable
);

distHtml = upsertBlock(
  distHtml,
  /<meta\b[^>]*name=["']apple-mobile-web-app-status-bar-style["'][^>]*>/i,
  blocks.appleMobileWebAppStatusBarStyle
);

distHtml = upsertBlock(
  distHtml,
  /<title[\s\S]*?<\/title>/i,
  blocks.title
);

distHtml = upsertBlock(
  distHtml,
  /^[ \t]*<link\b.*rel=["'][^"']*icon[^"']*["'].*$/im,
  blocks.icon
);

distHtml = upsertBlock(
  distHtml,
  /<script\b[^>]*src=["']https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=[^"']+["'][^>]*><\/script>/i,
  blocks.gtagSrc
);

distHtml = upsertBlock(
  distHtml,
  /<script>\s*window\.dataLayer = window\.dataLayer \|\| \[\];[\s\S]*?<\/script>/i,
  blocks.gtagInline
);

fs.writeFileSync(distIndexPath, distHtml, 'utf8');
console.log('✅ Head do index.html da raiz sincronizado com dist/index.html');