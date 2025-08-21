// Script to debug page6 detection issue
console.log('=== DEBUG PAGE6 DETECTION ===');

const url = window.location.href;
const title = document.title;
const pageContent = document.body.textContent || '';

console.log('Current page info:');
console.log('URL:', url);
console.log('Title:', title);
console.log('Content preview:', pageContent.substring(0, 1000));

// Test individual patterns
const pagePatterns = [
  { pattern: /Personal\s+Information\s+1|Surnames.*Given\s+Names/i, pageId: 'page1' },
  { pattern: /Personal\s+Information\s+2|Nationality.*National.*Identification/i, pageId: 'page2' },
  { pattern: /Previous\s+U\.?S\.?\s+Travel|previousustravel/i, pageId: 'page5' },
  { pattern: /^Travel\s+Information(?!\s+Previous)/i, pageId: 'page3' },
  { pattern: /Travel\s+Companions/i, pageId: 'page4' },
  { pattern: /Address\s+and\s+Phone\s+Information|Point\s+of\s+Contact\s+Information|complete_contact/i, pageId: 'page6' },
];

console.log('\n=== PATTERN MATCHING RESULTS ===');
pagePatterns.forEach(({pattern, pageId}) => {
  const matches = pattern.test(pageContent);
  const titleMatches = pattern.test(title);
  const urlMatches = pattern.test(url);
  
  console.log(`${pageId}:`, {
    content: matches,
    title: titleMatches, 
    url: urlMatches,
    overall: matches || titleMatches || urlMatches
  });
  
  if (matches || titleMatches || urlMatches) {
    console.log(`  -> ${pageId} MATCHES!`);
    if (matches) console.log(`    Content match with pattern: ${pattern}`);
    if (titleMatches) console.log(`    Title match with pattern: ${pattern}`);
    if (urlMatches) console.log(`    URL match with pattern: ${pattern}`);
  }
});

// Check for specific strings that might be causing issues
console.log('\n=== SPECIFIC STRING CHECKS ===');
console.log('Contains "Previous":', pageContent.includes('Previous'));
console.log('Contains "previousustravel":', pageContent.includes('previousustravel'));
console.log('Contains "complete_contact":', pageContent.includes('complete_contact'));
console.log('Contains "Address and Phone Information":', pageContent.includes('Address and Phone Information'));
console.log('Contains "Point of Contact Information":', pageContent.includes('Point of Contact Information'));

// Check URL fragments
console.log('\n=== URL ANALYSIS ===');
console.log('URL contains "complete_contact":', url.includes('complete_contact'));
console.log('URL contains "complete":', url.includes('complete'));
console.log('URL contains "contact":', url.includes('contact'));
console.log('URL contains "AddressPhone":', url.includes('AddressPhone'));
