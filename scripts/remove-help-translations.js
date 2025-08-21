// 移除所有Help相关的翻译字段

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jsonPath = path.join(__dirname, '../assets/data/pages/translation-page03.json');

console.log('🔧 Removing Help-related translation fields...');

try {
  // 读取JSON文件
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  
  // 统计删除前的字段数量
  const beforeCount = data.fields.length;
  
  // 移除所有key或en中包含"Help"的字段（不区分大小写）
  data.fields = data.fields.filter(field => {
    const keyContainsHelp = field.key && field.key.toLowerCase().includes('help');
    const enContainsHelp = field.en && field.en.toLowerCase().includes('help');
    
    if (keyContainsHelp || enContainsHelp) {
      console.log(`❌ Removing: "${field.key}" - "${field.en}"`);
      return false;
    }
    
    return true;
  });
  
  // 统计删除后的字段数量
  const afterCount = data.fields.length;
  const removedCount = beforeCount - afterCount;
  
  // 写回文件
  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');
  
  console.log(`✅ Removed ${removedCount} Help-related fields`);
  console.log(`📊 Fields: ${beforeCount} → ${afterCount}`);
  console.log('🎉 Help translations removed successfully!');
  
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}
