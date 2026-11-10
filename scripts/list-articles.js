const fs = require('fs');

const glob = (dir) => {
  let results = [];
  fs.readdirSync(dir).forEach(file => {
    let full = dir + '/' + file;
    if (fs.statSync(full).isDirectory()) results = results.concat(glob(full));
    else if (file.endsWith('.md')) results.push(full);
  });
  return results;
};

const allMds = glob('content');
console.log('Total md files:', allMds.length);

const nonBrand = allMds.filter(f => !f.includes('/brands/') && !f.endsWith('_index.md'));
nonBrand.forEach(f => {
  const c = fs.readFileSync(f, 'utf8');
  const titleMatch = c.match(/title:\s*"([^"]+)"/);
  const title = titleMatch ? titleMatch[1] : '';
  const chineseChars = (c.match(/[\u4e00-\u9fa5]/g) || []).length;
  console.log(`${f} -> ${title} | 汉字数: ${chineseChars}`);
});
