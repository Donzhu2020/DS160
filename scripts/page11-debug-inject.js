
// DS-160 Page11 HTML Structure Debug Script
console.log('🔍 Page11 HTML Structure Analysis Starting...');
console.log('📍 Current URL:', window.location.href);
console.log('📍 Page Title:', document.title);

// 1. 查找所有包含关键词的元素
const keyTexts = [
  'Present Work/Education/Training Information',
  'Primary Occupation',
  'Present Employer or School Name',
  'Street Address (Line 1)',
  'Street Address (Line 2)',
  'Optional',
  'City',
  'State/Province',
  'Postal Zone/ZIP Code',
  'Country/Region',
  'Phone Number',
  'Does Not Apply',
  'Start Date',
  'Monthly Income in Local Currency',
  'Briefly describe your duties'
];

console.log('\n📋 Searching for key text elements...');
keyTexts.forEach(text => {
  // 查找包含此文本的所有元素
  const elements = Array.from(document.querySelectorAll('*')).filter(el => {
    const textContent = el.textContent.trim();
    return textContent.includes(text) || textContent.toLowerCase().includes(text.toLowerCase());
  });
  
  if (elements.length > 0) {
    console.log(`✅ Found "${text}":`);
    elements.forEach((el, index) => {
      console.log(`   [${index}] Tag: ${el.tagName}, ID: ${el.id || 'none'}, Class: ${el.className || 'none'}`);
      console.log(`       Text: "${el.textContent.trim().substring(0, 100)}..."`);
      console.log(`       Inner Text: "${el.innerText ? el.innerText.trim().substring(0, 100) : 'none'}..."`);
    });
  } else {
    console.log(`❌ NOT FOUND: "${text}"`);
  }
});

// 2. 分析页面的主要容器结构
console.log('\n🏗️ Page Structure Analysis...');
const mainContainers = document.querySelectorAll('form, .form, div[id*="Form"], div[id*="Content"]');
console.log(`Found ${mainContainers.length} main containers:`);
mainContainers.forEach((container, index) => {
  console.log(`[${index}] ${container.tagName}#${container.id || 'no-id'}.${container.className || 'no-class'}`);
});

// 3. 查找所有label元素
console.log('\n🏷️ All Label Elements:');
const labels = document.querySelectorAll('label');
console.log(`Found ${labels.length} label elements:`);
labels.forEach((label, index) => {
  if (index < 20) { // 只显示前20个避免输出过多
    console.log(`[${index}] ID: ${label.id || 'none'}, For: ${label.getAttribute('for') || 'none'}, Text: "${label.textContent.trim()}"`);
  }
});

// 4. 查找所有包含"Present"、"Primary"、"Street"等关键词的元素
console.log('\n🔍 Elements containing key keywords:');
const keywords = ['Present', 'Primary', 'Street', 'Employer', 'School', 'Address', 'Income', 'duties'];
keywords.forEach(keyword => {
  const elements = Array.from(document.querySelectorAll('*')).filter(el => {
    return el.textContent && el.textContent.toLowerCase().includes(keyword.toLowerCase());
  });
  
  if (elements.length > 0) {
    console.log(`\n🔍 Keyword "${keyword}" found in ${elements.length} elements:`);
    elements.slice(0, 5).forEach((el, index) => { // 只显示前5个
      console.log(`   [${index}] ${el.tagName}#${el.id || 'none'}: "${el.textContent.trim().substring(0, 60)}..."`);
    });
  }
});

// 5. 查找所有input、select、textarea字段及其关联的label
console.log('\n📝 Form Fields Analysis:');
const formFields = document.querySelectorAll('input, select, textarea');
console.log(`Found ${formFields.length} form fields:`);
formFields.forEach((field, index) => {
  if (index < 15) { // 只显示前15个
    const label = document.querySelector(`label[for="${field.id}"]`) || 
                  field.closest('div').querySelector('label') ||
                  field.previousElementSibling;
    
    console.log(`[${index}] Field: ${field.tagName}#${field.id || 'none'}`);
    if (label) {
      console.log(`       Label: "${label.textContent.trim()}"`);
    } else {
      console.log(`       Label: NOT FOUND`);
    }
  }
});

console.log('\n✅ Page11 HTML Structure Analysis Complete!');
