import fs from 'fs';

// 读取当前的page8翻译文件
const filePath = 'assets/data/pages/translation-page08.json';
let data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// 基于控制台错误的字段映射：更新选择器为text:格式
const selectorUpdates = [
  {
    key: "lblContactPerson",
    newSelectors: ["text:Contact Person or Organization in the United States"],
    newEn: "Contact Person or Organization in the United States"
  },
  {
    key: "lblContactPerson2",
    newSelectors: ["text:Contact Person"],
    newEn: "Contact Person"
  },
  {
    key: "lblUS_POC_SURNAME",
    newSelectors: ["text:Surnames"],
    newEn: "Surnames"
  },
  {
    key: "lblUS_POC_GIVEN_NAME",
    newSelectors: ["text:Given Names"],
    newEn: "Given Names"
  }
];

// 添加新的字段（如果不存在）
const newFields = [
  {
    key: "organization_name",
    selectors: ["text:Organization Name"],
    en: "Organization Name",
    zh: { brief: "组织名称", detailed: "组织名称" },
    note: { brief: "", detailed: "" }
  },
  {
    key: "relationship_to_you",
    selectors: ["text:Relationship to You"],
    en: "Relationship to You",
    zh: { brief: "与您的关系", detailed: "与您的关系" },
    note: { brief: "", detailed: "" }
  },
  {
    key: "address_phone_poc",
    selectors: ["text:Address and Phone Number of Point of Contact"],
    en: "Address and Phone Number of Point of Contact",
    zh: { brief: "联系人地址和电话号码", detailed: "联系人地址和电话号码" },
    note: { brief: "", detailed: "" }
  },
  {
    key: "us_street_address_1",
    selectors: ["text:U.S. Street Address (Line 1)"],
    en: "U.S. Street Address (Line 1)",
    zh: { brief: "美国街道地址（第1行）", detailed: "美国街道地址（第1行）" },
    note: { brief: "", detailed: "" }
  },
  {
    key: "us_street_address_2",
    selectors: ["text:U.S. Street Address (Line 2)"],
    en: "U.S. Street Address (Line 2)",
    zh: { brief: "美国街道地址（第2行）", detailed: "美国街道地址（第2行）" },
    note: { brief: "", detailed: "" }
  },
  {
    key: "city_field",
    selectors: ["text:City"],
    en: "City",
    zh: { brief: "城市", detailed: "城市" },
    note: { brief: "", detailed: "" }
  },
  {
    key: "state_field",
    selectors: ["text:State"],
    en: "State",
    zh: { brief: "州", detailed: "州" },
    note: { brief: "", detailed: "" }
  },
  {
    key: "zip_code",
    selectors: ["text:ZIP Code"],
    en: "ZIP Code",
    zh: { brief: "邮政编码", detailed: "邮政编码" },
    note: { brief: "", detailed: "" }
  },
  {
    key: "if_known",
    selectors: ["text:(if known)"],
    en: "(if known)",
    zh: { brief: "（如果知道）", detailed: "（如果知道）" },
    note: { brief: "", detailed: "" }
  },
  {
    key: "phone_number",
    selectors: ["text:Phone Number"],
    en: "Phone Number",
    zh: { brief: "电话号码", detailed: "电话号码" },
    note: { brief: "", detailed: "" }
  },
  {
    key: "email_address",
    selectors: ["text:Email Address"],
    en: "Email Address",
    zh: { brief: "电子邮件地址", detailed: "电子邮件地址" },
    note: { brief: "", detailed: "" }
  }
];

// 更新现有字段的选择器
selectorUpdates.forEach(update => {
  const field = data.fields.find(f => f.key === update.key);
  if (field) {
    field.selectors = update.newSelectors;
    field.en = update.newEn;
    console.log(`Updated selectors for ${update.key}: ${update.newSelectors.join(', ')}`);
  }
});

// 添加新字段
newFields.forEach(newField => {
  const exists = data.fields.some(f => f.key === newField.key);
  if (!exists) {
    data.fields.push(newField);
    console.log(`Added new field: ${newField.key} - ${newField.zh.brief}`);
  }
});

// 移除一些旧的不相关字段（可能是配偶信息的残留）
const fieldsToRemove = data.fields.filter(field => 
  field.en && (
    field.en.includes('Spouse') ||
    field.en.includes('Marriage') ||
    field.en.includes('Family') ||
    field.key.includes('SPOUSE') ||
    field.key.includes('FAMILY')
  )
);

fieldsToRemove.forEach(field => {
  const index = data.fields.indexOf(field);
  if (index > -1) {
    data.fields.splice(index, 1);
    console.log(`Removed irrelevant field: ${field.key} - ${field.en}`);
  }
});

console.log(`Total fields after cleanup: ${data.fields.length}`);

// 写回文件
fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log(`✅ Updated ${filePath} with corrected selectors`);

// 更新index.json中的字段计数
const indexPath = 'assets/data/pages/index.json';
const indexData = JSON.parse(fs.readFileSync(indexPath, 'utf8'));

const page8Index = indexData.pages.find(page => page.pageId === 'page8');
if (page8Index) {
  page8Index.fieldCount = data.fields.length;
  fs.writeFileSync(indexPath, JSON.stringify(indexData, null, 2));
  console.log(`✅ Updated index.json field count for page8: ${data.fields.length}`);
}
