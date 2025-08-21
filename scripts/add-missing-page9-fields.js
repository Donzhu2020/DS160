import fs from 'fs';
import path from 'path';

const filePath = path.resolve('assets/data/pages/translation-page09.json');

// Read the current JSON file
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Fields to add based on console logs and user screenshot
const fieldsToAdd = [
  {
    "key": "relationship_to_you",
    "selectors": [
      "text:\"Relationship to You\""
    ],
    "en": "Relationship to You",
    "zh": {
      "brief": "与您的关系",
      "detailed": "与您的关系"
    },
    "note": {
      "brief": "",
      "detailed": ""
    }
  },
  {
    "key": "relatives_status",
    "selectors": [
      "text:\"Relative's Status\""
    ],
    "en": "Relative's Status",
    "zh": {
      "brief": "亲属状态",
      "detailed": "亲属状态"
    },
    "note": {
      "brief": "",
      "detailed": ""
    }
  },
  {
    "key": "other_relatives_question",
    "selectors": [
      "text:\"Do you have any other relatives in the United States?\""
    ],
    "en": "Do you have any other relatives in the United States?",
    "zh": {
      "brief": "您在美国还有其他亲属吗？",
      "detailed": "您在美国还有其他亲属吗？"
    },
    "note": {
      "brief": "",
      "detailed": ""
    }
  }
];

// Check if fields already exist and add them if they don't
fieldsToAdd.forEach(newField => {
  const exists = data.fields.some(field => field.key === newField.key);
  if (!exists) {
    data.fields.push(newField);
    console.log(`Added field: ${newField.key}`);
  } else {
    console.log(`Field already exists: ${newField.key}`);
  }
});

// Write the updated data back to the file
fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
console.log(`Updated ${filePath} with ${fieldsToAdd.length} potential new fields`);
