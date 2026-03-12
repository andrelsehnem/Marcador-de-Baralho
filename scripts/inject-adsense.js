const fs = require('fs');
const path = require('path');

const distIndexPath = path.join(__dirname, '../dist/index.html');
const adsensePattern = /<script\s+async\s+src="https:\/\/pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js\?client=ca-pub-7478664676745892"\s*\n?\s*crossorigin="anonymous"><\/script>/g;
const adsenseScript = `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7478664676745892"
     crossorigin="anonymous"></script>`;

if (fs.existsSync(distIndexPath)) {
  let html = fs.readFileSync(distIndexPath, 'utf8');

  const matches = html.match(adsensePattern) || [];

  if (matches.length > 1) {
    html = html.replace(adsensePattern, '');
    html = html.replace('</head>', `    ${adsenseScript}\n</head>`);
    fs.writeFileSync(distIndexPath, html);
    console.log('✅ Scripts duplicados do AdSense removidos de dist/index.html');
  } else if (matches.length === 0) {
    html = html.replace('</head>', `    ${adsenseScript}\n</head>`);
    fs.writeFileSync(distIndexPath, html);
    console.log('✅ Script do AdSense adicionado ao dist/index.html');
  } else {
    console.log('✅ Script do AdSense já existe no dist/index.html');
  }
} else {
  console.log('❌ Arquivo dist/index.html não encontrado');
}
