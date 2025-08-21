import fs from 'fs';
import path from 'path';

const filePath = path.resolve('assets/data/pages/translation-page10.json');

// Read the current JSON file
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Fields to add based on user feedback
const fieldsToAdd = [
  {
    "key": "spouse_place_of_birth",
    "selectors": [
      "text:\"Spouse's Place of Birth\""
    ],
    "en": "Spouse's Place of Birth",
    "zh": {
      "brief": "配偶出生地",
      "detailed": "配偶出生地"
    },
    "note": {
      "brief": "",
      "detailed": ""
    }
  },
  {
    "key": "spouse_birth_city",
    "selectors": [
      "text:\"City\""
    ],
    "en": "City",
    "zh": {
      "brief": "城市",
      "detailed": "城市"
    },
    "note": {
      "brief": "",
      "detailed": ""
    }
  },
  {
    "key": "spouse_birth_country",
    "selectors": [
      "text:\"Country/Region\""
    ],
    "en": "Country/Region",
    "zh": {
      "brief": "国家/地区",
      "detailed": "国家/地区"
    },
    "note": {
      "brief": "",
      "detailed": ""
    }
  },
  {
    "key": "spouse_address",
    "selectors": [
      "text:\"Spouse's Address\""
    ],
    "en": "Spouse's Address",
    "zh": {
      "brief": "配偶地址",
      "detailed": "配偶地址"
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
