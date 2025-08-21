import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 创建一个简化的debug script专门用于Page12的问题字段
const debugScript = `
// Page12 Specific Debug - State/Province and Telephone Number
console.log('🔍 Page12 Specific Field Debug');

// 1. 查找所有包含"State/Province"的元素
console.log('\\n📍 All State/Province elements:');
const stateElements = Array.from(document.querySelectorAll('*')).filter(el => 
  el.textContent && el.textContent.includes('State/Province')
);
stateElements.forEach((el, index) => {
  console.log(\`[\${index}] \${el.tagName}#\${el.id || 'no-id'}.\${el.className || 'no-class'}\`);
  console.log(\`    Text: "\${el.textContent.trim()}"\`);
  console.log(\`    Parent: \${el.parentElement ? el.parentElement.tagName + '#' + (el.parentElement.id || 'no-id') : 'none'}\`);
});

// 2. 查找所有包含"Telephone Number"的元素
console.log('\\n📞 All Telephone Number elements:');
const phoneElements = Array.from(document.querySelectorAll('*')).filter(el => 
  el.textContent && el.textContent.includes('Telephone Number')
);
phoneElements.forEach((el, index) => {
  console.log(\`[\${index}] \${el.tagName}#\${el.id || 'no-id'}.\${el.className || 'no-class'}\`);
  console.log(\`    Text: "\${el.textContent.trim()}"\`);
  console.log(\`    Parent: \${el.parentElement ? el.parentElement.tagName + '#' + (el.parentElement.id || 'no-id') : 'none'}\`);
});

// 3. 测试具体的ID选择器
console.log('\\n🎯 Testing specific ID selectors:');
const testIds = [
  'ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEmpl_ctl00_lblEmployerState',
  'ctl00_SiteContentPlaceHolder_FormView1_dtlEducation_ctl00_lblEducationState'
];

testIds.forEach(id => {
  const el = document.getElementById(id);
  if (el) {
    console.log(\`✅ Found \${id}:\`);
    console.log(\`    Tag: \${el.tagName}, Text: "\${el.textContent.trim()}"\`);
    console.log(\`    Parent: \${el.parentElement ? el.parentElement.tagName + '#' + (el.parentElement.id || 'no-id') : 'none'}\`);
  } else {
    console.log(\`❌ NOT FOUND: \${id}\`);
  }
});

// 4. 查找所有包含"Education"的元素（帮助定位第二个State/Province）
console.log('\\n🎓 All Education-related elements:');
const educationElements = Array.from(document.querySelectorAll('*')).filter(el => 
  el.id && el.id.toLowerCase().includes('education')
);
educationElements.forEach((el, index) => {
  console.log(\`[\${index}] \${el.tagName}#\${el.id}\`);
  console.log(\`    Text: "\${el.textContent.trim().substring(0, 50)}..."\`);
});

console.log('\\n✅ Page12 Specific Debug Complete!');
`;

// 将debug script保存到文件中
fs.writeFileSync(path.resolve(__dirname, 'page12-specific-debug.js'), debugScript, 'utf8');

console.log('✅ Page12 specific debug script created: scripts/page12-specific-debug.js');
console.log('📋 Instructions:');
console.log('1. Copy the content of page12-specific-debug.js');
console.log('2. Paste it in the browser console on Page12');
console.log('3. Share the output to identify the correct selectors');
