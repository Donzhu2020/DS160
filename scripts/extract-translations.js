/**
 * Translation Extraction Script
 * Extracts translations from the monolithic full-translation.js file
 * and converts them into modular JSON files
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read the full-translation.js file
const fullTranslationContent = readFileSync(join(__dirname, '../dist/content/full-translation.js'), 'utf-8');

// Function to extract translation arrays from the JS file
function extractTranslationArrays(content) {
  const arrays = {};
  const dynamicArrays = {};
  
  // Regular expressions to match translation arrays
  const staticArrayRegex = /const\s+(page\d+Translations)\s*=\s*\[([\s\S]*?)\];/g;
  const dynamicArrayRegex = /const\s+(page\d+DynamicTranslations)\s*=\s*\[([\s\S]*?)\];/g;
  
  let match;
  
  // Extract static translations
  while ((match = staticArrayRegex.exec(content)) !== null) {
    const arrayName = match[1];
    const arrayContent = match[2];
    const pageNumber = arrayName.match(/page(\d+)/)[1];
    
    try {
      // Parse the array content safely
      const translationsArray = parseTranslationArray(arrayContent, 'static');
      arrays[`page${pageNumber}`] = translationsArray;
    } catch (error) {
      console.warn(`Failed to parse ${arrayName}:`, error.message);
    }
  }
  
  // Extract dynamic translations
  while ((match = dynamicArrayRegex.exec(content)) !== null) {
    const arrayName = match[1];
    const arrayContent = match[2];
    const pageNumber = arrayName.match(/page(\d+)/)[1];
    
    try {
      const translationsArray = parseTranslationArray(arrayContent, 'dynamic');
      dynamicArrays[`page${pageNumber}`] = translationsArray;
    } catch (error) {
      console.warn(`Failed to parse ${arrayName}:`, error.message);
    }
  }
  
  return { static: arrays, dynamic: dynamicArrays };
}

// Function to safely parse translation array content
function parseTranslationArray(arrayContent, type) {
  // Clean up the content and prepare for parsing
  const cleanContent = arrayContent
    .replace(/\/\/.*$/gm, '') // Remove comments
    .replace(/^\s+|\s+$/gm, '') // Trim whitespace
    .replace(/,\s*$/, ''); // Remove trailing comma
  
  // Split by object boundaries
  const objects = [];
  const objectRegex = /\{[^}]*\}/g;
  let match;
  
  while ((match = objectRegex.exec(cleanContent)) !== null) {
    try {
      // Clean up the object string
      let objectStr = match[0]
        .replace(/(\w+):/g, '"$1":') // Quote property names
        .replace(/'/g, '"') // Replace single quotes with double quotes
        .replace(/,(\s*})/g, '$1'); // Remove trailing commas
      
      const obj = JSON.parse(objectStr);
      
      if (type === 'static' && obj.id && obj.translation) {
        objects.push({
          key: obj.id.replace(/^ctl00_SiteContentPlaceHolder_FormView1_/, ''),
          selectors: [`#${obj.id}`],
          en: obj.id.split('_').pop().replace(/([A-Z])/g, ' $1').trim(),
          zh: obj.translation,
          note: '',
          level: 'brief'
        });
      } else if (type === 'dynamic' && obj.text && obj.translation) {
        objects.push({
          key: obj.text.toLowerCase().replace(/[^a-z0-9]/g, '_'),
          selectors: [`text:"${obj.text}"`],
          en: obj.text,
          zh: obj.translation,
          note: '',
          level: 'brief'
        });
      }
    } catch (error) {
      console.warn('Failed to parse object:', match[0]);
    }
  }
  
  return objects;
}

// Function to generate page metadata
function generatePageMetadata(pageNumber, staticTranslations, dynamicTranslations) {
  const pageDescriptions = {
    '1': 'Personal Information 1 - 个人信息第1页',
    '2': 'Personal Information 2 - 个人信息第2页',
    '3': 'Travel Information - 旅行信息',
    '4': 'Travel Companions - 旅行同伴',
    '5': 'Previous US Travel - 以前的美国旅行',
    '6': 'US Point of Contact Information - 美国联系人信息',
    '7': 'Family Information: Relatives - 家庭信息：亲属',
    '8': 'Family Information: Spouse - 家庭信息：配偶',
    '9': 'Work/Education/Training Information - 工作/教育/培训信息',
    '10': 'Work/Education/Training Information 2 - 工作/教育/培训信息第2页',
    '11': 'Additional Work/Education/Training Information - 附加工作/教育/培训信息',
    '12': 'Security and Background: Part 1 - 安全和背景信息第1部分',
    '13': 'Security and Background: Part 2 - 安全和背景信息第2部分',
    '14': 'Security and Background: Part 3 - 安全和背景信息第3部分',
    '15': 'Security and Background: Part 4 - 安全和背景信息第4部分',
    '16': 'Security and Background: Part 5 - 安全和背景信息第5部分',
    '17': 'SEVIS Information - SEVIS信息',
    '18': 'Photo Upload - 照片上传'
  };
  
  const allFields = [...staticTranslations, ...dynamicTranslations];
  
  return {
    version: '2025-01-01',
    pageId: `page${pageNumber}`,
    description: pageDescriptions[pageNumber] || `DS-160 Page ${pageNumber}`,
    fields: allFields
  };
}

// Main extraction function
function extractAndCreateFiles() {
  console.log('Starting translation extraction...');
  
  const { static: staticArrays, dynamic: dynamicArrays } = extractTranslationArrays(fullTranslationContent);
  
  // Ensure output directory exists
  const outputDir = join(__dirname, '../assets/data/pages');
  mkdirSync(outputDir, { recursive: true });
  
  // Get all page numbers
  const allPages = new Set([
    ...Object.keys(staticArrays).map(p => p.replace('page', '')),
    ...Object.keys(dynamicArrays).map(p => p.replace('page', ''))
  ]);
  
  console.log(`Found translations for ${allPages.size} pages:`, Array.from(allPages).sort());
  
  // Generate JSON files for each page
  for (const pageNum of allPages) {
    const staticTranslations = staticArrays[`page${pageNum}`] || [];
    const dynamicTranslations = dynamicArrays[`page${pageNum}`] || [];
    
    const pageData = generatePageMetadata(pageNum, staticTranslations, dynamicTranslations);
    
    const filename = `translation-page${pageNum.padStart(2, '0')}.json`;
    const filepath = join(outputDir, filename);
    
    writeFileSync(filepath, JSON.stringify(pageData, null, 2), 'utf-8');
    console.log(`✓ Created ${filename} with ${pageData.fields.length} fields`);
  }
  
  // Create an index file with all pages
  const indexData = {
    version: '2025-01-01',
    description: 'DS-160 Translation Data Index',
    pages: Array.from(allPages).sort().map(pageNum => ({
      pageId: `page${pageNum}`,
      file: `translation-page${pageNum.padStart(2, '0')}.json`,
      fieldCount: (staticArrays[`page${pageNum}`] || []).length + (dynamicArrays[`page${pageNum}`] || []).length
    }))
  };
  
  writeFileSync(join(outputDir, 'index.json'), JSON.stringify(indexData, null, 2), 'utf-8');
  console.log('✓ Created index.json');
  
  console.log('Translation extraction completed!');
}

// Run the extraction
extractAndCreateFiles();
