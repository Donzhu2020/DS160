import fs from 'fs';

// 读取当前的page8翻译文件
const filePath = 'assets/data/pages/translation-page08.json';
let data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// 根据控制台错误，添加缺失的字段
const missingFields = [
  {
    key: "contact_person_org_us",
    selectors: ["text:Contact Person or Organization in the United States"],
    en: "Contact Person or Organization in the United States",
    zh: { brief: "在美国的联系人或组织", detailed: "在美国的联系人或组织" },
    note: { brief: "", detailed: "" }
  },
  {
    key: "contact_person",
    selectors: ["text:Contact Person"],
    en: "Contact Person",
    zh: { brief: "联系人", detailed: "联系人" },
    note: { brief: "", detailed: "" }
  },
  {
    key: "surnames",
    selectors: ["text:Surnames"],
    en: "Surnames",
    zh: { brief: "姓氏", detailed: "姓氏" },
    note: { brief: "", detailed: "" }
  },
  {
    key: "given_names",
    selectors: ["text:Given Names"],
    en: "Given Names",
    zh: { brief: "名字", detailed: "名字" },
    note: { brief: "", detailed: "" }
  },
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
    key: "city",
    selectors: ["text:City"],
    en: "City",
    zh: { brief: "城市", detailed: "城市" },
    note: { brief: "", detailed: "" }
  },
  {
    key: "state",
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

// 添加缺失的字段到现有字段列表
missingFields.forEach(field => {
  // 检查字段是否已存在
  const exists = data.fields.some(existingField => 
    existingField.key === field.key || 
    existingField.en === field.en
  );
  
  if (!exists) {
    data.fields.push(field);
    console.log(`Added field: ${field.key} - ${field.zh.brief}`);
  } else {
    console.log(`Field already exists: ${field.key}`);
  }
});

// 更新字段计数
console.log(`Total fields after update: ${data.fields.length}`);

// 写回文件
fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log(`✅ Updated ${filePath} with ${missingFields.length} new fields`);

// 同时更新index.json中的字段计数
const indexPath = 'assets/data/pages/index.json';
const indexData = JSON.parse(fs.readFileSync(indexPath, 'utf8'));

const page8Index = indexData.pages.find(page => page.pageId === 'page8');
if (page8Index) {
  page8Index.fieldCount = data.fields.length;
  fs.writeFileSync(indexPath, JSON.stringify(indexData, null, 2));
  console.log(`✅ Updated index.json field count for page8: ${data.fields.length}`);
}
