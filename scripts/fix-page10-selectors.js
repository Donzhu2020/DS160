import fs from 'fs';
import path from 'path';

const filePath = path.resolve('assets/data/pages/translation-page10.json');

// Read the current JSON file
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Find and update specific fields with better selectors
const fieldsToUpdate = {
  "spouse_place_of_birth": {
    "selectors": [
      "text:\"Spouse's Place of Birth\"",
      "label:contains('Place of Birth')",
      "text:\"Place of Birth\""
    ]
  },
  "spouse_birth_city": {
    "selectors": [
      "label:contains('City'):contains('Birth')",
      "text:\"City\" + input[placeholder*='city']",
      "div:contains('Place of Birth') label:contains('City')"
    ]
  },
  "spouse_birth_country": {
    "selectors": [
      "label:contains('Country/Region'):contains('Birth')",
      "div:contains('Place of Birth') label:contains('Country')",
      "select[name*='birth'] + label:contains('Country')"
    ]
  },
  "spouse_address": {
    "selectors": [
      "text:\"Spouse's Address\"",
      "label:contains('Spouse') label:contains('Address')",
      "select:contains('SAME AS HOME ADDRESS')"
    ]
  }
};

// Update the fields
data.fields.forEach(field => {
  if (fieldsToUpdate[field.key]) {
    field.selectors = fieldsToUpdate[field.key].selectors;
    console.log(`Updated selectors for: ${field.key}`);
  }
});

// Write the updated data back to the file
fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
console.log(`Updated selectors for ${Object.keys(fieldsToUpdate).length} fields`);
