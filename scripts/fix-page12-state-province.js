import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.resolve(__dirname, '../assets/data/pages/translation-page12.json');

function fixPage12StateProvince() {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    const json = JSON.parse(data);

    // 查找现有的state_province字段
    const stateProvinceIndex = json.fields.findIndex(field => field.key === 'state_province');
    
    if (stateProvinceIndex !== -1) {
      // 修改现有字段，只使用一个最准确的选择器
      json.fields[stateProvinceIndex].selectors = [
        "#ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEmpl_ctl00_lblEmployerState"
      ];
      console.log('✅ Updated first State/Province field with specific ID selector');
    }

    // 添加第二个State/Province字段
    const secondStateProvinceField = {
      "key": "state_province_2",
      "selectors": [
        "#ctl00_SiteContentPlaceHolder_FormView1_dtlEducation_ctl00_lblEducationState",
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
    };

    // 检查是否已经存在第二个字段
    const existingSecondField = json.fields.find(field => 
      field.key === 'state_province_2' || 
      field.selectors.includes("#ctl00_SiteContentPlaceHolder_FormView1_dtlEducation_ctl00_lblEducationState")
    );

    if (!existingSecondField) {
      json.fields.push(secondStateProvinceField);
      console.log('✅ Added second State/Province field for education section');
    } else {
      console.log('⚠️ Second State/Province field already exists');
    }

    // 写回文件
    fs.writeFileSync(filePath, JSON.stringify(json, null, 2), 'utf8');
    console.log('✅ Successfully fixed page12 State/Province fields');

  } catch (error) {
    console.error('❌ Error fixing page12 State/Province:', error);
  }
}

fixPage12StateProvince();
