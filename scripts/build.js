import { execSync } from 'child_process';
import { copyFileSync, mkdirSync, existsSync, readFileSync, writeFileSync, readdirSync } from 'fs';
import { resolve, dirname, join } from 'path';

console.log('Building DS-160 Chinese Helper extension...');

// 运行 Vite 构建
execSync('vite build', { stdio: 'inherit' });

// 创建必要的目录
const distDir = 'dist';
const dirs = [
  'dist/popup',
  'dist/assets/data',
  'dist/assets/data/pages',
  'dist/icons'
];

dirs.forEach(dir => {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
});

// 复制基础文件
const basicFilesToCopy = [
  { src: 'manifest.json', dest: 'dist/manifest.json' },
  { src: 'src/popup/popup.html', dest: 'dist/popup/popup.html' },
  { src: 'src/popup/popup.css', dest: 'dist/popup/popup.css' },
  { src: 'src/content/translation/translation.css', dest: 'dist/content/translation.css' },
  { src: 'assets/data/translation-personal-info.json', dest: 'dist/assets/data/translation-personal-info.json' },
  { src: 'assets/data/translation-contact-info.json', dest: 'dist/assets/data/translation-contact-info.json' }
];

basicFilesToCopy.forEach(({ src, dest }) => {
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

// 复制所有页面翻译文件
const pagesDir = 'assets/data/pages';
if (existsSync(pagesDir)) {
  const pageFiles = readdirSync(pagesDir).filter(file => file.endsWith('.json'));
  pageFiles.forEach(file => {
    const src = join(pagesDir, file);
    const dest = join('dist/assets/data/pages', file);
    try {
      copyFileSync(src, dest);
      console.log(`Copied page translation: ${src} -> ${dest}`);
    } catch (error) {
      console.error(`Failed to copy page translation ${src}:`, error.message);
    }
  });
  console.log(`Copied ${pageFiles.length} page translation files`);
} else {
  console.warn('Pages directory not found, skipping page translation files');
}

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

// Fix ES6 imports in content scripts
try {
  execSync('node scripts/fix-content-script.js', { stdio: 'inherit' });
} catch (error) {
  console.warn('Failed to fix content script imports:', error.message);
}

console.log('Build completed successfully!');
console.log('\nTo load the extension in Chrome:');
console.log('1. Open chrome://extensions/');
console.log('2. Enable "Developer mode"');
console.log('3. Click "Load unpacked" and select the "dist" folder');
