#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const translationFile = path.join(__dirname, '..', 'assets', 'data', 'pages', 'translation-page03.json');

// 读取翻译文件
const data = JSON.parse(fs.readFileSync(translationFile, 'utf8'));

// 不需要翻译的字段关键词（通用操作和格式）
const unnecessaryKeys = [
  'Add_Another',           // "Add Another" - 通用操作按钮
  'Remove',               // "Remove" - 通用操作按钮  
  'ZIP_Code_Help_Text',   // "(e.g., 12345 or 12345-1234)" - 格式示例
  'Yes',                  // "Yes" - 简单英文，无需翻译
  'No',                   // "No" - 简单英文，无需翻译
];

// 不需要翻译的选择器文本（包含格式信息的）
const unnecessarySelectors = [
  'text:(Format: DD-MMM-YYYY)',     // 日期格式说明
  'text:Format: DD-MMM-YYYY',      // 日期格式说明（不带括号）
];

console.log(`Original fields count: ${data.fields.length}`);

// 过滤掉不需要的字段
data.fields = data.fields.filter(field => {
  // 按key过滤
  if (unnecessaryKeys.includes(field.key)) {
    console.log(`Removing field by key: ${field.key}`);
    return false;
  }
  
  // 按选择器过滤
  const hasUnnecessarySelector = field.selectors.some(selector => 
    unnecessarySelectors.includes(selector)
  );
  
  if (hasUnnecessarySelector) {
    console.log(`Removing field by selector: ${field.key} - ${field.selectors[0]}`);
    return false;
  }
  
  return true;
});

console.log(`New fields count: ${data.fields.length}`);

// 写回文件
fs.writeFileSync(translationFile, JSON.stringify(data, null, 2), 'utf8');

console.log('✅ Removed unnecessary translations successfully!');
