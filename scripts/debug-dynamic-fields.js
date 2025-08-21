// 在浏览器控制台运行此脚本来调试动态字段

console.log('=== DS-160 Dynamic Fields Debugger ===');

// 查找所有包含"flight"的文本
function findFlightElements() {
  console.log('\n🔍 Searching for flight-related elements:');
  const allElements = document.querySelectorAll('*');
  
  for (const el of allElements) {
    const text = el.textContent?.trim();
    if (text && text.toLowerCase().includes('flight') && el.offsetParent !== null) {
      console.log(`📍 ${el.tagName}.${el.className || 'no-class'}: "${text}"`);
      console.log('   Element:', el);
    }
  }
}

// 查找所有包含"city"的文本
function findCityElements() {
  console.log('\n🏙️ Searching for city-related elements:');
  const allElements = document.querySelectorAll('*');
  
  for (const el of allElements) {
    const text = el.textContent?.trim();
    if (text && text.toLowerCase().includes('city') && el.offsetParent !== null) {
      console.log(`📍 ${el.tagName}.${el.className || 'no-class'}: "${text}"`);
      console.log('   Element:', el);
    }
  }
}

// 查找所有包含"location"的文本
function findLocationElements() {
  console.log('\n📍 Searching for location-related elements:');
  const allElements = document.querySelectorAll('*');
  
  for (const el of allElements) {
    const text = el.textContent?.trim();
    if (text && text.toLowerCase().includes('location') && el.offsetParent !== null) {
      console.log(`📍 ${el.tagName}.${el.className || 'no-class'}: "${text}"`);
      console.log('   Element:', el);
    }
  }
}

// 运行所有调试函数
findFlightElements();
findCityElements();
findLocationElements();

// 添加一个等待动态内容的函数
function waitAndCheckDynamic() {
  console.log('\n⏳ Waiting for dynamic content... Please select "Yes" for travel plans');
  
  setTimeout(() => {
    console.log('\n🔄 Re-checking after delay:');
    findFlightElements();
    findCityElements();
    findLocationElements();
  }, 3000);
}

waitAndCheckDynamic();
