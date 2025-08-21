import fs from 'fs';
import path from 'path';

const filePath = path.resolve('assets/data/pages/translation-page10.json');

// Read the current JSON file
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Fields that were reported as "No element found" in console
const unusedFields = [
  "Spouse's Full Name (include Maiden Name)",
  "Spouse's Surnames", 
  "Spouse's Given Names",
  "Spouse's Date of Birth",
  "Spouse's Country/Region of Origin (Nationality)",
  "Street Address (Line 1)",
  "Street Address (Line 2)", 
  "City", // Note: this conflicts with our working "City" field
  "State/Province",
  "Postal Zone/ZIP Code",
  "Country/Region" // Note: this conflicts with our working "Country/Region" field
];

// Remove fields that match the unused field names, but be careful with conflicts
const originalCount = data.fields.length;
data.fields = data.fields.filter(field => {
  // Keep our working selectors that found matches
  if (field.key === 'spouse_place_of_birth' || 
      field.key === 'spouse_birth_city' || 
      field.key === 'spouse_birth_country' || 
      field.key === 'spouse_address') {
    return true;
  }
  
  // Remove fields with exact English text matches to console errors
  const shouldRemove = unusedFields.includes(field.en);
  if (shouldRemove) {
    console.log(`Removing unused field: ${field.en} (key: ${field.key})`);
  }
  return !shouldRemove;
});

const removedCount = originalCount - data.fields.length;

// Write the updated data back to the file
fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
console.log(`Cleaned up ${removedCount} unused fields from page10.json`);
