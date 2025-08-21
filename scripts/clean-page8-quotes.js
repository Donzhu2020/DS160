import fs from 'fs';

// 读取page8翻译文件
const filePath = 'assets/data/pages/translation-page08.json';
let content = fs.readFileSync(filePath, 'utf8');

// 移除所有 text: 选择器中的多余双引号
// 将 "text:\"Text\"" 改为 "text:Text"
content = content.replace(/"text:\\"([^"]+)\\""/g, '"text:$1"');

// 写回文件
fs.writeFileSync(filePath, content);

console.log('✅ Cleaned quotes from page8 translation file');

// 验证修复
const data = JSON.parse(content);
let fixedCount = 0;

data.fields.forEach(field => {
  field.selectors.forEach(selector => {
    if (selector.startsWith('text:') && !selector.includes('\\"')) {
      fixedCount++;
    }
  });
});

console.log(`📝 Fixed ${fixedCount} text selectors in page8`);
console.log(`📊 Total fields: ${data.fields.length}`);
