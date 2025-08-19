import { execSync } from 'child_process';
import { copyFileSync, mkdirSync, existsSync, readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';

console.log('Building DS-160 Chinese Helper extension...');

// 运行 Vite 构建
execSync('vite build', { stdio: 'inherit' });

// 创建必要的目录
const distDir = 'dist';
const dirs = [
  'dist/popup',
  'dist/assets/data',
  'dist/icons'
];

dirs.forEach(dir => {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
});

// 复制文件
const filesToCopy = [
  { src: 'manifest.json', dest: 'dist/manifest.json' },
  { src: 'src/popup/popup.html', dest: 'dist/popup/popup.html' },
  { src: 'src/popup/popup.css', dest: 'dist/popup/popup.css' },
  { src: 'src/content/translation/translation.css', dest: 'dist/content/translation.css' },
  { src: 'assets/data/translation-personal-info.json', dest: 'dist/assets/data/translation-personal-info.json' },
  { src: 'assets/data/translation-contact-info.json', dest: 'dist/assets/data/translation-contact-info.json' }
];

filesToCopy.forEach(({ src, dest }) => {
  try {
    // 确保目标目录存在
    const destDir = dirname(dest);
    if (!existsSync(destDir)) {
      mkdirSync(destDir, { recursive: true });
    }
    
    copyFileSync(src, dest);
    console.log(`Copied: ${src} -> ${dest}`);
  } catch (error) {
    console.error(`Failed to copy ${src}:`, error.message);
  }
});

// 创建简单的图标文件（占位符）
const iconSizes = [16, 48, 128];
iconSizes.forEach(size => {
  const iconPath = `dist/icons/icon-${size}.png`;
  // 这里应该有实际的图标文件，现在创建空文件作为占位符
  try {
    copyFileSync('package.json', iconPath); // 临时占位符
    console.log(`Created placeholder icon: ${iconPath}`);
  } catch (error) {
    console.warn(`Could not create icon ${iconPath}`);
  }
});

// 修复 manifest.json 中的路径
const manifestPath = 'dist/manifest.json';
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));

// 修复路径引用（移除 'dist/' 前缀）
manifest.content_scripts[0].js = ['content/translation.js'];
manifest.content_scripts[0].css = ['content/translation.css'];
manifest.background.service_worker = 'background/service-worker.js';
manifest.action.default_popup = 'popup/popup.html';

writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
console.log('Fixed manifest.json paths');

console.log('Build completed successfully!');
console.log('\nTo load the extension in Chrome:');
console.log('1. Open chrome://extensions/');
console.log('2. Enable "Developer mode"');
console.log('3. Click "Load unpacked" and select the "dist" folder');
