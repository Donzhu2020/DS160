// Run this in the browser console on page10 to find correct selectors

console.log('=== Page10 Element Debug Script ===');

// Search for all text containing these keywords
const keywords = [
  "Place of Birth",
  "Spouse's Place", 
  "Spouse's Address",
  "City",
  "Country/Region"
];

keywords.forEach(keyword => {
  console.log(`\n--- Searching for: "${keyword}" ---`);
  
  // Method 1: Search in all text nodes
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );
  
  let textNode;
  let count = 0;
  while (textNode = walker.nextNode()) {
    if (textNode.textContent.includes(keyword)) {
      count++;
      console.log(`Text node ${count}:`, textNode.textContent.trim());
      console.log('Parent element:', textNode.parentElement);
      console.log('Parent tagName:', textNode.parentElement.tagName);
      console.log('Parent classes:', textNode.parentElement.className);
      console.log('Parent ID:', textNode.parentElement.id);
      console.log('---');
    }
  }
  
  // Method 2: Search in all elements
  const allElements = document.querySelectorAll('*');
  allElements.forEach((element, index) => {
    if (element.textContent.includes(keyword) && element.children.length === 0) {
      console.log(`Element match:`, element);
      console.log('tagName:', element.tagName);
      console.log('textContent:', element.textContent.trim());
      console.log('classes:', element.className);
      console.log('id:', element.id);
      console.log('---');
    }
  });
});

// Search for specific patterns
console.log('\n=== Form Labels ===');
const labels = document.querySelectorAll('label');
labels.forEach(label => {
  console.log('Label text:', label.textContent.trim());
  console.log('Label for:', label.getAttribute('for'));
  console.log('Label classes:', label.className);
  console.log('---');
});

console.log('\n=== Select elements ===');
const selects = document.querySelectorAll('select');
selects.forEach(select => {
  console.log('Select name:', select.name);
  console.log('Select options:', Array.from(select.options).map(o => o.text));
  console.log('---');
});

console.log('\n=== All text content containing "Birth" ===');
document.querySelectorAll('*').forEach(el => {
  if (el.textContent.includes('Birth') && el.children.length === 0) {
    console.log('Birth element:', el.textContent.trim(), '|', el.tagName, '|', el.className);
  }
});

console.log('\n=== All text content containing "Address" ===');
document.querySelectorAll('*').forEach(el => {
  if (el.textContent.includes('Address') && el.children.length === 0) {
    console.log('Address element:', el.textContent.trim(), '|', el.tagName, '|', el.className);
  }
});

console.log('=== Debug script completed ===');
