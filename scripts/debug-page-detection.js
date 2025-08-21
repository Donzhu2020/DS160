// 在浏览器控制台运行此脚本来调试页面检测

console.log('=== DS-160 Page Detection Debug ===');

// 基础信息
console.log('🌐 URL:', window.location.href);
console.log('📄 Title:', document.title);
console.log('📝 Page preview:', document.body.textContent?.substring(0, 200));

// 检查常见的页面标识
const pageContent = document.body.textContent || '';
const pagePatterns = [
  { pattern: /Personal\s+Information\s+1|Surnames.*Given\s+Names/i, pageId: 'page1' },
  { pattern: /Personal\s+Information\s+2|Nationality.*National.*Identification/i, pageId: 'page2' },
  { pattern: /Travel\s+Information/i, pageId: 'page3' },
  { pattern: /Travel\s+Companions/i, pageId: 'page4' },
  { pattern: /Previous\s+US\s+Travel/i, pageId: 'page5' },
  { pattern: /Point\s+of\s+Contact\s+Information/i, pageId: 'page6' },
  { pattern: /Family\s+Information:\s*Relatives/i, pageId: 'page7' },
  { pattern: /Family\s+Information:\s*Spouse/i, pageId: 'page8' },
];

console.log('🔍 Pattern matching results:');
pagePatterns.forEach(({pattern, pageId}) => {
  const matches = pattern.test(pageContent);
  console.log(`${matches ? '✅' : '❌'} ${pageId}: ${pattern} -> ${matches}`);
});

// URL分析
const urlPageMatch = window.location.href.match(/(?:page|step)[\s_-]*(\d+)/i);
if (urlPageMatch) {
  console.log('🔗 URL page match:', urlPageMatch[1]);
} else {
  console.log('❌ No page number found in URL');
}

// 检查页面中的关键词
const keywords = ['Previous', 'Travel', 'Information', 'Family', 'Contact', 'US', 'America'];
console.log('🔑 Key words found:');
keywords.forEach(keyword => {
  const count = (pageContent.match(new RegExp(keyword, 'gi')) || []).length;
  console.log(`   ${keyword}: ${count} times`);
});

// 检查特定页面的标识元素
console.log('🏷️ Page identification elements:');
console.log('   H1:', document.querySelector('h1')?.textContent?.trim());
console.log('   H2:', document.querySelector('h2')?.textContent?.trim());
console.log('   H3:', document.querySelector('h3')?.textContent?.trim());

// 检查表单标签
const labels = document.querySelectorAll('label');
console.log(`📋 Found ${labels.length} labels:`);
Array.from(labels).slice(0, 5).forEach((label, i) => {
  console.log(`   ${i+1}. "${label.textContent?.trim().substring(0, 50)}"`);
});

console.log('=== Debug Complete ===');
