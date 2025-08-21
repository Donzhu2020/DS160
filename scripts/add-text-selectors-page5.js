// 为page5添加一些基础的text:选择器

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jsonPath = path.join(__dirname, '../assets/data/pages/translation-page05.json');

console.log('🔧 Adding text: selectors to page5...');

try {
  // 读取JSON文件
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  
  // 为常见的字段添加text:选择器
  const textMappings = [
    { key: 'lblPREV_US_TRAVEL_IND', text: 'Have you ever been in the U.S.?' },
    { key: 'lblPageNote1', text: 'Previous U.S. Travel' },
    { key: 'previous_us_travel_title', text: 'Previous U.S. Travel' },
    // 添加更多常见字段...
  ];
  
  let addedCount = 0;
  
  // 为匹配的字段添加text:选择器
  data.fields.forEach(field => {
    const mapping = textMappings.find(m => m.key === field.key);
    if (mapping) {
      // 如果没有text:选择器，则添加
      const hasTextSelector = field.selectors.some(s => s.startsWith('text:'));
      if (!hasTextSelector) {
        field.selectors.unshift(`text:${mapping.text}`);
        console.log(`✅ Added text selector for: ${field.key}`);
        addedCount++;
      }
    }
  });
  
  // 添加一个基础的标题字段（如果不存在）
  const hasTitle = data.fields.some(f => f.key.includes('title') || f.selectors.some(s => s.includes('Previous')));
  if (!hasTitle) {
    data.fields.unshift({
      "key": "Previous_US_Travel_Title",
      "selectors": [
        "text:Previous U.S. Travel"
      ],
      "en": "Previous U.S. Travel",
      "zh": {
        "brief": "以前的美国旅行",
        "detailed": "以前的美国旅行"
      },
      "note": {
        "brief": "",
        "detailed": ""
      }
    });
    addedCount++;
    console.log('✅ Added title field');
  }
  
  // 写回文件
  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');
  
  console.log(`✅ Added ${addedCount} text selectors to page5`);
  console.log('🎉 Page5 enhancement completed!');
  
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}
