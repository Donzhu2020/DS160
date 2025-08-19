# DS-160 中文助手 Chrome 扩展

DS-160 中文助手是一款专为中国用户设计的 Chrome 浏览器扩展，旨在简化美国签证申请表格 DS-160 的填写过程。

## 🌟 核心功能

### 1. 静态翻译与注解层 ✅
- **实时翻译**：为 DS-160 表单的所有英文字段提供准确的中文翻译
- **智能注解**：针对易混淆字段提供详细的填写指导和注意事项
- **灵活显示**：支持简洁/详细两种显示模式，翻译位置可选择右侧或下方
- **离线可用**：完全离线运行，翻译数据本地存储，无需联网

### 2. 无缝电码查询器 (开发中)
- **一键查询**：在电码输入框旁添加查询按钮，自动获取中文姓名对应的电码
- **智能识别**：支持繁简体转换和常见异体字识别
- **格式化输出**：自动按 DS-160 要求的格式填入电码

### 3. 智能会话保护 (计划中)
- **超时提醒**：可视化倒计时，提前提醒会话即将过期
- **自动保存**：定期加密保存表单数据到本地
- **一键恢复**：会话超时后可快速恢复填写进度

## 🚀 安装使用

### 开发环境设置

1. **克隆项目**
```bash
git clone <repository-url>
cd DS160chajian
```

2. **安装依赖**
```bash
npm install
```

3. **构建扩展**
```bash
npm run build
```

4. **加载到 Chrome**
- 打开 Chrome 浏览器
- 进入 `chrome://extensions/`
- 开启"开发者模式"
- 点击"加载已解压的扩展程序"
- 选择项目的 `dist` 文件夹

### 开发模式

```bash
# 监听文件变化，自动重新构建
npm run dev

# 运行测试
npm run test

# 代码检查
npm run lint

# 代码格式化
npm run format
```

## 📁 项目结构

```
DS160chajian/
├── manifest.json              # 扩展清单文件
├── src/
│   ├── content/
│   │   └── translation/       # 翻译功能模块
│   │       ├── index.ts       # 主入口文件
│   │       ├── translation-injector.ts  # 翻译注入器
│   │       ├── translation-loader.ts    # 数据加载器
│   │       ├── ui-controller.ts         # UI控制器
│   │       └── translation.css          # 样式文件
│   ├── shared/
│   │   ├── types.ts           # 类型定义
│   │   ├── storage.ts         # 本地存储工具
│   │   └── dom-utils.ts       # DOM操作工具
│   ├── popup/                 # 弹窗界面
│   │   ├── popup.html
│   │   ├── popup.css
│   │   └── popup.ts
│   └── background/            # 后台服务
│       └── service-worker.ts
├── assets/
│   └── data/                  # 翻译数据文件
│       ├── translation-personal-info.json
│       └── translation-contact-info.json
├── tests/                     # 测试文件
│   ├── unit/
│   └── setup.ts
└── dist/                      # 构建输出目录
```

## 🔧 技术栈

- **框架**: Chrome Extension Manifest V3
- **语言**: TypeScript
- **构建工具**: Vite
- **测试框架**: Vitest
- **代码规范**: ESLint + Prettier

## 📝 翻译数据格式

翻译数据采用 JSON 格式存储，支持多种选择器策略：

```json
{
  "version": "2025-01-01",
  "pageId": "personalInfo1",
  "description": "DS-160个人信息页面翻译数据",
  "fields": [
    {
      "key": "surname_passport",
      "selectors": [
        "label[for*='Surname']",
        "text:Surnames"
      ],
      "en": "Surnames (as in passport)",
      "zh": "姓氏（与护照一致）",
      "note": "必须与护照拼写完全一致，不含标点或空格",
      "level": "brief"
    }
  ]
}
```

## 🎯 使用指南

1. **安装扩展**后，访问 DS-160 申请页面
2. **自动检测**页面类型并加载对应的翻译数据
3. **翻译显示**在相应英文字段旁以蓝色背景显示
4. **控制面板**位于页面右上角，可调整显示模式和设置
5. **悬停查看**详细注释和填写建议

## 🛡️ 隐私与安全

- **完全离线**：所有翻译数据本地存储，无需联网
- **隐私优先**：不收集、不传输任何用户数据
- **最小权限**：仅请求必要的浏览器权限
- **开源透明**：代码完全开源，安全可审查

## 🚧 开发路线图

- [x] **V1.0** - 静态翻译与注解层
- [ ] **V1.1** - 无缝电码查询器
- [ ] **V1.2** - 智能会话保护
- [ ] **V2.0** - 照片预检查工具
- [ ] **V2.1** - 数据备份与校验

## 🤝 贡献指南

欢迎提交问题报告、功能建议或代码贡献：

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

## 📄 许可证

本项目基于 MIT 许可证开源 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 💡 常见问题

**Q: 为什么某些字段没有翻译？**
A: 可能是页面结构发生变化或该字段尚未添加翻译数据。请提交 Issue 反馈。

**Q: 如何添加新的翻译字段？**
A: 编辑 `assets/data/` 目录下的相应 JSON 文件，按照现有格式添加新字段。

**Q: 扩展是否会影响页面性能？**
A: 扩展经过性能优化，注入时间通常在 100ms 以内，对页面性能影响极小。

## 📞 支持与反馈

如有问题或建议，请通过以下方式联系：
- 提交 [GitHub Issue](https://github.com/your-repo/issues)
- 发送邮件至 [your-email@example.com]

---

**免责声明**：本扩展仅为辅助工具，不保证翻译的完全准确性。用户在提交申请前应仔细核对所有信息。
