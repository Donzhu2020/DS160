import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.resolve(__dirname, '../assets/data/pages/translation-page11.json');

function addMissingPage11Fields() {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    const json = JSON.parse(data);

    // 需要添加的三个字段
    const fieldsToAdd = [
      {
        "key": "start_date_text",
        "selectors": [
          "text:Start Date"
        ],
        "en": "Start Date",
        "zh": {
          "brief": "开始日期",
          "detailed": "开始日期"
        },
        "note": {
          "brief": "",
          "detailed": ""
        }
      },
      {
        "key": "monthly_income_text",
        "selectors": [
          "text:Monthly Income in Local Currency (if employed)"
        ],
        "en": "Monthly Income in Local Currency (if employed)",
        "zh": {
          "brief": "月收入（当地货币）",
          "detailed": "月收入（当地货币，如果受雇）"
        },
        "note": {
          "brief": "",
          "detailed": ""
        }
      },
      {
        "key": "briefly_describe_duties",
        "selectors": [
          "text:Briefly describe your duties"
        ],
        "en": "Briefly describe your duties",
        "zh": {
          "brief": "简要描述工作职责",
          "detailed": "简要描述您的工作职责"
        },
        "note": {
          "brief": "",
          "detailed": ""
        }
      }
    ];

    // 添加字段到现有字段列表中
    json.fields.push(...fieldsToAdd);

    fs.writeFileSync(filePath, JSON.stringify(json, null, 2), 'utf8');
    console.log(`Added ${fieldsToAdd.length} missing fields to page11.json:`);
    fieldsToAdd.forEach(field => {
      console.log(`- ${field.en} (${field.key})`);
    });
  } catch (error) {
    console.error('Error adding missing page11 fields:', error);
  }
}

addMissingPage11Fields();
