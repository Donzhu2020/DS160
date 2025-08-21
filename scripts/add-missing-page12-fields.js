import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.resolve(__dirname, '../assets/data/pages/translation-page12.json');

function addMissingPage12Fields() {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    const json = JSON.parse(data);

    // 需要添加的三个字段
    const fieldsToAdd = [
      {
        "key": "telephone_number_text",
        "selectors": [
          "text:Telephone Number"
        ],
        "en": "Telephone Number",
        "zh": {
          "brief": "电话号码",
          "detailed": "电话号码"
        },
        "note": {
          "brief": "",
          "detailed": ""
        }
      },
      {
        "key": "supervisor_given_names_text",
        "selectors": [
          "text:Supervisor's Given Names"
        ],
        "en": "Supervisor's Given Names",
        "zh": {
          "brief": "主管名字",
          "detailed": "主管的名字"
        },
        "note": {
          "brief": "",
          "detailed": ""
        }
      },
      {
        "key": "state_province_text",
        "selectors": [
          "text:State/Province"
        ],
        "en": "State/Province",
        "zh": {
          "brief": "州/省",
          "detailed": "州/省"
        },
        "note": {
          "brief": "",
          "detailed": ""
        }
      }
    ];

    // 检查每个字段是否已经存在
    fieldsToAdd.forEach(newField => {
      const existingField = json.fields.find(field => 
        field.key === newField.key || 
        field.en === newField.en ||
        field.selectors.some(selector => newField.selectors.includes(selector))
      );

      if (!existingField) {
        json.fields.push(newField);
        console.log(`✅ Added field: ${newField.en} (key: ${newField.key})`);
      } else {
        console.log(`⚠️ Field already exists: ${newField.en} (key: ${existingField.key})`);
      }
    });

    // 写回文件
    fs.writeFileSync(filePath, JSON.stringify(json, null, 2), 'utf8');
    console.log('✅ Successfully updated translation-page12.json');

  } catch (error) {
    console.error('❌ Error updating page12.json:', error);
  }
}

addMissingPage12Fields();
