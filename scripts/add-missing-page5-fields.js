// 为page5添加用户提到的缺失字段

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jsonPath = path.join(__dirname, '../assets/data/pages/translation-page05.json');

console.log('🔧 Adding missing fields to page5...');

try {
  // 读取JSON文件
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  
  // 要添加的缺失字段
  const missingFields = [
    {
      "key": "Drivers_License_Number",
      "selectors": [
        "text:Driver's License Number"
      ],
      "en": "Driver's License Number",
      "zh": {
        "brief": "驾照号码",
        "detailed": "驾照号码"
      },
      "note": {
        "brief": "",
        "detailed": ""
      }
    },
    {
      "key": "Date_Last_Visa_Issued",
      "selectors": [
        "text:Date Last Visa Was Issued"
      ],
      "en": "Date Last Visa Was Issued",
      "zh": {
        "brief": "上次签证签发日期",
        "detailed": "上次签证签发日期"
      },
      "note": {
        "brief": "",
        "detailed": ""
      }
    },
    {
      "key": "Visa_Number",
      "selectors": [
        "text:Visa Number"
      ],
      "en": "Visa Number",
      "zh": {
        "brief": "签证号码",
        "detailed": "签证号码"
      },
      "note": {
        "brief": "",
        "detailed": ""
      }
    },
    {
      "key": "Visa_Lost_Stolen",
      "selectors": [
        "text:Has your U.S. Visa ever been lost or stolen?"
      ],
      "en": "Has your U.S. Visa ever been lost or stolen?",
      "zh": {
        "brief": "您的美国签证是否曾经丢失或被盗？",
        "detailed": "您的美国签证是否曾经丢失或被盗？"
      },
      "note": {
        "brief": "",
        "detailed": ""
      }
    },
    {
      "key": "Visa_Cancelled_Revoked",
      "selectors": [
        "text:Has your U.S. Visa ever been cancelled or revoked?"
      ],
      "en": "Has your U.S. Visa ever been cancelled or revoked?",
      "zh": {
        "brief": "您的美国签证是否曾经被取消或撤销？",
        "detailed": "您的美国签证是否曾经被取消或撤销？"
      },
      "note": {
        "brief": "",
        "detailed": ""
      }
    }
  ];
  
  let addedCount = 0;
  
  // 检查并添加缺失的字段
  missingFields.forEach(newField => {
    const exists = data.fields.some(field => field.key === newField.key);
    if (!exists) {
      data.fields.push(newField);
      console.log(`✅ Added: ${newField.en}`);
      addedCount++;
    } else {
      console.log(`⚠️ Already exists: ${newField.en}`);
    }
  });
  
  // 写回文件
  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');
  
  console.log(`✅ Added ${addedCount} missing fields to page5`);
  console.log(`📊 Total fields: ${data.fields.length}`);
  console.log('🎉 Missing fields added successfully!');
  
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}
