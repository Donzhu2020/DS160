# DS-160 自动刷新功能说明

## 功能概述

DS-160自动刷新功能旨在防止页面会话超时，同时确保用户已填写的表单数据不会丢失。

## 功能特性

### 1. 用户活动检测
- **监听事件**: `mousemove`, `keydown`, `click`, `scroll`, `touchstart`
- **活动跟踪**: 实时更新最后活动时间戳
- **非侵入式**: 使用 `{ passive: true }` 选项，不影响页面性能

### 2. 自动刷新机制
- **检测周期**: 每5分钟检查一次用户活动状态
- **超时阈值**: 用户无活动超过2分钟时触发刷新
- **刷新方式**: 使用 `window.location.reload()` 刷新页面

### 3. 表单数据保存与恢复
- **保存时机**: 
  - 自动刷新触发前
  - 手动调用REFRESH_TRANSLATION消息时
- **存储方式**: 使用 `sessionStorage` 临时存储
- **数据清理**: 恢复完成后自动清理旧数据

### 4. 智能元素识别
支持多种表单元素识别策略：
- `name` 属性（优先级最高）
- `id` 属性
- `data-*` 属性
- 关联的 `label` 文本
- 相对位置（备选方案）

## 技术实现

### 核心文件

1. **`src/content/translation/index.ts`**
   - 用户活动监听器设置
   - 自动刷新定时器管理
   - 表单数据保存/恢复集成

2. **`src/shared/dom-utils.ts`**
   - `saveFormData()`: 保存表单数据到sessionStorage
   - `restoreFormData()`: 从sessionStorage恢复表单数据
   - `getElementIdentifier()`: 生成元素唯一标识符
   - `findLabelForElement()`: 查找关联标签文本

### 数据格式

```json
{
  "name:fieldName": "用户输入值",
  "id:elementId": "用户输入值",
  "label:标签文本": "用户输入值",
  "position:input_0": "用户输入值"
}
```

### 支持的表单元素

- **输入框**: `<input type="text|email|password|...">` 
- **复选框/单选框**: `<input type="checkbox|radio">`
- **下拉选择**: `<select>` (保存value和selectedIndex)
- **文本域**: `<textarea>`

## 使用说明

### 自动激活
功能在扩展加载时自动激活，无需用户手动操作。

### 日志监控
打开浏览器开发者工具的Console面板，可以查看相关日志：
- `Auto refresh mechanism initialized`
- `User inactive for more than 2 minutes, triggering auto refresh...`
- `Form data saved successfully: X fields`
- `Form data restored successfully: X fields`

### 测试功能
使用提供的测试脚本验证功能：

```javascript
// 在浏览器控制台中运行
runAutoRefreshTests(); // 运行所有测试
```

## 配置参数

当前参数（可在代码中调整）：

```typescript
const INACTIVE_THRESHOLD = 2 * 60 * 1000; // 2分钟无活动阈值
const CHECK_INTERVAL = 5 * 60 * 1000;     // 5分钟检查间隔
const STORAGE_KEY = 'ds160_form_data';    // sessionStorage键名
```

## 注意事项

### 安全性
- 使用 `sessionStorage` 而非 `localStorage`，数据仅在当前会话中有效
- 不保存敏感信息（如密码字段）
- 恢复后自动清理存储数据

### 兼容性
- 支持所有现代浏览器
- 在隐私模式下可能受到存储限制
- 自动处理存储异常情况

### 性能
- 使用 `{ passive: true }` 事件监听器
- 节流机制防止过度处理
- 轻量级存储和恢复算法

## 故障排除

### 常见问题

1. **表单数据未保存**
   - 检查控制台是否有错误日志
   - 确认元素有有效的标识符属性

2. **自动刷新未触发**
   - 检查用户活动监听器是否正常工作
   - 确认定时器未被其他代码清理

3. **数据恢复失败**
   - 检查 `sessionStorage` 是否可用
   - 确认页面元素结构未发生重大变化

### 调试方法

```javascript
// 检查最后活动时间
console.log('Last activity:', new Date(lastActivityTime));

// 检查保存的数据
console.log('Saved data:', sessionStorage.getItem('ds160_form_data'));

// 手动触发保存
saveFormData();

// 手动触发恢复
restoreFormData();
```

## 版本历史

- **v1.0.0**: 初始版本，基础自动刷新和表单数据保存/恢复功能
