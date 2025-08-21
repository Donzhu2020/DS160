// 临时调试脚本：检查元素定位问题

console.log('=== DS-160 Element Debug Tool ===');

// 查找所有可能包含"arrival flight"的元素
const searchTexts = [
  'Arrival Flight',
  'arrival flight', 
  'Arrival City',
  'arrival city',
  'Date of Arrival',
  'date of arrival'
];

searchTexts.forEach(searchText => {
  console.log(`\n--- Searching for: "${searchText}" ---`);
  
  // 方法1: 查找包含确切文本的元素
  const allElements = document.querySelectorAll('*');
  const matchingElements = [];
  
  for (const element of allElements) {
    const text = element.textContent;
    if (text && text.toLowerCase().includes(searchText.toLowerCase())) {
      // 检查是否是直接包含该文本的元素（不是通过子元素）
      const directText = element.childNodes && Array.from(element.childNodes)
        .filter(node => node.nodeType === Node.TEXT_NODE)
        .map(node => node.textContent.trim())
        .join(' ');
      
      if (directText.toLowerCase().includes(searchText.toLowerCase())) {
        matchingElements.push({
          element,
          tagName: element.tagName,
          className: element.className,
          id: element.id,
          directText: directText.substring(0, 50),
          fullText: text.substring(0, 100),
          isVisible: element.offsetParent !== null
        });
      }
    }
  }
  
  console.log(`Found ${matchingElements.length} elements:`);
  matchingElements.forEach((match, index) => {
    console.log(`  ${index + 1}. ${match.tagName} class="${match.className}" id="${match.id}"`);
    console.log(`     Direct text: "${match.directText}"`);
    console.log(`     Visible: ${match.isVisible}`);
    console.log(`     Element:`, match.element);
  });
});
