#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const translationFile = path.join(__dirname, '..', 'assets', 'data', 'pages', 'translation-page03.json');

// 读取翻译文件
const data = JSON.parse(fs.readFileSync(translationFile, 'utf8'));

console.log(`Fixing problematic selectors...`);

// 修复有问题的字段选择器
const fixes = [
  {
    key: 'Arrival_Flight_Dynamic',
    newSelectors: [
      'text:Arrival Flight (if known)',
      'text:Arrival Flight',
      'label[for*="flight"]',
      'label:contains("Arrival Flight")'
    ]
  },
  {
    key: 'Arrival_City_Dynamic', 
    newSelectors: [
      'text:Arrival City',
      'label[for*="city"]',
      'label:contains("Arrival City")'
    ]
  },
  {
    key: 'Date_of_Departure_Dynamic',
    newSelectors: [
      'text:Date of Departure from U.S.',
      'text:Date of Departure',
      'label:contains("Departure")'
    ]
  },
  {
    key: 'Departure_Flight_Dynamic',
    newSelectors: [
      'text:Departure Flight (if known)',
      'text:Departure Flight',
      'label:contains("Departure Flight")'
    ]
  },
  {
    key: 'Departure_City_Dynamic',
    newSelectors: [
      'text:Departure City',
      'label:contains("Departure City")'
    ]
  }
];

// 应用修复
fixes.forEach(fix => {
  const field = data.fields.find(f => f.key === fix.key);
  if (field) {
    field.selectors = fix.newSelectors;
    console.log(`✅ Updated selectors for ${fix.key}`);
  } else {
    console.log(`⚠️ Field ${fix.key} not found`);
  }
});

// 写回文件
fs.writeFileSync(translationFile, JSON.stringify(data, null, 2), 'utf8');

console.log('✅ Fixed problematic selectors successfully!');
