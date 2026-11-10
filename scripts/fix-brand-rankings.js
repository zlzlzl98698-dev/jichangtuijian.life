const fs = require('fs');
const path = require('path');

const brandsData = JSON.parse(fs.readFileSync('c:\\Users\\Pro User\\Desktop\\jichangtuijian.life\\data\\brands.json', 'utf8'));
const brandsDir = 'c:\\Users\\Pro User\\Desktop\\jichangtuijian.life\\content\\brands';

brandsData.forEach(b => {
  const filePath = path.join(brandsDir, `${b.slug}.md`);
  if (!fs.existsSync(filePath)) return;

  let text = fs.readFileSync(filePath, 'utf8');

  // 确保注入 brandName, weight, isTop10
  if (!text.includes(`brandName: "${b.name}"`)) {
    text = text.replace(
      /rank:\s*\d+/,
      `rank: ${b.rank}\nweight: ${b.rank}\nbrandName: "${b.name}"\nisTop10: ${b.rank <= 10}`
    );
  }

  fs.writeFileSync(filePath, text, 'utf8');
});

console.log('Successfully injected brandName, weight and isTop10 into all 42 brand markdown files.');
