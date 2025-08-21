// Console script to debug page6 content issues
console.log('=== PAGE6 CONTENT DEBUG ===');

const url = window.location.href;
const title = document.title;
const pageContent = document.body.textContent || '';

console.log('Current page info:');
console.log('URL:', url);
console.log('Title:', title);

// Show first 2000 characters of content to look for patterns
console.log('\n=== FULL CONTENT ANALYSIS (first 2000 chars) ===');
console.log(pageContent.substring(0, 2000));

// Test exact patterns that are causing issues
const problematicPatterns = [
  { name: 'page4 (Travel Companions)', pattern: /Travel\s+Companions/i },
  { name: 'page5 (Previous US Travel)', pattern: /Previous\s+U\.?S\.?\s+Travel(?!\s+Information)|previousustravel/i },
  { name: 'page6 (Address and Phone)', pattern: /Address\s+and\s+Phone\s+Information|Point\s+of\s+Contact\s+Information|complete_contact\.aspx/i }
];

console.log('\n=== PATTERN TESTING ===');
problematicPatterns.forEach(({name, pattern}) => {
  const contentMatch = pattern.test(pageContent);
  const titleMatch = pattern.test(title);
  const urlMatch = pattern.test(url);
  
  console.log(`${name}:`, {
    content: contentMatch,
    title: titleMatch,
    url: urlMatch,
    overall: contentMatch || titleMatch || urlMatch
  });
  
  if (contentMatch) {
    console.log(`  Content matches found for ${name}`);
    const matches = pageContent.match(pattern);
    if (matches) {
      console.log(`  Actual matches:`, matches);
    }
  }
  if (titleMatch) {
    console.log(`  Title matches found for ${name}:`, title.match(pattern));
  }
  if (urlMatch) {
    console.log(`  URL matches found for ${name}:`, url.match(pattern));
  }
});

// Look for specific strings that might be causing confusion
console.log('\n=== SPECIFIC STRING SEARCH ===');
const searchTerms = [
  'Travel Companions',
  'Travel Information',
  'Previous U.S. Travel',
  'Address and Phone Information',
  'Point of Contact Information',
  'complete_contact'
];

searchTerms.forEach(term => {
  const found = pageContent.includes(term);
  console.log(`"${term}": ${found}`);
  if (found) {
    const index = pageContent.indexOf(term);
    const context = pageContent.substring(Math.max(0, index - 50), index + term.length + 50);
    console.log(`  Context: ...${context}...`);
  }
});

// Check for any breadcrumb or navigation elements that might contain misleading text
console.log('\n=== NAVIGATION/BREADCRUMB CHECK ===');
const navElements = document.querySelectorAll('nav, .breadcrumb, .navigation, .menu, .sidebar');
navElements.forEach((nav, i) => {
  console.log(`Nav element ${i}:`, nav.textContent.substring(0, 200));
});
