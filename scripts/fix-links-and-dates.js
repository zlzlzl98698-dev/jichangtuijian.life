const fs = require('fs');
const path = require('path');

const contentDir = 'c:\\Users\\Pro User\\Desktop\\jichangtuijian.life\\content';
const layoutsDir = 'c:\\Users\\Pro User\\Desktop\\jichangtuijian.life\\layouts';

// 1. 修复 Markdown 文件中的 date 字段
function fixDates(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(f => {
    const fullPath = path.join(dir, f);
    if (fs.statSync(fullPath).isDirectory()) {
      fixDates(fullPath);
    } else if (f.endsWith('.md')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('datePublished:') && !content.includes('\ndate:')) {
        const match = content.match(/datePublished:\s*"([^"]+)"/);
        if (match) {
          content = content.replace('datePublished:', 'date: "' + match[1] + '"\ndatePublished:');
          fs.writeFileSync(fullPath, content, 'utf8');
          console.log('Fixed date in:', f);
        }
      }
    }
  });
}
fixDates(contentDir);

// 2. 修复 layouts 中的 .Permalink 为 .RelPermalink，确保本地与生产相对路径无缝工作
function fixLayouts(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(f => {
    const fullPath = path.join(dir, f);
    if (fs.statSync(fullPath).isDirectory()) {
      fixLayouts(fullPath);
    } else if (f.endsWith('.html')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      // 替换 href="{{ .Permalink }}" 为 href="{{ .RelPermalink }}"
      // 但保留 schema.json 中的全量绝对 URL
      if (!fullPath.includes('schema.html')) {
        const updated = content.replace(/href="{{\s*\.Permalink\s*}}"/g, 'href="{{ .RelPermalink }}"');
        if (updated !== content) {
          fs.writeFileSync(fullPath, updated, 'utf8');
          console.log('Fixed Permalinks in layout:', f);
        }
      }
    }
  });
}
fixLayouts(layoutsDir);

console.log('Completed fixing all dates and links!');
