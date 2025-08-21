// 检测DS-160网站的beforeunload事件
console.log('=== DS-160 Beforeunload Detection ===');

// 检查页面是否有beforeunload监听器
const hasBeforeUnload = window.onbeforeunload !== null;
console.log('window.onbeforeunload:', hasBeforeUnload ? 'EXISTS' : 'null');

// 检查ASP.NET相关的状态
const aspNetForm = document.forms['aspnetForm'] || document.forms[0];
if (aspNetForm) {
  console.log('ASP.NET Form found:', aspNetForm.id || 'unnamed');
  
  // 检查是否有__doPostBack函数（ASP.NET特有）
  if (typeof __doPostBack !== 'undefined') {
    console.log('__doPostBack function: EXISTS');
  }
  
  // 检查ViewState（ASP.NET状态管理）
  const viewState = document.querySelector('input[name="__VIEWSTATE"]');
  if (viewState) {
    console.log('__VIEWSTATE found: YES');
  }
}

// 检查是否有监听beforeunload的代码
const scripts = Array.from(document.scripts);
const beforeunloadScripts = scripts.filter(script => 
  script.textContent && script.textContent.includes('beforeunload')
);

console.log('Scripts with beforeunload:', beforeunloadScripts.length);

// 模拟检测：尝试设置onbeforeunload并看是否被覆盖
const originalHandler = window.onbeforeunload;
window.onbeforeunload = () => 'test';
const wasOverridden = window.onbeforeunload.toString().includes('test');
window.onbeforeunload = originalHandler;

console.log('Beforeunload can be set:', wasOverridden ? 'YES' : 'NO (protected)');

// 检查页面是否被标记为dirty
try {
  const isDirty = document.documentElement.classList.contains('dirty') ||
                  document.body.classList.contains('dirty') ||
                  (window.formIsDirty !== undefined);
  console.log('Page marked as dirty:', isDirty ? 'YES' : 'UNKNOWN');
} catch (e) {
  console.log('Error checking dirty state:', e.message);
}

console.log('=== End Detection ===');
