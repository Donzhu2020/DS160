/**
 * 转换翻译文件格式脚本
 * 将旧格式的翻译数据转换为新的简洁/详细模式格式
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

function convertTranslationField(field) {
  // 如果已经是新格式，跳过
  if (typeof field.zh === 'object' && field.zh.brief !== undefined) {
    return field;
  }

  // 转换为新格式
  const newField = {
    key: field.key,
    selectors: field.selectors,
    en: field.en,
    zh: {
      brief: extractBriefTranslation(field.zh),
      detailed: field.zh
    },
    note: {
      brief: extractBriefNote(field.note),
      detailed: field.note || ""
    }
  };

  return newField;
}

function extractBriefTranslation(detailedTranslation) {
  // 从详细翻译中提取简洁版本
  let brief = detailedTranslation;
  
  // 移除括号内的说明
  brief = brief.replace(/\（[^）]*\）/g, '');
  brief = brief.replace(/\([^)]*\)/g, '');
  
  // 移除多余的说明文字
  brief = brief.replace(/请在此处填写您的/, '');
  brief = brief.replace(/\(本表只有此处使用中文\)/, '');
  
  // 清理空格
  brief = brief.trim();
  
  return brief;
}

function extractBriefNote(detailedNote) {
  if (!detailedNote || detailedNote.trim() === '') {
    return '';
  }
  
  // 为重要字段提供简短提示
  if (detailedNote.includes('护照')) {
    return '与护照一致';
  }
  if (detailedNote.includes('中文')) {
    return '使用中文';
  }
  if (detailedNote.includes('电码')) {
    return '4位数字';
  }
  
  return '';
}

function convertTranslationFile(filePath) {
  try {
    console.log(`Converting ${filePath}...`);
    
    const data = JSON.parse(readFileSync(filePath, 'utf-8'));
    
    // 转换所有字段
    if (data.fields && Array.isArray(data.fields)) {
      data.fields = data.fields.map(convertTranslationField);
    }
    
    // 写回文件
    writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    console.log(`✓ Converted ${filePath}`);
    
  } catch (error) {
    console.error(`✗ Failed to convert ${filePath}:`, error.message);
  }
}

function convertAllFiles() {
  const pagesDir = join(process.cwd(), 'assets/data/pages');
  const files = readdirSync(pagesDir).filter(file => file.endsWith('.json') && file !== 'index.json');
  
  console.log(`Found ${files.length} translation files to convert`);
  
  for (const file of files) {
    const filePath = join(pagesDir, file);
    convertTranslationFile(filePath);
  }
  
  console.log('Conversion completed!');
}

// 运行转换
convertAllFiles();
