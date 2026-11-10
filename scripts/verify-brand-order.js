const fs = require('fs');

function checkPage(pathRel, pageName) {
  const html = fs.readFileSync(pathRel, 'utf8');
  const regex = /<span class="brand-rank[^"]*">([^<]+)<\/span>[\s\S]*?<h3 class="brand-name"><a [^>]+>([^<]+)<\/a>/g;
  const matches = [...html.matchAll(regex)];

  console.log(`=== ${pageName} (Total: ${matches.length} Cards) ===`);
  matches.slice(0, 10).forEach((m, i) => {
    console.log(`${m[1]} -> ${m[2]}`);
  });
}

checkPage('c:\\Users\\Pro User\\Desktop\\jichangtuijian.life\\public\\index.html', '首页 Homepage');
checkPage('c:\\Users\\Pro User\\Desktop\\jichangtuijian.life\\public\\brands\\index.html', '品牌库 Brands Directory');
