// DS-160翻译脚本 - 支持多页面的动态版本
console.log('DS-160 Full Translation: Starting multi-page dynamic injection...');

// Personal Information 1 页面的翻译
const page1Translations = [
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblAPP_SURNAME',
    translation: '姓氏（拼音，与护照一致）'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblAPP_GIVEN_NAME', 
    translation: '名字（拼音，与护照一致）'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblAPP_FULL_NAME_NATIVE',
    translation: '请在此处填写您的中文汉字姓名(本表只有此处使用中文)'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblOtherNamesUsed',
    translation: '是否用过其他姓名？'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblTelecodeQuestion',
    translation: '是否有代表你姓名的电码？'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblAPP_GENDER',
    translation: '性别'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblAPP_MARITAL_STATUS',
    translation: '婚姻状况'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblDatePlaceOfBirth',
    translation: '出生日期和地点'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblAPP_DOB',
    translation: '出生日期'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblAPP_POB_CITY',
    translation: '出生城市'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblAPP_POB_ST_PROVINCE',
    translation: '出生省/州'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblAPP_POB_CNTRY',
    translation: '出生国家/地区'
  },
  // 页面说明和其他重要字段
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblPageNote1',
    translation: '注意：本页信息必须与您护照上的信息一致。'
  },
  // 示例文本
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lbl_APP_SURNAME_EXAMPLE',
    translation: '（例如：wang）'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblAPP_GIVEN_NAME_EXAMPLE',
    translation: '（例如：xiaoming）'
  },
  // 其他姓名字段
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_DListAlias_ctl00_lblSURNAME',
    translation: '曾用姓氏（婚前姓、宗教姓、职业姓、别名等）'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_DListAlias_ctl00_lblGIVEN_NAME',
    translation: '曾用名字'
  },
  // 电码字段
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblAPP_TelecodeSURNAME',
    translation: '姓氏电码'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblAPP_TelecodeGIVEN_NAME',
    translation: '名字电码'
  }
];

// Page 1 - Personal Information 1 动态字段（基于文本匹配）
const page1DynamicTranslations = [
  {
    text: 'Personal Information 1',
    translation: '个人信息 1'
  },
  {
    text: 'Date and Place of Birth',
    translation: '出生日期和地点'
  },
  {
    text: 'Do you have a telecode that represents your name?',
    translation: '是否有代表你姓名的电码？'
  },
  {
    text: 'Have you ever used other names (i.e., maiden, religious, professional, alias, etc.)?',
    translation: '是否曾用过其他姓名？（如：婚前姓名、宗教姓名、职业姓名、别名等）'
  },
  {
    text: 'Does Not Apply/Technology Not Available',
    translation: '不适用/技术不可用'
  },
  {
    text: 'NOTE: Data on this page must match the information as it is written in your passport.',
    translation: '注意：本页信息必须与您护照上的信息一致。'
  },
  // 其他姓名相关字段
  {
    text: 'Provide the following information:',
    translation: '请提供以下信息：'
  },
  {
    text: 'Other Surnames Used (maiden, religious, professional, aliases, etc.)',
    translation: '曾用姓氏（婚前姓、宗教姓、职业姓、别名等）'
  },
  {
    text: 'Other Given Names Used',
    translation: '曾用名字'
  },
  {
    text: 'Yes',
    translation: '是'
  },
  {
    text: 'No',
    translation: '否'
  },
  // 电码相关字段
  {
    text: 'Telecode Surnames',
    translation: '姓氏电码'
  },
  {
    text: 'Telecode Given Names',
    translation: '名字电码'
  },

];

// Page 14 - Security and Background Part 1 页面的翻译
const page14Translations = [
  // 页面说明
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblPageNote1',
    translation: '注意：请提供以下个人安全和背景信息。所有需要解释的问题，请务必完整、准确地回答。根据美国法律，某些特定类别的人可能无法获得签证（除非事先得到豁免）。下面这些问题，有没有哪一个符合你的情况？如果你回答“是”，这不代表你一定拿不到签证，但你可能会被要求亲自去见领事馆官员'
  },
  // 传染病问题
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblCOMM_DISEASE_IND',
    translation: '您是否患有任何影响公众健康的传染病？（包括软下疳、淋病、腹股沟肉芽肿、麻风病、性病性淋巴肉芽肿、传染期梅毒、活动性肺结核，以及美国卫生与公众服务部指定的其他疾病。）'
  },
  // 精神或身体疾病问题
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblDISORDER_IND',
    translation: '您是否患有任何可能危及自身或他人安全的精神或身体疾病？'
  },
  // 药物滥用问题
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblDRUG_ABUSE_IND',
    translation: '您现在或以前是毒品滥用者或瘾君子吗？'
  },
  // 解释标签
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblExplain',
    translation: '请解释'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_Label3',
    translation: '请解释'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_Label6',
    translation: '请解释'
  }
];

// Page 14 - Security and Background Part 1 动态字段（基于文本匹配）
const page14DynamicTranslations = [
  {
    text: 'Security and Background: Part 1',
    translation: '安全和背景信息：第1部分'
  },
  {
    text: 'Do you have a communicable disease of public health significance?',
    translation: '您是否患有具有公共卫生意义的传染病？'
  },
  {
    text: 'Do you have a mental or physical disorder that poses or is likely to pose a threat to the safety or welfare of yourself or others?',
    translation: '您是否患有对您自己或他人的安全或福利构成或可能构成威胁的精神或身体疾病？'
  },
  {
    text: 'Are you or have you ever been a drug abuser or addict?',
    translation: '您是否现在或曾经是药物滥用者或成瘾者？'
  },
  {
    text: 'Explain',
    translation: '请解释'
  },
  {
    text: 'Yes',
    translation: '是'
  },
  {
    text: 'No',
    translation: '否'
  },
  {
    text: 'Communicable diseases of public significance include chancroid, gonorrhea, granuloma inguinale, infectious leprosy, lymphogranuloma venereum, infectious stage syphilis, active tuberculosis, and other diseases as determined by the Department of Health and Human Services.',
    translation: '具有公共意义的传染病包括软下疳、淋病、腹股沟肉芽肿、传染性麻风病、性病性淋巴肉芽肿、传染期梅毒、活动性肺结核，以及卫生与公众服务部确定的其他疾病。'
  }
];

// Page 15 - Security and Background Part 2 页面的翻译
const page15Translations = [
  // 页面说明（继承自Page 14的页面说明）
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblPageNote1',
    translation: '注意：请提供以下个人安全和背景信息。所有需要解释的问题，请务必完整、准确地回答。根据美国法律，某些特定类别的人可能无法获得签证（除非事先得到豁免）。下面这些问题，有没有哪一个符合你的情况？如果你回答"是"，这不代表你一定拿不到签证，但你可能会被要求亲自去见领事馆官员'
  },
  // 逮捕定罪问题
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblARREST_IND',
    translation: '您是否曾因任何罪行或犯罪被逮捕或定罪，即使已获得赦免、大赦或其他类似行动？'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblARREST_EXPL',
    translation: '请解释'
  },
  // 管制物质问题
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblSUBSTANCE_IND',
    translation: '您是否曾违反或参与阴谋违反任何有关管制物质的法律？'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblSUBSTANCE_EXPL',
    translation: '请解释'
  },
  // 卖淫问题
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblVICE_IND',
    translation: '您是否来美国从事卖淫或非法商业化色情活动，或在过去10年内从事过卖淫或拉皮条？'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lbl_VICE_EXPL',
    translation: '请解释'
  },
  // 洗钱问题
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblMONEY_LAUNDER_IND',
    translation: '您是否曾参与或寻求参与洗钱活动？'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblMONEY_LAUNDER_EXPL',
    translation: '请解释'
  },
  // 人口贩卖问题
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblHUMAN_TRAFFICKING_IND',
    translation: '您有没有在美国或国外从事过人口贩卖活动，或者密谋做过这件事？'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblHUMAN_TRAFFICKING_EXPL',
    translation: '请解释'
  },
  // 协助人口贩卖问题
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblASSIST_PERSON_TRAFFIC_IND',
    translation: '您有没有故意帮助过在美国或国外从事严重人口贩卖活动的人？'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblASSIST_PERSON_TRAFFIC_EXPL',
    translation: '请解释'
  },
  // 人口贩卖相关问题（家属）
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblHUMAN_TRAFFICKING_RELATED_IND',
    translation: '你是不是在美国或国外犯下人口贩运罪的人的配偶或子女？而且在最近五年内，你是否明知那些贩运活动，并且从中得到了好处？'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblHUMAN_TRAFFICKING_RELATED_EXPL',
    translation: '请解释'
  }
];

// Page 15 - Security and Background Part 2 动态字段（基于文本匹配）
const page15DynamicTranslations = [
  {
    text: 'Security and Background: Part 2',
    translation: '安全和背景信息：第2部分'
  },
  {
    text: 'Have you ever been arrested or convicted for any offense or crime, even though subject of a pardon, amnesty, or other similar action?',
    translation: '您是否曾因任何罪行或犯罪被逮捕或定罪，即使已获得赦免、大赦或其他类似行动？'
  },
  {
    text: 'Have you ever violated, or engaged in a conspiracy to violate, any law relating to controlled substances?',
    translation: '您是否曾违反或密谋违反任何与受管制物品相关的法律？'
  },
  {
    text: 'Are you coming to the United States to engage in prostitution or unlawful commercialized vice or have you been engaged in prostitution or procuring prostitutes within the past 10 years?',
    translation: '您是否来美国从事卖淫或非法商业化色情活动，或在过去10年内从事过卖淫或拉皮条？'
  },
  {
    text: 'Have you ever been involved in, or do you seek to engage in, money laundering?',
    translation: '您是否曾参与或寻求参与洗钱活动？'
  },
  {
    text: 'Have you ever committed or conspired to commit a human trafficking offense in the United States or outside the United States?',
    translation: '您是否曾在美国或美国境外犯有或阴谋犯有人口贩卖罪？'
  },
  {
    text: 'Have you ever knowingly aided, abetted, assisted or colluded with an individual who has committed, or conspired to commit a severe human trafficking offense in the United States or outside the United States?',
    translation: '您是否曾故意帮助、教唆、协助或与在美国或美国境外犯有或阴谋犯有严重人口贩卖罪的个人勾结？'
  },
  {
    text: 'Are you the spouse, son, or daughter of an individual who has committed or conspired to commit a human trafficking offense in the United States or outside the United States and have you within the last five years, knowingly benefited from the trafficking activities?',
    translation: '您是否是在美国或美国境外犯有或阴谋犯有人口贩卖罪的个人的配偶、儿子或女儿，并且在过去五年内故意从贩卖活动中受益？'
  },
  {
    text: 'Explain',
    translation: '请解释'
  },
  {
    text: 'Yes',
    translation: '是'
  },
  {
    text: 'No',
    translation: '否'
  }
];

// Page 16 - Security and Background Part 3 页面的翻译
const page16Translations = [
  // 页面说明（继承自之前的安全背景页面说明）
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblPageNote1',
    translation: '注意：请提供以下个人安全和背景信息。所有需要解释的问题，请务必完整、准确地回答。根据美国法律，某些特定类别的人可能无法获得签证（除非事先得到豁免）。下面这些问题，有没有哪一个符合你的情况？如果你回答"是"，这不代表你一定拿不到签证，但你可能会被要求亲自去见领事馆官员'
  },
  // 非法活动问题
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblILLEGAL_ACTIVITY_IND',
    translation: '您是否计划在美国从事间谍活动、破坏活动、违反出口管制或任何其他非法活动？'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblILLEGAL_ACTIVITY_EXPL',
    translation: '请解释'
  },
  // 恐怖活动问题
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblTERROR_IND',
    translation: '您是否计划在美国从事恐怖活动，或您是否曾经从事过恐怖活动？'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblTERROR_EXPL',
    translation: '请解释'
  },
  // 恐怖支持问题
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblTERROR_SUPP_IND',
    translation: '您是否曾经或打算为恐怖分子或恐怖组织提供经济援助或其他支持？'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblTERROR_SUPP_EXPL',
    translation: '请解释'
  },
  // 恐怖组织成员问题
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblTERROR_MBR_IND',
    translation: '您是恐怖组织的成员或代表吗？'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblTERROR_MBR_EXPL',
    translation: '请解释'
  },
  // 恐怖相关家属问题
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblTERROR_REL_IND',
    translation: '您是否是在过去五年内从事恐怖活动（包括为恐怖分子或恐怖组织提供经济援助或其他支持）的个人的配偶、儿子或女儿？'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_Label2',
    translation: '请解释'
  },
  // 种族灭绝问题
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblGENOCIDE_IND',
    translation: '您是否曾经下令、煽动、犯下、协助或以其他方式参与种族灭绝？'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblGENOCIDE_EXPL',
    translation: '请解释'
  },
  // 酷刑问题
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblVIOLENCE_IND',
    translation: '您是否曾经犯下、下令、煽动、协助或以其他方式参与酷刑？'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblVIOLENCE_EXPL',
    translation: '请解释'
  },
  // 儿童兵问题
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblCHILD_SOLDIER_IND',
    translation: '您是否曾经从事招募或使用儿童兵？'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblCHILD_SOLDIER_EXPL',
    translation: '请解释'
  },
  // 人口控制问题
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblABORTION_IND',
    translation: '您是否曾经直接参与制定或执行人口控制政策，强迫妇女违背自由意愿进行堕胎或强迫男性或女性违背自由意愿进行绝育？'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblABORTION_EXPL',
    translation: '请解释'
  },
  // 器官移植问题
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblTRANSPLANT_IND',
    translation: '您是否曾经直接参与强制移植人体器官或身体组织？'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblTRANSPLANT_EXPL',
    translation: '请解释'
  },
  // 法外杀戮问题
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblEX_VIOLENCE_IND',
    translation: '您是否曾经犯下、下令、煽动、协助或以其他方式参与法外杀戮、政治谋杀或其他暴力行为？'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblEX_VIOLENCE_EXPL',
    translation: '请解释'
  },
  // 宗教自由违反问题
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblRELIGIOUS_FREEDOM_IND',
    translation: '您在担任政府官员期间，是否曾经负责或直接实施过特别严重的宗教自由侵犯行为？'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblRELIGIOUS_FREEDOM_EXPL',
    translation: '请解释'
  }
];

// Page 16 - Security and Background Part 3 动态字段（基于文本匹配）
const page16DynamicTranslations = [
  {
    text: 'Security and Background: Part 3',
    translation: '安全和背景信息：第3部分'
  },
  {
    text: 'Do you seek to engage in espionage, sabotage, export control violations, or any other illegal activity while in the United States?',
    translation: '您是否计划在美国从事间谍活动、破坏活动、违反出口管制或任何其他非法活动？'
  },
  {
    text: 'Do you seek to engage in terrorist activities while in the United States or have you ever engaged in terrorist activities?',
    translation: '您是否计划在美国从事恐怖活动，或您是否曾经从事过恐怖活动？'
  },
  {
    text: 'Have you ever or do you intend to provide financial assistance or other support to terrorists or terrorist organizations?',
    translation: '您是否曾经或打算为恐怖分子或恐怖组织提供经济援助或其他支持？'
  },
  {
    text: 'Are you a member or representative of a terrorist organization?',
    translation: '您是恐怖组织的成员或代表吗？'
  },
  {
    text: 'Are you the spouse, son, or daughter of an individual who has engaged in terrorist activity, including providing financial assistance or other support to terrorists or terrorist organizations, in the last five years?',
    translation: '您是否是在过去五年内从事恐怖活动（包括为恐怖分子或恐怖组织提供经济援助或其他支持）的个人的配偶、儿子或女儿？'
  },
  {
    text: 'Have you ever ordered, incited, committed, assisted, or otherwise participated in genocide?',
    translation: '您是否曾经下令、煽动、犯下、协助或以其他方式参与种族灭绝？'
  },
  {
    text: 'Have you ever committed, ordered, incited, assisted, or otherwise participated in torture?',
    translation: '您是否曾经犯下、下令、煽动、协助或以其他方式参与酷刑？'
  },
  {
    text: 'Have you ever engaged in the recruitment or the use of child soldiers?',
    translation: '您是否曾经从事招募或使用儿童兵？'
  },
  {
    text: 'Have you ever been directly involved in the establishment or enforcement of population controls forcing a woman to undergo an abortion against her free choice or a man or a woman to undergo sterilization against his or her free will?',
    translation: '您是否曾经直接参与制定或执行人口控制政策，强迫妇女违背自由意愿进行堕胎或强迫男性或女性违背自由意愿进行绝育？'
  },
  {
    text: 'Have you ever been directly involved in the coercive transplantation of human organs or bodily tissue?',
    translation: '您是否曾经直接参与强制移植人体器官或身体组织？'
  },
  {
    text: 'Have you committed, ordered, incited, assisted, or otherwise participated in extrajudicial killings, political killings, or other acts of violence?',
    translation: '您是否曾经犯下、下令、煽动、协助或以其他方式参与法外杀戮、政治谋杀或其他暴力行为？'
  },
  {
    text: 'Have you, while serving as a government official, been responsible for or directly carried out, at any time, particularly severe violations of religious freedom?',
    translation: '您在担任政府官员期间，是否曾经负责或直接实施过特别严重的宗教自由侵犯行为？'
  },
  {
    text: 'Explain',
    translation: '请解释'
  },
  {
    text: 'Yes',
    translation: '是'
  },
  {
    text: 'No',
    translation: '否'
  }
];

// Page 17 - Security and Background Part 4 页面的翻译
const page17Translations = [
  // 页面说明（继承自之前的安全背景页面说明）
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblPageNote1',
    translation: '注意：请提供以下个人安全和背景信息。所有需要解释的问题，请务必完整、准确地回答。根据美国法律，某些特定类别的人可能无法获得签证（除非事先得到豁免）。下面这些问题，有没有哪一个符合你的情况？如果你回答"是"，这不代表你一定拿不到签证，但你可能会被要求亲自去见领事馆官员'
  },
  // 移民欺诈问题
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblIMMGRATN_FRAUD_IND',
    translation: '您是否曾经试图通过欺诈、故意虚假陈述或其他非法手段为自己或他人获得签证、入境美国或任何其他美国移民福利？'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblIMMGRATN_FRAUD_EXPL',
    translation: '请解释'
  },
  // 驱逐出境问题
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblDeport_IND',
    translation: '您是否曾被任何国家驱逐出境或遣返？'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblDeport_EXPL',
    translation: '请解释'
  }
];

// Page 17 - Security and Background Part 4 动态字段（基于文本匹配）
const page17DynamicTranslations = [
  {
    text: 'Security and Background: Part 4',
    translation: '安全和背景信息：第4部分'
  },
  {
    text: 'Have you ever sought to obtain or assist others to obtain a visa, entry into the United States, or any other United States immigration benefit by fraud or willful misrepresentation or other unlawful means?',
    translation: '您是否曾经试图通过欺诈、故意虚假陈述或其他非法手段为自己或他人获得签证、入境美国或任何其他美国移民福利？'
  },
  {
    text: 'Have you ever been removed or deported from any country?',
    translation: '您是否曾被任何国家驱逐出境或遣返？'
  },
  {
    text: 'Explain',
    translation: '请解释'
  },
  {
    text: 'Yes',
    translation: '是'
  },
  {
    text: 'No',
    translation: '否'
  }
];

// Page 18 - Security and Background Part 5 页面的翻译
const page18Translations = [
  // 页面说明（继承自之前的安全背景页面说明）
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblPageNote1',
    translation: '注意：请提供以下个人安全和背景信息。所有需要解释的问题，请务必完整、准确地回答。根据美国法律，某些特定类别的人可能无法获得签证（除非事先得到豁免）。下面这些问题，有没有哪一个符合你的情况？如果你回答"是"，这不代表你一定拿不到签证，但你可能会被要求亲自去见领事馆官员'
  },
  // 儿童监护权问题
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblCUSTODY_IND',
    translation: '您是否曾在美国境外拒绝将美国公民子女的监护权交还给美国法院指定的合法监护人？'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblCUSTODY_EXPL',
    translation: '请解释'
  },
  // 投票违法问题
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblVOTE_VIOLATE_IND',
    translation: '您是否曾在美国违反任何法律或法规进行投票？'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblVOTE_VIOLATE_EXPL',
    translation: '请解释'
  },
  // 放弃美国国籍问题
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblRENOUNCE_IND',
    translation: '您是否曾为了避税目的而放弃美国国籍？'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblRENOUNCE_EXPL',
    translation: '请解释'
  }
];

// Page 18 - Security and Background Part 5 动态字段（基于文本匹配）
const page18DynamicTranslations = [
  {
    text: 'Security and Background: Part 5',
    translation: '安全和背景信息：第5部分'
  },
  {
    text: 'Have you ever withheld custody of a U.S. citizen child outside the United States from a person granted legal custody by a U.S. court?',
    translation: '您是否曾在美国境外拒绝将美国公民子女的监护权交还给美国法院指定的合法监护人？'
  },
  {
    text: 'Have you voted in the United States in violation of any law or regulation?',
    translation: '您是否曾在美国违反任何法律或法规进行投票？'
  },
  {
    text: 'Have you ever renounced United States citizenship for the purposes of avoiding taxation?',
    translation: '您是否曾为了避税目的而放弃美国国籍？'
  },
  {
    text: 'Explain',
    translation: '请解释'
  },
  {
    text: 'Yes',
    translation: '是'
  },
  {
    text: 'No',
    translation: '否'
  }
];

// Personal Information 2 页面的翻译
const page2Translations = [
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblAPP_NATL',
    translation: '所属国家/地区（国籍）'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblAPP_OTH_NATL_IND',
    translation: '是否持有或曾持有除上述国籍外的其他国籍？'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblPermResOtherCntryInd',
    translation: '除了您的原籍国之外，您在其他国家或地区有永居身份吗？'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblAPP_NATIONAL_ID',
    translation: '身份证号码'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblAPP_SSN',
    translation: '美国社会保障号'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblAPP_TAX_ID',
    translation: '美国纳税人识别号'
  }
];

// Travel Information 页面的翻译
const page3Translations = [
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_Label1',
    translation: '旅行信息'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblPageNote1',
    translation: '注意：请提供以下有关您旅行计划的信息'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblPrincipalPOT',
    translation: '请提供以下信息：'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_dlPrincipalAppTravel_ctl00_lblPurposeOfTrip',
    translation: '赴美访问目的'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblSpecificTravel',
    translation: '您是否已经制定了具体的旅行计划？'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblIntendtoTravel',
    translation: '计划到达日期'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblDateFormat1',
    translation: '（格式：日-月-年）'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblIntendtoStay',
    translation: '计划在美停留时间'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblWhoIsPaying',
    translation: '为您的旅行费用付款的人员/机构'
  }
];

// Travel Information 页面 - 具体旅行计划字段（选择Yes后显示）
const page3SpecificTravelTranslations = [
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_Label11',
    translation: '请提供您赴美旅行的完整行程：'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblARRIVAL_US_DTE',
    translation: '在美国的到达日期'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_Label16',
    translation: '到达航班'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblArrivalFlight',
    translation: '（如知道）'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblArriveCity',
    translation: '到达城市'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblDEPARTURE_US_DTE',
    translation: '从美国的出发日期'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_Label17',
    translation: '出发航班'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_Label9',
    translation: '（如知道）'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblDepartureCity',
    translation: '出发城市'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblLocationVisitUS',
    translation: '提供您计划在美国访问的地点：'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_dtlTravelLoc_ctl00_lblLocation',
    translation: '地点'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblAddressInUS',
    translation: '您在美国的住宿地址'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblStreetAddress1',
    translation: '街道地址（第1行）'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblStreetAddress2',
    translation: '街道地址（第2行）'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblCity',
    translation: '城市'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblTravelState',
    translation: '州'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblTRAVEL_ADDR_POSTAL_CD',
    translation: '邮政编码'
  }
];

// Page 4 - Travel Companions Information 页面的翻译
const page4Translations = [

  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblPageNote1',
    translation: '注意：请提供以下随行人员信息。'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_Label9',
    translation: '与您同行的人'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblOtherPersonsTravelingWithYou',
    translation: '是否有人与您同行？'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblGroupTravel',
    translation: '您是否作为团体或组织的一部分旅行？'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblPersonsTraveling',
    translation: '输入与您同行的人员'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_dlTravelCompanions_ctl00_lblTRAV_COMP_SURNAME',
    translation: '与您同行人员的姓氏'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_dlTravelCompanions_ctl00_lblTRAV_COM_GIVEN_NAME',
    translation: '与您同行人员的名字'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_dlTravelCompanions_ctl00_lblTCRelationship',
    translation: '与此人的关系'
  }
];

// Page 4 - Travel Companions 动态字段（基于文本匹配的补充翻译）
const page4DynamicTranslations = [
  {
    text: 'Enter the name of the group you are traveling with',
    translation: '输入您要与之同行的团体名称'
  },
  {
    text: 'Group Name',
    translation: '团体名称'
  },
  {
    text: 'Add Another',
    translation: '添加另一个'
  },
  {
    text: 'Remove',
    translation: '移除'
  }
];

// Page 5 - Previous U.S. Travel Information 页面的翻译
const page5Translations = [

  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblPageNote1',
    translation: '注意：请提供下面关于以前赴美旅行的信息。对于所有要求解释的问题，请提供完整、准确的信息。'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblPREV_US_TRAVEL_IND',
    translation: '你曾经到过美国吗？'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblPreviousUSVisitsInfo',
    translation: '请提供您最近五次赴美访问的信息：'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_dtlPREV_US_VISIT_ctl00_lblPREV_US_VISIT_DTE',
    translation: '到达日期'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_dtlPREV_US_VISIT_ctl00_lblPREV_US_VISIT_LOS',
    translation: '停留时间长度'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblPREV_US_DRIVER_LIC_IND',
    translation: '您是否持有或曾经持有美国驾驶执照？'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblPREV_VISA_IND',
    translation: '您是否曾经获得过美国签证？'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblPREV_VISA_SAME_TYPE_IND',
    translation: '您申请的是同一类型的签证吗？'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblPREV_VISA_REFUSED_IND',
    translation: '您是否曾经被拒发美国签证，或在入境口岸被拒绝入境美国，或撤回过入境申请？'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblIV_PETITION_IND',
    translation: '是否有人曾为您向美国公民及移民服务局提交过移民申请？'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblPREV_VISA_SAME_CNTRY_IND',
    translation: '您是否在签发上述签证的同一国家或地点申请，且该国家或地点是您的主要居住地？'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblPREV_VISA_TEN_PRINT_IND',
    translation: '您是否已按过十指指纹？'
  }
];

// Page 5 - Previous U.S. Travel 动态字段（基于文本匹配）
const page5DynamicTranslations = [
  {
    text: 'Provide information on your last five U.S. visits:',
    translation: '请提供您最近五次赴美访问的信息：'
  },
  {
    text: 'Date Arrived',
    translation: '到达日期'
  },
  {
    text: 'Length of Stay',
    translation: '停留时间长度'
  },
  {
    text: 'Add Another',
    translation: '添加另一个'
  },
  {
    text: 'Remove',
    translation: '移除'
  },
  {
    text: 'Provide the following information:',
    translation: '请提供以下信息：'
  },
  {
    text: "Driver's License Number",
    translation: '驾驶执照号码'
  },
  {
    text: 'Do not know',
    translation: '不知道'
  },
  {
    text: "State of Driver's License",
    translation: '驾驶执照签发州'
  },
  {
    text: 'Previous U.S. Visas',
    translation: '以往美国签证'
  },
  {
    text: 'Date Last Visa Was Issued',
    translation: '最后一次签证签发日期'
  },
  {
    text: 'Do Not Know',
    translation: '不知道'
  },
  {
    text: 'Are you applying for the same type of visa?',
    translation: '您申请的是同一类型的签证吗？'
  },
  {
    text: 'Are you applying in the same country or location where the visa above was issued, and is this country or location your place of principal residence?',
    translation: '您是否在签发上述签证的同一国家或地点申请，且该国家或地点是您的主要居住地？'
  },
  {
    text: 'Are you applying in the same country or location where the visa above was issued, and is this country or location your place of principal of residence?',
    translation: '您是否在签发上述签证的同一国家或地点申请，且该国家或地点是您的主要居住地？'
  },
  {
    text: 'Have you been ten-printed?',
    translation: '您是否已按过十指指纹？'
  },
  {
    text: 'Has your U.S. Visa ever been lost or stolen?',
    translation: '您的美国签证是否曾经丢失或被盗？'
  },
  {
    text: 'Has your U.S. Visa ever been cancelled or revoked?',
    translation: '您的美国签证是否曾经被取消或撤销？'
  },
  {
    text: 'Explain',
    translation: '请解释'
  }
];

// Page 6 - Address and Phone Information 页面的翻译
const page6Translations = [

  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblHomeAdressInfo',
    translation: '家庭地址'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblAPP_ADDR_LN1',
    translation: '街道地址（第一行）'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblAPP_ADDR_LN2',
    translation: '街道地址（第二行）'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblAPP_ADDR_CITY',
    translation: '城市'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblAPP_ADDR_STATE',
    translation: '州/省'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblAPP_ADDR_POSTAL_CD',
    translation: '邮政编码/邮政编码'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblAPP_ADDR_CNTRY',
    translation: '国家/地区'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblMAILING_ADDR_SAME_AS_APP_ADDR',
    translation: '您的邮寄地址是否与您的家庭地址相同？'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblCompleteInfo',
    translation: '请提供您的邮寄地址：'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblMAILING_ADDR_LN1',
    translation: '街道地址（第一行）'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblMAILING_ADDR_LN2',
    translation: '街道地址（第二行）'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblMAILING_ADDR_LN2Optional',
    translation: '*可选的'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblMAILING_ADDR_CITY',
    translation: '城市'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblMAILING_ADDR_STATE',
    translation: '州/省'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblMAILING_ADDR_POSTAL_CD',
    translation: '邮政编码/邮政编码'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblMAILING_ADDR_CNTRY',
    translation: '国家/地区'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblAPP_HOME_TEL',
    translation: '主要电话号码'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblAPP_MOBILE_TEL',
    translation: '次要电话号码'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblAPP_BUS_TEL',
    translation: '工作电话号码'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblAPP_EMAIL_ADDR',
    translation: '电子邮箱地址'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblAddEmail',
    translation: '您在过去五年中是否使用过其他电子邮箱地址？'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_dtlAddEmail_ctl00_lblAddEmailInfo',
    translation: '其他电子邮箱地址'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblAddPhone',
    translation: '您在过去五年中是否使用过其他电话号码？'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_dtlAddPhone_ctl00_lblAddPhoneInfo',
    translation: '其他电话号码'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblSocialMediaQuestion',
    translation: '您是否有社交媒体账户？'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblSocialMediaInfo',
    translation: '从下面的列表中选择您在过去五年中使用过的社交媒体平台。在平台名称旁边的空格中，输入您在该平台上使用的用户名或昵称。请不要提供您的密码。如果您使用过多个平台或在单个平台上使用过多个用户名或昵称，请点击"添加另一个"按钮分别列出每一个。如果您在过去五年中没有使用过任何列出的社交媒体平台，请选择"无"。'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_dtlSocial_ctl00_lblSocialMediaPlatform',
    translation: '社交媒体提供商/平台'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_dtlSocial_ctl00_lblSocialMediaIdent',
    translation: '社交媒体标识符'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblAddSocial',
    translation: '您是否希望提供有关您在过去五年中用于创建或分享内容（照片、视频、状态更新等）的任何其他网站或应用程序的信息？'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblAddSociaInfo',
    translation: '请提供您想要列出的每个社交媒体平台的平台名称和相关的唯一社交媒体标识符（用户名或昵称）。这不包括个人对个人消息服务（如WhatsApp）上的私人消息。'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_dtlAddSocial_ctl00_lblAddSocialPlat',
    translation: '其他社交媒体平台'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_dtlAddSocial_ctl00_lblAddSocialHand',
    translation: '其他社交媒体账号'
  }
];

// Page 6 - Address and Phone 动态字段（基于文本匹配）
const page6DynamicTranslations = [
  {
    text: 'Provide your mailing address:',
    translation: '请提供您的邮寄地址：'
  },
  {
    text: '*Optional',
    translation: '*可选的'
  },
  {
    text: 'Additional Email Address',
    translation: '其他电子邮箱地址'
  },
  {
    text: 'Additional Phone Number',
    translation: '其他电话号码'
  },
  {
    text: 'Do you have a social media presence?',
    translation: '您是否有社交媒体账户？'
  },
  {
    text: 'Social Media Provider/Platform',
    translation: '社交媒体提供商/平台'
  },
  {
    text: 'Social Media Identifier',
    translation: '社交媒体标识符'
  },
  {
    text: 'Additional Social Media Platform',
    translation: '其他社交媒体平台'
  },
  {
    text: 'Additional Social Media Handle',
    translation: '其他社交媒体账号'
  },
  {
    text: 'Add Another',
    translation: '添加另一个'
  },
  {
    text: 'Remove',
    translation: '移除'
  }
];

// Page 7 - Passport Information 页面的翻译
const page7Translations = [
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblPPT_TYPE',
    translation: '护照/旅行证件类型'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblPPT_NUM',
    translation: '护照/旅行证件号码'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblPPT_BOOK_NUM',
    translation: '护照本号，护照首页最右侧竖排的10位数字'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblPPT_ISSUED_CNTRY',
    translation: '签发护照/旅行证件的国家/机构'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblPPT_ISSUED',
    translation: '护照/旅行证件是在哪里签发的？'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblPPT_ISSUED_IN_CITY',
    translation: '城市，你在哪个城市申请的护照'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblPPT_ISSUED_IN_STATE',
    translation: '州/省，护照首页有写'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblPPT_ISSUED_IN_CNTRY',
    translation: '国家/地区'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblPPT_ISSUED_DTE',
    translation: '签发日期'
  },

  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblPPT_EXPIRE_DTE',
    translation: '有效期至'
  },

  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblLOST_PPT_IND',
    translation: '您是否曾经丢失过护照或护照被盗？'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_dtlLostPPT_ctl00_lblLOST_PPT_NUM',
    translation: '护照/旅行证件号码'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_dtlLostPPT_ctl00_lblLOST_PPT_NATL',
    translation: '签发护照/旅行证件的国家/机构'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_dtlLostPPT_ctl00_lblPREV_PASSPORT_LOST_EXPL',
    translation: '请解释'
  }
];

// Page 7 - Passport 动态字段（基于文本匹配）
const page7DynamicTranslations = [
  {
    text: 'Passport/Travel Document Type',
    translation: '护照/旅行证件类型'
  },
  {
    text: 'Country/Authority that Issued Passport/Travel Document',
    translation: '签发护照/旅行证件的国家/机构'
  },
  {
    text: 'Where was the Passport/Travel Document Issued?',
    translation: '护照/旅行证件是在哪里签发的？'
  },
  {
    text: 'City',
    translation: '城市'
  },
  {
    text: 'State/Province',
    translation: '州/省'
  },
  {
    text: 'Country/Region',
    translation: '国家/地区'
  },
  {
    text: 'Issuance Date',
    translation: '签发日期'
  },
  {
    text: 'Have you ever lost a passport or had one stolen?',
    translation: '您是否曾经丢失过护照或护照被盗？'
  },
  {
    text: 'Explain',
    translation: '请解释'
  },
  {
    text: 'Add Another',
    translation: '添加另一个'
  },
  {
    text: 'Remove',
    translation: '移除'
  }
];

// Page 8 - U.S. Point of Contact Information 页面的翻译
const page8Translations = [
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblUSPOC',
    translation: '美国联系人信息'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblContactPerson',
    translation: '在美国的联系人或组织'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblContactPerson2',
    translation: '联系人'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblUS_POC_SURNAME',
    translation: '姓氏'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblUS_POC_GIVEN_NAME',
    translation: '名字'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblUS_POC_ORGANIZATION',
    translation: '组织名称'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblUS_POC_REL_TO_APP',
    translation: '与您的关系'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblPOCAddressPhoneInfo',
    translation: '联系人的地址和电话号码'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblUS_POC_ADDR_LN1',
    translation: '美国街道地址（第一行）'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblUS_POC_ADDR_LN2',
    translation: '美国街道地址（第二行）'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblUS_POC_ADDR_CITY',
    translation: '城市'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblUS_POC_ADDR_STATE',
    translation: '州'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblUS_POC_ADDR_POSTAL_CD',
    translation: '邮政编码'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblUS_POC_ADDR_POSTAL_CD_IK',
    translation: '（如知道）'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblUS_POC_HOME_TEL',
    translation: '电话号码'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblUS_POC_EMAIL_ADDR',
    translation: '电子邮件地址'
  }
];

// Page 8 - U.S. Contact 动态字段（基于文本匹配）
const page8DynamicTranslations = [
  {
    text: 'Contact Person or Organization in the United States',
    translation: '在美国的联系人或组织'
  },
  {
    text: 'Contact Person',
    translation: '联系人'
  },
  {
    text: 'Surnames',
    translation: '姓氏'
  },
  {
    text: 'Given Names',
    translation: '名字'
  },
  {
    text: 'Organization Name',
    translation: '组织名称'
  },
  {
    text: 'Relationship to You',
    translation: '与您的关系'
  },
  {
    text: 'Address and Phone Number of Point of Contact',
    translation: '联系人的地址和电话号码'
  },
  {
    text: 'U.S. Street Address (Line 1)',
    translation: '美国街道地址（第一行）'
  },
  {
    text: 'U.S. Street Address (Line 2)',
    translation: '美国街道地址（第二行）'
  },
  {
    text: 'City',
    translation: '城市'
  },
  {
    text: 'State',
    translation: '州'
  },
  {
    text: 'ZIP Code',
    translation: '邮政编码'
  },
  {
    text: '(if known)',
    translation: '（如知道）'
  },
  {
    text: 'Phone Number',
    translation: '电话号码'
  },
  {
    text: 'Email Address',
    translation: '电子邮件地址'
  },
  {
    text: 'Add Another',
    translation: '添加另一个'
  },
  {
    text: 'Remove',
    translation: '移除'
  }
];

// Page 9 - Family Information: Relatives 页面的翻译
const page9Translations = [
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblPageNote1',
    translation: '注意：请提供以下有关您的生身父母的信息。如果您是被收养的，请提供收养父母的信息。'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_Label9',
    translation: '父亲的全名和出生日期'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_Label14',
    translation: '母亲的全名和出生日期'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblFATHER_SURNAME',
    translation: '姓氏'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblFATHER_GIVEN_NAME',
    translation: '名字'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblFATHER_DOB',
    translation: '出生日期'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblFATHER_LIVE_IN_US_IND',
    translation: '您的父亲是否在美国？'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblFATHER_US_STATUS',
    translation: '父亲的身份'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblMOTHER_SURNAME',
    translation: '姓氏'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblMOTHER_GIVEN_NAME',
    translation: '名字'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblMOTHER_DOB',
    translation: '出生日期'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblMOTHER_LIVE_IN_US_IND',
    translation: '您的母亲是否在美国？'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblMOTHER_US_STATUS',
    translation: '母亲的身份'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblUS_IMMED_RELATIVE_IND',
    translation: '除了父母之外，您是否有任何直系亲属在美国？'
  }
];

// Page 9 - Family Information 动态字段（基于文本匹配）
const page9DynamicTranslations = [
  {
    text: 'Family Information: Relatives',
    translation: '家庭信息：亲属'
  },
  {
    text: 'Father\'s Full Name and Date of Birth',
    translation: '父亲的全名和出生日期'
  },
  {
    text: 'Mother\'s Full Name and Date of Birth',
    translation: '母亲的全名和出生日期'
  },
  {
    text: 'Surnames',
    translation: '姓氏'
  },
  {
    text: 'Given Names',
    translation: '名字'
  },
  {
    text: 'Date of Birth',
    translation: '出生日期'
  },
  {
    text: 'Is your father in the U.S.?',
    translation: '您的父亲是否在美国？'
  },
  {
    text: 'Father\'s Status',
    translation: '父亲的身份'
  },
  {
    text: 'Is your mother in the U.S.?',
    translation: '您的母亲是否在美国？'
  },
  {
    text: 'Mother\'s Status',
    translation: '母亲的身份'
  },
  {
    text: 'Do you have any immediate relatives, not including parents, in the United States?',
    translation: '除了父母之外，您是否有任何直系亲属在美国？'
  },
  {
    text: 'Add Another',
    translation: '添加另一个'
  },
  {
    text: 'Remove',
    translation: '移除'
  }
];

// Page 10 - Family Information: Spouse 页面的翻译
const page10Translations = [
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblSpouseInfo',
    translation: '家庭信息：配偶'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblPageNote1',
    translation: '注意：请输入现任配偶信息。'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblSpouseNameInfo',
    translation: '配偶的全名（包括婚前姓名）'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblSpouseSurname',
    translation: '配偶的姓氏'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblSpouseGivenName',
    translation: '配偶的名字'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblSpouseDOB',
    translation: '配偶的出生日期'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_SpouseNatLabel',
    translation: '配偶的所属国家/地区（国籍）'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblSPOUSE_ADDR_LN1',
    translation: '街道地址（第一行）'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblSPOUSE_ADDR_LN2',
    translation: '街道地址（第二行）'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblSPOUSE_ADDR_CITY',
    translation: '城市'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblSPOUSE_ADDR_STATE',
    translation: '州/省'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblSPOUSE_ADDR_POSTAL_CD',
    translation: '邮政编码'
  }
];

// Page 10 - Spouse Information 动态字段（基于文本匹配）
const page10DynamicTranslations = [
  {
    text: 'Family Information: Spouse',
    translation: '家庭信息：配偶'
  },
  {
    text: 'NOTE: Enter current spouse information.',
    translation: '注意：请输入现任配偶信息。'
  },
  {
    text: 'Spouse\'s Full Name (include Maiden Name)',
    translation: '配偶的全名（包括婚前姓名）'
  },
  {
    text: 'Spouse\'s Surnames',
    translation: '配偶的姓氏'
  },
  {
    text: 'Spouse\'s Given Names',
    translation: '配偶的名字'
  },
  {
    text: 'Spouse\'s Date of Birth',
    translation: '配偶的出生日期'
  },
  {
    text: 'Spouse\'s Country/Region of Origin (Nationality)',
    translation: '配偶的所属国家/地区（国籍）'
  },
  {
    text: 'Street Address (Line 1)',
    translation: '街道地址（第一行）'
  },
  {
    text: 'Street Address (Line 2)',
    translation: '街道地址（第二行）'
  },
  {
    text: 'City',
    translation: '城市'
  },
  {
    text: 'State/Province',
    translation: '州/省'
  },
  {
    text: 'Postal Zone/ZIP Code',
    translation: '邮政编码'
  },
  {
    text: 'Country/Region',
    translation: '国家/地区'
  }
];

// Page 11 - Present Work/Education/Training Information 页面的翻译
const page11Translations = [
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblPageNote1',
    translation: '注意：请提供以下关于您当前工作及教育的信息。'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblPRESENT_OCCUPATION',
    translation: '主要职业'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblName',
    translation: '当前工作单位或学校的名称'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblEmpSchAddr1',
    translation: '街道地址（第一行）'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblEmpSchAddr2',
    translation: '街道地址（第二行）'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblStreetAddress2Optional',
    translation: '*可选'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblEmpSchCity',
    translation: '城市'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblEmpSchStateProvince',
    translation: '州/省'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblWORK_EDUC_ADDR_POSTAL_CD',
    translation: '邮政编码'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblEmpSchCountry',
    translation: '国家/地区'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblWORK_EDUC_TEL',
    translation: '电话号码'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblWORK_EDUC_START_DTE',
    translation: '开始日期'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblWORK_EDUC_MONTHLY_INCOME',
    translation: '月收入（本地货币，如果受雇）'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblWORK_EDUC_DUTIES',
    translation: '简要描述您的职责：'
  }
];

// Page 11 - Work/Education Information 动态字段（基于文本匹配）
const page11DynamicTranslations = [
  {
    text: 'Present Work/Education/Training Information',
    translation: '当前工作/教育/培训信息'
  },
  {
    text: 'NOTE: Provide the following information concerning your current employment or education.',
    translation: '注意：请提供以下关于您当前工作及教育的信息。'
  },
  {
    text: 'Primary Occupation',
    translation: '主要职业'
  },
  {
    text: 'Present Employer or School Name',
    translation: '当前工作单位或学校的名称'
  },
  {
    text: 'Street Address (Line 1)',
    translation: '街道地址（第一行）'
  },
  {
    text: 'Street Address (Line 2)',
    translation: '街道地址（第二行）'
  },
  {
    text: '*Optional',
    translation: '*可选'
  },
  {
    text: 'City',
    translation: '城市'
  },
  {
    text: 'State/Province',
    translation: '州/省'
  },
  {
    text: 'Postal Zone/ZIP Code',
    translation: '邮政编码'
  },
  {
    text: 'Country/Region',
    translation: '国家/地区'
  },
  {
    text: 'Phone Number',
    translation: '电话号码'
  },
  {
    text: 'Does Not Apply',
    translation: '不适用'
  },
  {
    text: 'Start Date',
    translation: '开始日期'
  },
  {
    text: 'Monthly Income in Local Currency (if employed)',
    translation: '月收入（本地货币，如果受雇）'
  },
  {
    text: 'Briefly describe your duties:',
    translation: '简要描述您的职责：'
  }
];

// Page 12 - Previous Work/Education/Training Information 页面的翻译
const page12Translations = [
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblPageNote1',
    translation: '注意：请提供您在过去五年中的工作信息（如适用）。'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblPreviouslyEmployed',
    translation: '您之前有工作吗？'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblEmployerInfo',
    translation: '雇主/工作信息：'
  },
  // 工作相关字段
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEmpl_ctl00_lblEmployerName',
    translation: '雇主名称'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEmpl_ctl00_lblEmployerStreetAddress1',
    translation: '雇主街道地址（第一行）'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEmpl_ctl00_lblEmployerStreetAddress2',
    translation: '雇主街道地址（第二行）'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEmpl_ctl00_lblStreetAddress2Optional',
    translation: '*可选'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEmpl_ctl00_lblEmployerCity',
    translation: '城市'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEmpl_ctl00_lblEmployerStateProvince',
    translation: '州/省'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEmpl_ctl00_lblJobTitle',
    translation: '职位'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEmpl_ctl00_lblEmploymentDateFrom',
    translation: '工作开始日期'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEmpl_ctl00_lblEmploymentDateTo',
    translation: '工作结束日期'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEmpl_ctl00_lblDescribeDuties',
    translation: '简要描述您的职责：'
  },
  // 教育相关字段
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblOtherEduc',
    translation: '您是否在任何相当于中学水平或以上的教育机构里学习过？'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_Label21',
    translation: '请提供您所就读教育机构的以下信息。'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEduc_ctl00_lblSchoolName',
    translation: '机构名称'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEduc_ctl00_lblSchoolAddr1',
    translation: '街道地址（第一行）'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEduc_ctl00_lblSchoolAddr2',
    translation: '街道地址（第二行）'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEduc_ctl00_lblSchoolCity',
    translation: '城市'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEduc_ctl00_lblSchoolCountry',
    translation: '国家/地区'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEduc_ctl00_lblSchoolCourseOfStudy',
    translation: '课程'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_Label8',
    translation: '**初中或高中学历：**请填写"Academic"或"Vocational"。\n\n**所有其他教育阶段：**请填写您的主修专业或专业方向。'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEduc_ctl00_lblSchoolDteOfAttendanceFrom',
    translation: '入学日期'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEduc_ctl00_lblSchoolDteOfAttendanceTo',
    translation: '毕业日期'
  },
  // 更多工作相关字段
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEmpl_ctl00_lblEmployerCountry',
    translation: '国家/地区'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEmpl_ctl00_lblEmployerTelephoneNumber',
    translation: '电话号码'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEmpl_ctl00_lblSupervisorSurname',
    translation: '主管姓氏'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEmpl_ctl00_lblSupervisorGivenNames',
    translation: '主管名字'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEmpl_ctl00_lblEmployerPostalZone',
    translation: '邮政编码'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEduc_ctl00_lblEDUC_INST_POSTAL_CD',
    translation: '邮政编码'
  }
];

// Page 12 - Previous Work/Education Information 动态字段（基于文本匹配）
const page12DynamicTranslations = [
  {
    text: 'Previous Work/Education/Training Information',
    translation: '之前工作/教育/培训信息'
  },
  {
    text: 'NOTE: Provide your employment information for the last five years that you were employed, if applicable.',
    translation: '注意：请提供您在过去五年中的工作信息（如适用）。'
  },
  {
    text: 'Were you previously employed?',
    translation: '您之前有工作吗？'
  },
  {
    text: 'Employer/Employment Information:',
    translation: '雇主/工作信息：'
  },
  {
    text: 'Employer Name',
    translation: '雇主名称'
  },
  {
    text: 'Employer Street Address (Line 1)',
    translation: '雇主街道地址（第一行）'
  },
  {
    text: 'Employer Street Address (Line 2)',
    translation: '雇主街道地址（第二行）'
  },
  {
    text: '*Optional',
    translation: '*可选'
  },
  {
    text: 'City',
    translation: '城市'
  },
  {
    text: 'State/Province',
    translation: '州/省'
  },
  {
    text: 'Job Title',
    translation: '职位'
  },
  {
    text: 'Employment Date From',
    translation: '工作开始日期'
  },
  {
    text: 'Employment Date To',
    translation: '工作结束日期'
  },
  {
    text: 'Briefly describe your duties:',
    translation: '简要描述您的职责：'
  },
  {
    text: 'Yes',
    translation: '是'
  },
  {
    text: 'No',
    translation: '否'
  },
  {
    text: 'Does Not Apply',
    translation: '不适用'
  },
  // 教育相关字段
  {
    text: 'Have you attended any educational institutions at a secondary level or above?',
    translation: '您是否在任何相当于中学水平或以上的教育机构里学习过？'
  },
  {
    text: 'Provide the following information on the educational institution(s) you have attended.',
    translation: '请提供您所就读教育机构的以下信息。'
  },
  {
    text: 'Name of Institution',
    translation: '机构名称'
  },
  {
    text: 'Course of Study',
    translation: '课程'
  },
  {
    text: 'Date of Attendance From',
    translation: '入学日期'
  },
  {
    text: 'Date of Attendance To',
    translation: '毕业日期'
  },
  {
    text: 'Telephone Number',
    translation: '电话号码'
  },
  {
    text: 'Supervisor\'s Surname',
    translation: '主管姓氏'
  },
  {
    text: 'Supervisor\'s Given Names',
    translation: '主管名字'
  },
  {
    text: 'Do Not Know',
    translation: '不知道'
  },
  {
    text: 'For middle school/junior high or high school course of study please indicate "Academic" or "Vocational."  For all other educational levels please indicate your major or concentration.',
    translation: '**初中或高中学历：**请填写"Academic"或"Vocational"。\n\n**所有其他教育阶段：**请填写您的主修专业或专业方向。'
  }
];

// Page 13 - Additional Work/Education/Training Information 页面的翻译
const page13Translations = [
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblPageNote1',
    translation: '注意：请提供以下有关工作、学历或培训的信息。对于所有要求解释的问题，请提供完整、准确的信息。'
  },
  // 宗族/部落相关字段
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblCLAN_TRIBE_IND',
    translation: '您是否属于一个宗族或者部落？'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblCLAN_TRIBE_INFO',
    translation: '请提供以下信息：'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblCLAN_TRIBE_NAME',
    translation: '宗族或者部落名称'
  },
  // 语言相关字段
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblLANGUAGE_INFO',
    translation: '请列出您所说语言的种类'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_dtlLANGUAGES_ctl00_lblLANGUAGE_NAME',
    translation: '语言名字（只讲中文请填mandarin）'
  },
  // 专业技能相关字段
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblSPECIALIZED_SKILLS_IND',
    translation: '您是否具有特殊技能或接受过特殊培训，例如有关枪械、炸药、核装置、生物或化学方面的经验？'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblSPECIALIZED_SKILLS_EXPL',
    translation: '解释'
  },
  // 组织相关字段
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblORGANIZATION_IND',
    translation: '您是否隶属于、捐助过或为任何专业、社会或慈善组织工作过？'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblORGANIZATION_INFO',
    translation: '请提供组织列表'
  },
  // 军事服务相关字段
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblMILITARY_SERVICE_IND',
    translation: '您是否曾在军队服役？'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblMILITARY_SERVICE_INFO',
    translation: '请提供以下信息：'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_dtlMILITARY_ctl00_lblMILITARY_CNTRY',
    translation: '服役国家/地区名称'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_dtlMILITARY_ctl00_lblMILITARY_BRANCH',
    translation: '服役部门'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_dtlMILITARY_ctl00_lblMILITARY_RANK',
    translation: '军衔/职位'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_dtlMILITARY_ctl00_lblMILITARY_SPECIALTY',
    translation: '军事专业'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_dtlMILITARY_ctl00_lblMILITARY_SVC_FROM',
    translation: '服役开始日期'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_dtlMILITARY_ctl00_lblMILITARY_SVC_TO',
    translation: '服役结束日期'
  },
  // 准军事组织相关字段
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblPARAMILITARY_IND',
    translation: '您是否曾在准军事部队、民兵组织、叛乱集团、游击队或叛乱组织中服役、成为成员或参与其中？'
  },
  // 旅行相关字段
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_lblCOUNTRIES_VISITED_IND',
    translation: '您是否在过去五年内前往过任何国家/地区？'
  },
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_dtlCountriesVisited_ctl00_lblCOUNTRIES_VISITED',
    translation: '国家/地区'
  },
  // 组织名称字段
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_dtlORGANIZATIONS_ctl00_lblORGANIZATION_NAME',
    translation: '组织名称'
  },
  // 军事服务国家字段（更准确的ID）
  {
    id: 'ctl00_SiteContentPlaceHolder_FormView1_dtlMILITARY_SERVICE_ctl00_lblMILITARY_SVC_CNTRY',
    translation: '服役国家/地区名称'
  }
];

// Page 13 - Additional Work/Education Information 动态字段（基于文本匹配）
const page13DynamicTranslations = [
  {
    text: 'Additional Work/Education/Training Information',
    translation: '附加工作/教育/培训信息'
  },
  {
    text: 'NOTE: Provide the following work, education, or training related information. Provide complete and accurate information to all questions that require an explanation.',
    translation: '注意：请提供以下有关工作、学历或培训的信息。对于所有要求解释的问题，请提供完整、准确的信息。'
  },
  {
    text: 'Do you belong to a clan or tribe?',
    translation: '您是否属于一个宗族或者部落？'
  },
  {
    text: 'Provide the following information:',
    translation: '请提供以下信息：'
  },
  {
    text: 'Clan or Tribe Name',
    translation: '宗族或者部落名称'
  },
  {
    text: 'Provide a List of Languages You Speak',
    translation: '请列出您所说语言的种类'
  },
  {
    text: 'Language Name',
    translation: '语言名字（只讲中文请填mandarin）'
  },
  {
    text: 'Add Another',
    translation: '增加另一个'
  },
  {
    text: 'Remove',
    translation: '移走'
  },
  {
    text: 'Do you have any specialized skills or training, such as firearms, explosives, nuclear, biological, or chemical experience?',
    translation: '您是否具有特殊技能或接受过特殊培训，例如有关枪械、炸药、核装置、生物或化学方面的经验？'
  },
  {
    text: 'Explain',
    translation: '解释'
  },
  {
    text: 'Yes',
    translation: '是'
  },
  {
    text: 'No',
    translation: '否'
  },
  // 组织相关字段
  {
    text: 'Have you belonged to, contributed to, or worked for any professional, social, or charitable organization?',
    translation: '您是否隶属于、捐助过或为任何专业、社会或慈善组织工作过？'
  },
  // 军事服务相关字段
  {
    text: 'Have you ever served in the military?',
    translation: '您是否曾在军队服役？'
  },
  {
    text: 'Name of Country/Region',
    translation: '服役国家/地区名称'
  },
  {
    text: 'Branch of Service',
    translation: '服役部门'
  },
  {
    text: 'Rank/Position',
    translation: '军衔/职位'
  },
  {
    text: 'Military Specialty',
    translation: '军事专业'
  },
  {
    text: 'Date of Service From',
    translation: '服役开始日期'
  },
  {
    text: 'Date of Service To',
    translation: '服役结束日期'
  },
  // 准军事组织相关字段
  {
    text: 'Have you ever served in, been a member of, or been involved with a paramilitary unit, vigilante unit, rebel group, guerrilla group, or insurgent organization?',
    translation: '您是否曾在准军事部队、民兵组织、叛乱集团、游击队或叛乱组织中服役、成为成员或参与其中？'
  },
  // 旅行相关字段
  {
    text: 'Have you traveled to any countries/regions within the last five years?',
    translation: '您是否在过去五年内前往过任何国家/地区？'
  },
  {
    text: 'Provide a List of Organizations',
    translation: '请提供组织列表'
  },
  {
    text: 'Organization Name',
    translation: '组织名称'
  }
];

// 已处理的元素集合
const processedElements = new Set();

// 检测当前页面类型
function detectPageType() {
  const title = document.title;
  const pageContent = document.body.textContent || '';
  const url = window.location.href;
  
  console.log('DS-160 Full Translation: Page detection - URL:', url);
  console.log('DS-160 Full Translation: Page detection - Title:', title);
  
  // 优先通过URL判断
  if (url.includes('complete_personal.aspx')) {
    // 优先检查Page 1的特征字段
    if (pageContent.includes('Surnames') && pageContent.includes('Given Names') && pageContent.includes('Full Name in Native Alphabet')) {
      console.log('DS-160 Full Translation: Detected as page1 - found Page 1 signature fields');
      return 'page1';
    }
    // 再检查Page 2的特征字段
    else if (pageContent.includes('Country/Region of Origin') || pageContent.includes('Nationality')) {
      console.log('DS-160 Full Translation: Detected as page2 - found Page 2 signature fields');
      return 'page2';
    } 
    // 备用：通过更多Page 1特征判断
    else if (pageContent.includes('telecode') || pageContent.includes('other names')) {
      console.log('DS-160 Full Translation: Detected as page1 - found Page 1 backup fields');
      return 'page1';
    }
    // 默认返回page1（因为page1通常是第一个页面）
    else {
      console.log('DS-160 Full Translation: Defaulting to page1 - no specific signature found');
      return 'page1';
    }
  } else if (url.includes('complete_travel.aspx')) {
    return 'page3';
  } else if (url.includes('complete_travelcompanions.aspx') || url.includes('TravelCompanions')) {
    return 'page4';
  } else if (url.includes('complete_previousustravel.aspx') || url.includes('PreviousUSTravel')) {
    return 'page5';
  } else if (url.includes('complete_contact.aspx') || url.includes('AddressPhone')) {
    return 'page6';
  } else if (url.includes('Passport_Visa_Info.aspx') || url.includes('PptVisa')) {
    return 'page7';
  } else if (url.includes('complete_uscontact.aspx') || url.includes('USContact')) {
    return 'page8';
  } else if (url.includes('complete_family1.aspx') || url.includes('Relatives')) {
    return 'page9';
  } else if (url.includes('complete_family2.aspx') || url.includes('Spouse')) {
    return 'page10';
  } else if (url.includes('complete_workeducation1.aspx') || url.includes('WorkEducation1')) {
    return 'page11';
  } else if (url.includes('complete_workeducation2.aspx') || url.includes('WorkEducation2')) {
    return 'page12';
  } else if (url.includes('complete_workeducation3.aspx') || url.includes('WorkEducation3')) {
    return 'page13';
  } else if (url.includes('complete_securityandbackground1.aspx') || url.includes('SecurityandBackground1')) {
    return 'page14';
  } else if (url.includes('complete_securityandbackground2.aspx') || url.includes('SecurityandBackground2')) {
    return 'page15';
  } else if (url.includes('complete_securityandbackground3.aspx') || url.includes('SecurityandBackground3')) {
    return 'page16';
  } else if (url.includes('complete_securityandbackground4.aspx') || url.includes('SecurityandBackground4')) {
    return 'page17';
  } else if (url.includes('complete_securityandbackground5.aspx') || url.includes('SecurityandBackground5')) {
    return 'page18';
  }
  
  // 备用：通过标题和内容判断
  if (title.includes('Personal Information 1') || pageContent.includes('Surnames')) {
    return 'page1';
  } else if (title.includes('Personal Information 2') || pageContent.includes('Country/Region of Origin')) {
    return 'page2';
  } else if (title.includes('Travel Information') || pageContent.includes('Purpose of Trip to the U.S.')) {
    return 'page3';
  } else if (title.includes('Travel Companions') || pageContent.includes('Are there other persons traveling with you')) {
    return 'page4';
  } else if (title.includes('Previous U.S. Travel') || pageContent.includes('Have you ever been in the U.S.')) {
    return 'page5';
  } else if (title.includes('Address and Phone') || pageContent.includes('Home Address')) {
    return 'page6';
  } else if (title.includes('Passport Information') || pageContent.includes('Passport/Travel Document') || pageContent.includes('Passport Book Number')) {
    return 'page7';
  } else if (title.includes('U.S. Point of Contact') || pageContent.includes('Contact Information in the United States')) {
    return 'page8';
  } else if (title.includes('Family Information') || pageContent.includes('Father') || pageContent.includes('Mother')) {
    return 'page9';
  } else if (title.includes('Spouse') || pageContent.includes('Current Spouse') || pageContent.includes('Marital Status')) {
    return 'page10';
  } else if (title.includes('Work') || title.includes('Education') || pageContent.includes('Primary Occupation') || pageContent.includes('Present Employer')) {
    return 'page11';
  } else if (title.includes('Previous Work') || pageContent.includes('Previous Work/Education') || pageContent.includes('Additional Work')) {
    return 'page12';
  } else if (title.includes('Additional Work') || pageContent.includes('Additional Work/Education') || pageContent.includes('Do you have additional work experience')) {
    return 'page13';
  } else if (title.includes('Security and Background: Part 1') || pageContent.includes('communicable disease') || pageContent.includes('drug abuser')) {
    return 'page14';
  } else if (title.includes('Security and Background: Part 2') || pageContent.includes('arrested or convicted') || pageContent.includes('money laundering')) {
    return 'page15';
  } else if (title.includes('Security and Background: Part 3') || pageContent.includes('terrorist activities') || pageContent.includes('genocide')) {
    return 'page16';
  } else if (title.includes('Security and Background: Part 4') || pageContent.includes('immigration benefit by fraud') || pageContent.includes('removed or deported')) {
    return 'page17';
  } else if (title.includes('Security and Background: Part 5') || pageContent.includes('withheld custody') || pageContent.includes('voted in the United States in violation') || pageContent.includes('renounced United States citizenship')) {
    return 'page18';
  }
  
  return 'unknown';
}

// 获取当前页面的翻译数据
function getCurrentPageTranslations() {
  const pageType = detectPageType();
  console.log(`DS-160 Full Translation: Detected page type: ${pageType}`);
  
  switch (pageType) {
    case 'page1':
      return page1Translations;
    case 'page2':
      return page2Translations;
    case 'page3':
      return page3Translations;
    case 'page4':
      return page4Translations;
    case 'page5':
      return page5Translations;
    case 'page6':
      return page6Translations;
    case 'page7':
      return page7Translations;
    case 'page8':
      return page8Translations;
    case 'page9':
      return page9Translations;
    case 'page10':
      return page10Translations;
    case 'page11':
      return page11Translations;
    case 'page12':
      return page12Translations;
    case 'page13':
      return page13Translations;
    case 'page14':
      return page14Translations;
    case 'page15':
      return page15Translations;
    case 'page16':
      return page16Translations;
    case 'page17':
      return page17Translations;
    case 'page18':
      return page18Translations;
    default:
      console.log('DS-160 Full Translation: Unknown page type, using page1 translations as fallback');
      return page1Translations;
  }
}

// 创建翻译元素
function createTranslationSpan(text) {
  const span = document.createElement('span');
  span.textContent = ` ${text}`;
  span.style.cssText = `
    margin-left: 8px;
    color: #666;
    font-size: 13px;
    font-weight: 500;
    background: rgba(59, 130, 246, 0.1);
    padding: 2px 6px;
    border-radius: 4px;
    border: 1px solid rgba(59, 130, 246, 0.2);
  `;
  span.className = 'ds160-translation';
  return span;
}

// 清理现有翻译
function clearExistingTranslations() {
  const existing = document.querySelectorAll('.ds160-translation');
  existing.forEach(el => el.remove());
  processedElements.clear();
  console.log(`DS-160 Full Translation: Cleared ${existing.length} existing translations`);
}

// 精确注入单个翻译
function injectPreciseTranslation(elementId, translation) {
  const targetElement = document.getElementById(elementId);
  
  if (targetElement && !processedElements.has(targetElement)) {
    // 检查是否已经有翻译
    if (targetElement.querySelector('.ds160-translation')) {
      return false;
    }
    
    console.log(`DS-160 Full Translation: Injecting "${translation}" to element ${elementId}`);
    
    const translationSpan = createTranslationSpan(translation);
    targetElement.appendChild(translationSpan);
    processedElements.add(targetElement);
    return true;
  }
  
  return false;
}

// 注入具体旅行计划的翻译（动态加载的字段）
// 注入page1的动态翻译（基于文本匹配）
function injectPage1DynamicTranslations() {
  const pageType = detectPageType();
  if (pageType !== 'page1') return 0;
  
  let dynamicSuccessCount = 0;
  
  // 注入page1的动态翻译
  page1DynamicTranslations.forEach(({ text, translation }) => {
    try {
      // 查找包含指定文本的元素
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: function(node) {
            if (node.nodeValue && node.nodeValue.trim() === text.trim()) {
              return NodeFilter.FILTER_ACCEPT;
            }
            return NodeFilter.FILTER_REJECT;
          }
        }
      );
      
      const textNodes = [];
      let node;
      while (node = walker.nextNode()) {
        textNodes.push(node);
      }
      
      textNodes.forEach(textNode => {
        const parentElement = textNode.parentElement;
        if (parentElement && !parentElement.querySelector('.ds160-translation') && !processedElements.has(parentElement)) {
          console.log(`DS-160 Full Translation: Injecting page1 dynamic "${translation}" for "${text}"`);
          
          const translationSpan = createTranslationSpan(translation);
          parentElement.appendChild(translationSpan);
          processedElements.add(parentElement);
          dynamicSuccessCount++;
        }
      });
    } catch (error) {
      console.error(`DS-160 Full Translation: Error injecting page1 dynamic translation for "${text}":`, error);
    }
  });
  
  return dynamicSuccessCount;
}

function injectSpecificTravelTranslations() {
  const pageType = detectPageType();
  if (pageType !== 'page3') return 0;
  
  let specificSuccessCount = 0;
  
  // 注入具体旅行计划的翻译
  page3SpecificTravelTranslations.forEach(({ id, translation }) => {
    try {
      if (injectPreciseTranslation(id, translation)) {
        specificSuccessCount++;
        console.log(`DS-160 Full Translation: Injected specific travel field "${translation}" for ${id}`);
      }
    } catch (error) {
      console.error(`DS-160 Full Translation: Error injecting specific travel translation for ${id}:`, error);
    }
  });
  
  return specificSuccessCount;
}

// 注入page4的动态翻译（基于文本匹配）
function injectPage4DynamicTranslations() {
  const pageType = detectPageType();
  if (pageType !== 'page4') return 0;
  
  let dynamicSuccessCount = 0;
  
  // 注入page4的动态翻译
  page4DynamicTranslations.forEach(({ text, translation }) => {
    try {
      // 查找包含指定文本的元素
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: function(node) {
            if (node.nodeValue && node.nodeValue.trim() === text.trim()) {
              return NodeFilter.FILTER_ACCEPT;
            }
            return NodeFilter.FILTER_REJECT;
          }
        }
      );
      
      const textNodes = [];
      let node;
      while (node = walker.nextNode()) {
        textNodes.push(node);
      }
      
      textNodes.forEach(textNode => {
        const parentElement = textNode.parentElement;
        if (parentElement && !parentElement.querySelector('.ds160-translation') && !processedElements.has(parentElement)) {
          console.log(`DS-160 Full Translation: Injecting page4 dynamic "${translation}" for "${text}"`);
          
          const translationSpan = createTranslationSpan(translation);
          parentElement.appendChild(translationSpan);
          processedElements.add(parentElement);
          dynamicSuccessCount++;
        }
      });
    } catch (error) {
      console.error(`DS-160 Full Translation: Error injecting page4 dynamic translation for "${text}":`, error);
    }
  });
  
  return dynamicSuccessCount;
}

// 注入page5的动态翻译（基于文本匹配）
function injectPage5DynamicTranslations() {
  const pageType = detectPageType();
  if (pageType !== 'page5') return 0;
  
  let dynamicSuccessCount = 0;
  
  // 注入page5的动态翻译
  page5DynamicTranslations.forEach(({ text, translation }) => {
    try {
      // 查找包含指定文本的元素
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: function(node) {
            if (node.nodeValue && node.nodeValue.trim() === text.trim()) {
              return NodeFilter.FILTER_ACCEPT;
            }
            return NodeFilter.FILTER_REJECT;
          }
        }
      );
      
      const textNodes = [];
      let node;
      while (node = walker.nextNode()) {
        textNodes.push(node);
      }
      
      textNodes.forEach(textNode => {
        const parentElement = textNode.parentElement;
        if (parentElement && !parentElement.querySelector('.ds160-translation') && !processedElements.has(parentElement)) {
          console.log(`DS-160 Full Translation: Injecting page5 dynamic "${translation}" for "${text}"`);
          
          const translationSpan = createTranslationSpan(translation);
          parentElement.appendChild(translationSpan);
          processedElements.add(parentElement);
          dynamicSuccessCount++;
        }
      });
    } catch (error) {
      console.error(`DS-160 Full Translation: Error injecting page5 dynamic translation for "${text}":`, error);
    }
  });
  
  return dynamicSuccessCount;
}

// 注入page6的动态翻译（基于文本匹配）
function injectPage6DynamicTranslations() {
  const pageType = detectPageType();
  if (pageType !== 'page6') return 0;
  
  let dynamicSuccessCount = 0;
  
  // 注入page6的动态翻译
  page6DynamicTranslations.forEach(({ text, translation }) => {
    try {
      // 查找包含指定文本的元素
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: function(node) {
            if (node.nodeValue && node.nodeValue.trim() === text.trim()) {
              return NodeFilter.FILTER_ACCEPT;
            }
            return NodeFilter.FILTER_REJECT;
          }
        }
      );
      
      const textNodes = [];
      let node;
      while (node = walker.nextNode()) {
        textNodes.push(node);
      }
      
      textNodes.forEach(textNode => {
        const parentElement = textNode.parentElement;
        if (parentElement && !parentElement.querySelector('.ds160-translation') && !processedElements.has(parentElement)) {
          console.log(`DS-160 Full Translation: Injecting page6 dynamic "${translation}" for "${text}"`);
          
          const translationSpan = createTranslationSpan(translation);
          parentElement.appendChild(translationSpan);
          processedElements.add(parentElement);
          dynamicSuccessCount++;
        }
      });
    } catch (error) {
      console.error(`DS-160 Full Translation: Error injecting page6 dynamic translation for "${text}":`, error);
    }
  });
  
  return dynamicSuccessCount;
}

// 注入page7的动态翻译（基于文本匹配）
function injectPage7DynamicTranslations() {
  const pageType = detectPageType();
  if (pageType !== 'page7') return 0;
  
  let dynamicSuccessCount = 0;
  
  // 注入page7的动态翻译
  page7DynamicTranslations.forEach(({ text, translation }) => {
    try {
      // 查找包含指定文本的元素
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: function(node) {
            if (node.nodeValue && node.nodeValue.trim() === text.trim()) {
              return NodeFilter.FILTER_ACCEPT;
            }
            return NodeFilter.FILTER_REJECT;
          }
        }
      );
      
      const textNodes = [];
      let node;
      while (node = walker.nextNode()) {
        textNodes.push(node);
      }
      
      textNodes.forEach(textNode => {
        const parentElement = textNode.parentElement;
        if (parentElement && !parentElement.querySelector('.ds160-translation') && !processedElements.has(parentElement)) {
          console.log(`DS-160 Full Translation: Injecting page7 dynamic "${translation}" for "${text}"`);
          
          const translationSpan = createTranslationSpan(translation);
          parentElement.appendChild(translationSpan);
          processedElements.add(parentElement);
          dynamicSuccessCount++;
        }
      });
    } catch (error) {
      console.error(`DS-160 Full Translation: Error injecting page7 dynamic translation for "${text}":`, error);
    }
  });
  
  return dynamicSuccessCount;
}

// 注入page8的动态翻译（基于文本匹配）
function injectPage8DynamicTranslations() {
  const pageType = detectPageType();
  if (pageType !== 'page8') return 0;
  
  let dynamicSuccessCount = 0;
  
  // 注入page8的动态翻译
  page8DynamicTranslations.forEach(({ text, translation }) => {
    try {
      // 查找包含指定文本的元素
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: function(node) {
            if (node.nodeValue && node.nodeValue.trim() === text.trim()) {
              return NodeFilter.FILTER_ACCEPT;
            }
            return NodeFilter.FILTER_REJECT;
          }
        }
      );
      
      const textNodes = [];
      let node;
      while (node = walker.nextNode()) {
        textNodes.push(node);
      }
      
      textNodes.forEach(textNode => {
        const parentElement = textNode.parentElement;
        if (parentElement && !parentElement.querySelector('.ds160-translation') && !processedElements.has(parentElement)) {
          console.log(`DS-160 Full Translation: Injecting page8 dynamic "${translation}" for "${text}"`);
          
          const translationSpan = createTranslationSpan(translation);
          parentElement.appendChild(translationSpan);
          processedElements.add(parentElement);
          dynamicSuccessCount++;
        }
      });
    } catch (error) {
      console.error(`DS-160 Full Translation: Error injecting page8 dynamic translation for "${text}":`, error);
    }
  });
  
  return dynamicSuccessCount;
}

// 注入page9的动态翻译（基于文本匹配）
function injectPage9DynamicTranslations() {
  const pageType = detectPageType();
  if (pageType !== 'page9') return 0;
  
  let dynamicSuccessCount = 0;
  
  // 注入page9的动态翻译
  page9DynamicTranslations.forEach(({ text, translation }) => {
    try {
      // 查找包含指定文本的元素
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: function(node) {
            if (node.nodeValue && node.nodeValue.trim() === text.trim()) {
              return NodeFilter.FILTER_ACCEPT;
            }
            return NodeFilter.FILTER_REJECT;
          }
        }
      );
      
      const textNodes = [];
      let node;
      while (node = walker.nextNode()) {
        textNodes.push(node);
      }
      
      textNodes.forEach(textNode => {
        const parentElement = textNode.parentElement;
        if (parentElement && !parentElement.querySelector('.ds160-translation') && !processedElements.has(parentElement)) {
          console.log(`DS-160 Full Translation: Injecting page9 dynamic "${translation}" for "${text}"`);
          
          const translationSpan = createTranslationSpan(translation);
          parentElement.appendChild(translationSpan);
          processedElements.add(parentElement);
          dynamicSuccessCount++;
        }
      });
    } catch (error) {
      console.error(`DS-160 Full Translation: Error injecting page9 dynamic translation for "${text}":`, error);
    }
  });
  
  return dynamicSuccessCount;
}

// 注入page10的动态翻译（基于文本匹配）
function injectPage10DynamicTranslations() {
  const pageType = detectPageType();
  if (pageType !== 'page10') return 0;
  
  let dynamicSuccessCount = 0;
  
  // 注入page10的动态翻译
  page10DynamicTranslations.forEach(({ text, translation }) => {
    try {
      // 查找包含指定文本的元素
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: function(node) {
            if (node.nodeValue && node.nodeValue.trim() === text.trim()) {
              return NodeFilter.FILTER_ACCEPT;
            }
            return NodeFilter.FILTER_REJECT;
          }
        }
      );
      
      const textNodes = [];
      let node;
      while (node = walker.nextNode()) {
        textNodes.push(node);
      }
      
      textNodes.forEach(textNode => {
        const parentElement = textNode.parentElement;
        if (parentElement && !parentElement.querySelector('.ds160-translation') && !processedElements.has(parentElement)) {
          console.log(`DS-160 Full Translation: Injecting page10 dynamic "${translation}" for "${text}"`);
          
          const translationSpan = createTranslationSpan(translation);
          parentElement.appendChild(translationSpan);
          processedElements.add(parentElement);
          dynamicSuccessCount++;
        }
      });
    } catch (error) {
      console.error(`DS-160 Full Translation: Error injecting page10 dynamic translation for "${text}":`, error);
    }
  });
  
  return dynamicSuccessCount;
}

// 注入page11的动态翻译（基于文本匹配）
function injectPage11DynamicTranslations() {
  const pageType = detectPageType();
  if (pageType !== 'page11') return 0;
  
  let dynamicSuccessCount = 0;
  
  // 注入page11的动态翻译
  page11DynamicTranslations.forEach(({ text, translation }) => {
    try {
      // 查找包含指定文本的元素
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: function(node) {
            if (node.nodeValue && node.nodeValue.trim() === text.trim()) {
              return NodeFilter.FILTER_ACCEPT;
            }
            return NodeFilter.FILTER_REJECT;
          }
        }
      );
      
      const textNodes = [];
      let node;
      while (node = walker.nextNode()) {
        textNodes.push(node);
      }
      
      textNodes.forEach(textNode => {
        const parentElement = textNode.parentElement;
        if (parentElement && !parentElement.querySelector('.ds160-translation') && !processedElements.has(parentElement)) {
          console.log(`DS-160 Full Translation: Injecting page11 dynamic "${translation}" for "${text}"`);
          
          const translationSpan = createTranslationSpan(translation);
          parentElement.appendChild(translationSpan);
          processedElements.add(parentElement);
          dynamicSuccessCount++;
        }
      });
    } catch (error) {
      console.error(`DS-160 Full Translation: Error injecting page11 dynamic translation for "${text}":`, error);
    }
  });
  
  return dynamicSuccessCount;
}

// 注入page12的动态翻译（基于文本匹配）
function injectPage12DynamicTranslations() {
  const pageType = detectPageType();
  if (pageType !== 'page12') return 0;
  
  let dynamicSuccessCount = 0;
  
  // 注入page12的动态翻译
  page12DynamicTranslations.forEach(({ text, translation }) => {
    try {
      // 查找包含指定文本的元素
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: function(node) {
            if (node.nodeValue && node.nodeValue.trim() === text.trim()) {
              return NodeFilter.FILTER_ACCEPT;
            }
            return NodeFilter.FILTER_REJECT;
          }
        }
      );
      
      const textNodes = [];
      let node;
      while (node = walker.nextNode()) {
        textNodes.push(node);
      }
      
      textNodes.forEach(textNode => {
        const parentElement = textNode.parentElement;
        if (parentElement && !parentElement.querySelector('.ds160-translation') && !processedElements.has(parentElement)) {
          console.log(`DS-160 Full Translation: Injecting page12 dynamic "${translation}" for "${text}"`);
          
          const translationSpan = createTranslationSpan(translation);
          parentElement.appendChild(translationSpan);
          processedElements.add(parentElement);
          dynamicSuccessCount++;
        }
      });
    } catch (error) {
      console.error(`DS-160 Full Translation: Error injecting page12 dynamic translation for "${text}":`, error);
    }
  });
  
  return dynamicSuccessCount;
}

// 注入page13的动态翻译（基于文本匹配）
function injectPage13DynamicTranslations() {
  const pageType = detectPageType();
  if (pageType !== 'page13') return 0;
  
  let dynamicSuccessCount = 0;
  
  // 注入page13的动态翻译
  page13DynamicTranslations.forEach(({ text, translation }) => {
    try {
      // 查找包含指定文本的元素
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: function(node) {
            if (node.nodeValue && node.nodeValue.trim() === text.trim()) {
              return NodeFilter.FILTER_ACCEPT;
            }
            return NodeFilter.FILTER_REJECT;
          }
        }
      );
      
      const textNodes = [];
      let node;
      while (node = walker.nextNode()) {
        textNodes.push(node);
      }
      
      textNodes.forEach(textNode => {
        const parentElement = textNode.parentElement;
        if (parentElement && !parentElement.querySelector('.ds160-translation') && !processedElements.has(parentElement)) {
          console.log(`DS-160 Full Translation: Injecting page13 dynamic "${translation}" for "${text}"`);
          
          const translationSpan = createTranslationSpan(translation);
          parentElement.appendChild(translationSpan);
          processedElements.add(parentElement);
          dynamicSuccessCount++;
        }
      });
    } catch (error) {
      console.error(`DS-160 Full Translation: Error injecting page13 dynamic translation for "${text}":`, error);
    }
  });
  
  return dynamicSuccessCount;
}

// Page 14 动态翻译注入函数
function injectPage14DynamicTranslations() {
  const pageType = detectPageType();
  if (pageType !== 'page14') return 0;
  
  let dynamicSuccessCount = 0;
  
  // 注入page14的动态翻译
  page14DynamicTranslations.forEach(({ text, translation }) => {
    try {
      // 查找包含指定文本的元素
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: function(node) {
            if (node.nodeValue && node.nodeValue.trim() === text.trim()) {
              return NodeFilter.FILTER_ACCEPT;
            }
            return NodeFilter.FILTER_REJECT;
          }
        }
      );
      
      const textNodes = [];
      let node;
      while (node = walker.nextNode()) {
        textNodes.push(node);
      }
      
      textNodes.forEach(textNode => {
        const parentElement = textNode.parentElement;
        if (parentElement && !parentElement.querySelector('.ds160-translation')) {
          const translationSpan = document.createElement('span');
          translationSpan.className = 'ds160-translation';
          translationSpan.style.cssText = 'margin-left: 8px; color: #666; font-size: 13px; font-weight: 500; background: rgba(59, 130, 246, 0.1); padding: 2px 6px; border-radius: 4px; border: 1px solid rgba(59, 130, 246, 0.2);';
          translationSpan.textContent = ` ${translation}`;
          
          parentElement.appendChild(translationSpan);
          dynamicSuccessCount++;
        }
      });
    } catch (error) {
      console.error(`DS-160 Full Translation: Error injecting page14 dynamic translation for "${text}":`, error);
    }
  });
  
  return dynamicSuccessCount;
}

// Page 15 动态翻译注入函数
function injectPage15DynamicTranslations() {
  const pageType = detectPageType();
  if (pageType !== 'page15') return 0;
  
  let dynamicSuccessCount = 0;
  
  // 注入page15的动态翻译
  page15DynamicTranslations.forEach(({ text, translation }) => {
    try {
      // 查找包含指定文本的元素
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: function(node) {
            if (node.nodeValue && node.nodeValue.trim() === text.trim()) {
              return NodeFilter.FILTER_ACCEPT;
            }
            return NodeFilter.FILTER_REJECT;
          }
        }
      );
      
      const textNodes = [];
      let node;
      while (node = walker.nextNode()) {
        textNodes.push(node);
      }
      
      textNodes.forEach(textNode => {
        const parentElement = textNode.parentElement;
        if (parentElement && !parentElement.querySelector('.ds160-translation')) {
          const translationSpan = document.createElement('span');
          translationSpan.className = 'ds160-translation';
          translationSpan.style.cssText = 'margin-left: 8px; color: #666; font-size: 13px; font-weight: 500; background: rgba(59, 130, 246, 0.1); padding: 2px 6px; border-radius: 4px; border: 1px solid rgba(59, 130, 246, 0.2);';
          translationSpan.textContent = ` ${translation}`;
          
          parentElement.appendChild(translationSpan);
          dynamicSuccessCount++;
        }
      });
    } catch (error) {
      console.error(`DS-160 Full Translation: Error injecting page15 dynamic translation for "${text}":`, error);
    }
  });
  
  return dynamicSuccessCount;
}

// Page 16 动态翻译注入函数
function injectPage16DynamicTranslations() {
  const pageType = detectPageType();
  if (pageType !== 'page16') return 0;
  
  let dynamicSuccessCount = 0;
  
  // 注入page16的动态翻译
  page16DynamicTranslations.forEach(({ text, translation }) => {
    try {
      // 查找包含指定文本的元素
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: function(node) {
            if (node.nodeValue && node.nodeValue.trim() === text.trim()) {
              return NodeFilter.FILTER_ACCEPT;
            }
            return NodeFilter.FILTER_REJECT;
          }
        }
      );
      
      const textNodes = [];
      let node;
      while (node = walker.nextNode()) {
        textNodes.push(node);
      }
      
      textNodes.forEach(textNode => {
        const parentElement = textNode.parentElement;
        if (parentElement && !parentElement.querySelector('.ds160-translation')) {
          const translationSpan = document.createElement('span');
          translationSpan.className = 'ds160-translation';
          translationSpan.style.cssText = 'margin-left: 8px; color: #666; font-size: 13px; font-weight: 500; background: rgba(59, 130, 246, 0.1); padding: 2px 6px; border-radius: 4px; border: 1px solid rgba(59, 130, 246, 0.2);';
          translationSpan.textContent = ` ${translation}`;
          
          parentElement.appendChild(translationSpan);
          dynamicSuccessCount++;
        }
      });
    } catch (error) {
      console.error(`DS-160 Full Translation: Error injecting page16 dynamic translation for "${text}":`, error);
    }
  });
  
  return dynamicSuccessCount;
}

// Page 17 动态翻译注入函数
function injectPage17DynamicTranslations() {
  const pageType = detectPageType();
  if (pageType !== 'page17') return 0;
  
  let dynamicSuccessCount = 0;
  
  // 注入page17的动态翻译
  page17DynamicTranslations.forEach(({ text, translation }) => {
    try {
      // 查找包含指定文本的元素
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: function(node) {
            if (node.nodeValue && node.nodeValue.trim() === text.trim()) {
              return NodeFilter.FILTER_ACCEPT;
            }
            return NodeFilter.FILTER_REJECT;
          }
        }
      );
      
      const textNodes = [];
      let node;
      while (node = walker.nextNode()) {
        textNodes.push(node);
      }
      
      textNodes.forEach(textNode => {
        const parentElement = textNode.parentElement;
        if (parentElement && !parentElement.querySelector('.ds160-translation')) {
          const translationSpan = document.createElement('span');
          translationSpan.className = 'ds160-translation';
          translationSpan.style.cssText = 'margin-left: 8px; color: #666; font-size: 13px; font-weight: 500; background: rgba(59, 130, 246, 0.1); padding: 2px 6px; border-radius: 4px; border: 1px solid rgba(59, 130, 246, 0.2);';
          translationSpan.textContent = ` ${translation}`;
          
          parentElement.appendChild(translationSpan);
          dynamicSuccessCount++;
        }
      });
    } catch (error) {
      console.error(`DS-160 Full Translation: Error injecting page17 dynamic translation for "${text}":`, error);
    }
  });
  
  return dynamicSuccessCount;
}

// Page 18 动态翻译注入函数
function injectPage18DynamicTranslations() {
  const pageType = detectPageType();
  if (pageType !== 'page18') return 0;
  
  let dynamicSuccessCount = 0;
  
  // 注入page18的动态翻译
  page18DynamicTranslations.forEach(({ text, translation }) => {
    try {
      // 查找包含指定文本的元素
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: function(node) {
            if (node.nodeValue && node.nodeValue.trim() === text.trim()) {
              return NodeFilter.FILTER_ACCEPT;
            }
            return NodeFilter.FILTER_REJECT;
          }
        }
      );
      
      const textNodes = [];
      let node;
      while (node = walker.nextNode()) {
        textNodes.push(node);
      }
      
      textNodes.forEach(textNode => {
        const parentElement = textNode.parentElement;
        if (parentElement && !parentElement.querySelector('.ds160-translation')) {
          const translationSpan = document.createElement('span');
          translationSpan.className = 'ds160-translation';
          translationSpan.style.cssText = 'margin-left: 8px; color: #666; font-size: 13px; font-weight: 500; background: rgba(59, 130, 246, 0.1); padding: 2px 6px; border-radius: 4px; border: 1px solid rgba(59, 130, 246, 0.2);';
          translationSpan.textContent = ` ${translation}`;
          
          parentElement.appendChild(translationSpan);
          dynamicSuccessCount++;
        }
      });
    } catch (error) {
      console.error(`DS-160 Full Translation: Error injecting page18 dynamic translation for "${text}":`, error);
    }
  });
  
  return dynamicSuccessCount;
}

// 注入所有翻译
function injectAllTranslations() {
  console.log('DS-160 Full Translation: Starting multi-page injection...');
  
  // 先清理现有翻译
  clearExistingTranslations();
  
  // 获取当前页面的翻译数据
  const currentPageTranslations = getCurrentPageTranslations();
  const pageType = detectPageType();
  
  console.log(`DS-160 Full Translation: Page type: ${pageType}, Translation count: ${currentPageTranslations.length}`);
  
  let successCount = 0;
  let notFoundCount = 0;
  let foundButFailedCount = 0;
  
  // 注入ID基础的翻译
  currentPageTranslations.forEach(({ id, translation }) => {
    try {
      const element = document.getElementById(id);
      if (element) {
        if (injectPreciseTranslation(id, translation)) {
          successCount++;
          console.log(`DS-160 Full Translation: ✓ Injected "${translation}" to ${id}`);
        } else {
          foundButFailedCount++;
          console.log(`DS-160 Full Translation: ✗ Found but failed to inject to ${id}`);
        }
      } else {
        notFoundCount++;
        console.log(`DS-160 Full Translation: ? Element not found: ${id}`);
      }
    } catch (error) {
      console.error(`DS-160 Full Translation: Error injecting to ${id}:`, error);
    }
  });
  
  // 注入特定页面的动态翻译
  const page1DynamicCount = injectPage1DynamicTranslations();
  const specificSuccessCount = injectSpecificTravelTranslations();
  const page4DynamicCount = injectPage4DynamicTranslations();
  const page5DynamicCount = injectPage5DynamicTranslations();
  const page6DynamicCount = injectPage6DynamicTranslations();
  const page7DynamicCount = injectPage7DynamicTranslations();
  const page8DynamicCount = injectPage8DynamicTranslations();
  const page9DynamicCount = injectPage9DynamicTranslations();
  const page10DynamicCount = injectPage10DynamicTranslations();
  const page11DynamicCount = injectPage11DynamicTranslations();
  const page12DynamicCount = injectPage12DynamicTranslations();
  const page13DynamicCount = injectPage13DynamicTranslations();
  const page14DynamicCount = injectPage14DynamicTranslations();
  const page15DynamicCount = injectPage15DynamicTranslations();
  const page16DynamicCount = injectPage16DynamicTranslations();
  const page17DynamicCount = injectPage17DynamicTranslations();
  const page18DynamicCount = injectPage18DynamicTranslations();
  successCount += page1DynamicCount + specificSuccessCount + page4DynamicCount + page5DynamicCount + page6DynamicCount + page7DynamicCount + page8DynamicCount + page9DynamicCount + page10DynamicCount + page11DynamicCount + page12DynamicCount + page13DynamicCount + page14DynamicCount + page15DynamicCount + page16DynamicCount + page17DynamicCount + page18DynamicCount;
  
  console.log(`DS-160 Full Translation: Injection completed! Basic: ${successCount - page1DynamicCount - specificSuccessCount - page4DynamicCount - page5DynamicCount - page6DynamicCount - page7DynamicCount - page8DynamicCount - page9DynamicCount - page10DynamicCount - page11DynamicCount - page12DynamicCount - page13DynamicCount - page14DynamicCount - page15DynamicCount - page16DynamicCount - page17DynamicCount - page18DynamicCount}, Page1 Dynamic: ${page1DynamicCount}, Page3 Specific: ${specificSuccessCount}, Page4 Dynamic: ${page4DynamicCount}, Page5 Dynamic: ${page5DynamicCount}, Page6 Dynamic: ${page6DynamicCount}, Page7 Dynamic: ${page7DynamicCount}, Page8 Dynamic: ${page8DynamicCount}, Page9 Dynamic: ${page9DynamicCount}, Page10 Dynamic: ${page10DynamicCount}, Page11 Dynamic: ${page11DynamicCount}, Page12 Dynamic: ${page12DynamicCount}, Page13 Dynamic: ${page13DynamicCount}, Page14 Dynamic: ${page14DynamicCount}, Page15 Dynamic: ${page15DynamicCount}, Page16 Dynamic: ${page16DynamicCount}, Page17 Dynamic: ${page17DynamicCount}, Page18 Dynamic: ${page18DynamicCount}, Not found: ${notFoundCount}, Found but failed: ${foundButFailedCount}`);
  return successCount;
}

// 节流的重新注入函数
let reinjectTimer;
function scheduleReinject(delay = 500) {
  clearTimeout(reinjectTimer);
  reinjectTimer = setTimeout(() => {
    console.log('DS-160 Full Translation: Scheduled re-injection triggered');
    injectAllTranslations();
  }, delay);
}

// 监听页面变化
const observer = new MutationObserver((mutations) => {
  let shouldReinject = false;
  let hasFormChanges = false;
  
  mutations.forEach(mutation => {
    if (mutation.type === 'childList') {
      // 检查是否有节点被移除（可能包含我们的翻译）
      if (mutation.removedNodes.length > 0) {
        mutation.removedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node;
            if ((element.classList && element.classList.contains('ds160-translation')) ||
                element.querySelector('.ds160-translation')) {
              shouldReinject = true;
              console.log('DS-160 Full Translation: Translation removed, will re-inject');
            }
          }
        });
      }
      
      // 检查是否有新的表单元素被添加
      if (mutation.addedNodes.length > 0) {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node;
            if (element.tagName === 'LABEL' || 
                element.tagName === 'FORM' ||
                element.tagName === 'DIV' ||
                element.tagName === 'SPAN' ||
                (element.id && element.id.includes('FormView1')) ||
                (element.id && element.id.includes('SiteContentPlaceHolder')) ||
                (element.className && element.className.includes('form')) ||
                (element.className && element.className.includes('field')) ||
                element.querySelector('label') ||
                element.querySelector('[id*="lbl"]')) {
              hasFormChanges = true;
              console.log('DS-160 Full Translation: New form content detected, will re-inject');
            }
          }
        });
      }
    }
    
    // 检查属性变化
    if (mutation.type === 'attributes') {
      const target = mutation.target;
      if (target.tagName === 'DIV' || target.tagName === 'SPAN' || target.tagName === 'LABEL') {
        hasFormChanges = true;
      }
    }
  });
  
  if (shouldReinject || hasFormChanges) {
    scheduleReinject(shouldReinject ? 100 : 800);
  }
});

// 监听AJAX请求完成（ASP.NET特有）
function interceptAjaxUpdates() {
  // 监听ASP.NET的__doPostBack函数
  if (window.__doPostBack) {
    const originalDoPostBack = window.__doPostBack;
    window.__doPostBack = function(eventTarget, eventArgument) {
      console.log('DS-160 Full Translation: __doPostBack detected, will re-inject after update');
      
      // 调用原始函数
      const result = originalDoPostBack.call(this, eventTarget, eventArgument);
      
      // 延迟重新注入翻译
      scheduleReinject(1000);
      
      return result;
    };
  }
  
  // 监听UpdatePanel更新
  if (window.Sys && window.Sys.WebForms && window.Sys.WebForms.PageRequestManager) {
    const prm = window.Sys.WebForms.PageRequestManager.getInstance();
    
    prm.add_endRequest(function() {
      console.log('DS-160 Full Translation: UpdatePanel update completed, re-injecting translations');
      scheduleReinject(500);
    });
  }
}

// 监听点击事件 - 增强版
function setupClickListeners() {
  document.addEventListener('click', function(event) {
    const target = event.target;
    
    if (target.type === 'radio' || 
        target.type === 'checkbox' ||
        target.tagName === 'SELECT' ||
        (target.tagName === 'LABEL' && target.getAttribute('for'))) {
      
      console.log('DS-160 Full Translation: Form interaction detected, scheduling re-injection');
      
      // 对于radio按钮，立即检查并重注入
      if (target.type === 'radio') {
        console.log(`DS-160 Full Translation: Radio button clicked: ${target.value}, immediate re-injection`);
        
        // 立即重注入
        scheduleReinject(100);
        
        // 额外的多次重注入确保成功
        setTimeout(() => {
          console.log('DS-160 Full Translation: First backup re-injection for radio change');
          injectAllTranslations();
        }, 300);
        
        setTimeout(() => {
          console.log('DS-160 Full Translation: Second backup re-injection for radio change');
          injectAllTranslations();
        }, 1000);
        
        setTimeout(() => {
          console.log('DS-160 Full Translation: Third backup re-injection for radio change');
          injectAllTranslations();
        }, 2000);
      } else {
        scheduleReinject(800);
      }
    }
  });
  
  document.addEventListener('change', function(event) {
    const target = event.target;
    if (target.type === 'radio' || target.type === 'checkbox' || target.tagName === 'SELECT') {
      console.log(`DS-160 Full Translation: Form change detected on ${target.type}, value: ${target.value}`);
      
      // 更积极的重注入策略
      scheduleReinject(200);
      
      // 多次延迟检查，确保动态内容完全加载
      setTimeout(() => {
        console.log('DS-160 Full Translation: Change event - 500ms re-injection');
        injectAllTranslations();
      }, 500);
      
      setTimeout(() => {
        console.log('DS-160 Full Translation: Change event - 1200ms re-injection');
        injectAllTranslations();
      }, 1200);
      
      setTimeout(() => {
        console.log('DS-160 Full Translation: Change event - 2500ms re-injection');
        injectAllTranslations();
      }, 2500);
    }
  });
}

// 初始化函数
function initialize() {
  console.log('DS-160 Full Translation: Initializing multi-page dynamic system...');
  
  // 初始注入
  setTimeout(() => {
    injectAllTranslations();
  }, 1500);
  
  // 设置各种监听器
  setupClickListeners();
  interceptAjaxUpdates();
}

// 启动观察
if (document.body) {
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['class', 'style', 'hidden']
  });
}

// 消息处理
if (typeof chrome !== 'undefined' && chrome.runtime) {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'GET_TRANSLATION_STATUS') {
      const count = document.querySelectorAll('.ds160-translation').length;
      const currentPageTranslations = getCurrentPageTranslations();
      const pageType = detectPageType();
      
      const pageTypeNames = {
        'page1': 'Personal Information 1',
        'page2': 'Personal Information 2', 
        'page3': 'Travel Information',
        'page4': 'Travel Companions',
        'page5': 'Previous U.S. Travel',
        'page6': 'Address and Phone',
        'page7': 'Passport Information',
        'page8': 'U.S. Point of Contact Information',
        'page9': 'Family Information: Relatives',
        'page10': 'Family Information: Spouse',
        'page11': 'Present Work/Education/Training Information',
        'page12': 'Previous Work/Education/Training Information',
        'page13': 'Additional Work/Education/Training Information',
        'page14': 'Security and Background: Part 1',
        'page15': 'Security and Background: Part 2',
        'page16': 'Security and Background: Part 3',
        'page17': 'Security and Background: Part 4',
        'page18': 'Security and Background: Part 5'
      };
      
      sendResponse({
        initialized: true,
        enabled: true,
        translatedCount: count,
        pageType: `DS-160 ${pageTypeNames[pageType] || 'Unknown'}`,
        totalFields: currentPageTranslations.length
      });
    } else if (message.type === 'REFRESH_TRANSLATION') {
      const count = injectAllTranslations();
      const currentPageTranslations = getCurrentPageTranslations();
      sendResponse({ 
        success: true, 
        injectedCount: count,
        totalFields: currentPageTranslations.length
      });
    }
    return true;
  });
}

// 启动
if (document.readyState === 'complete') {
  initialize();
} else {
  document.addEventListener('DOMContentLoaded', initialize);
  window.addEventListener('load', initialize);
}

// 增强的定期检查和维护翻译
setInterval(() => {
  const currentCount = document.querySelectorAll('.ds160-translation').length;
  const currentPageTranslations = getCurrentPageTranslations();
  const pageType = detectPageType();
  
  // 计算期望的翻译数量（包括特定页面的动态内容）
  let expectedCount = currentPageTranslations.filter(t => document.getElementById(t.id)).length;
  
  // 为特定页面添加动态翻译的检查
  if (pageType === 'page3') {
    expectedCount += page3SpecificTravelTranslations.filter(t => document.getElementById(t.id)).length;
  } else if (pageType === 'page4') {
    // page4的动态翻译基于文本匹配，需要不同的检查方式
    page4DynamicTranslations.forEach(({ text }) => {
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: function(node) {
            if (node.nodeValue && node.nodeValue.trim() === text.trim()) {
              return NodeFilter.FILTER_ACCEPT;
            }
            return NodeFilter.FILTER_REJECT;
          }
        }
      );
      
      let node;
      while (node = walker.nextNode()) {
        expectedCount++;
        break; // 只计算第一个匹配的
      }
    });
  }
  
  if (currentCount < expectedCount) {
    console.log(`DS-160 Full Translation: Maintenance check - Page: ${pageType}, Current: ${currentCount}, Expected: ${expectedCount}, re-injecting...`);
    injectAllTranslations();
  }
}, 1500);

// 额外的积极检查机制 - 更频繁的检查
setInterval(() => {
  // 检查是否有新的未翻译的标签出现
  const allLabels = document.querySelectorAll('label[id*="lbl"], span[id*="lbl"]');
  let needReinject = false;
  
  allLabels.forEach(label => {
    if (!label.querySelector('.ds160-translation') && !processedElements.has(label)) {
      needReinject = true;
    }
  });
  
  if (needReinject) {
    console.log('DS-160 Full Translation: Found new untranslated labels, re-injecting...');
    injectAllTranslations();
  }
}, 800);

// 专门针对page4的检查机制
setInterval(() => {
  const pageType = detectPageType();
  if (pageType === 'page4') {
    // 检查page4特有的动态字段
    const enterPersonsText = document.querySelector('span[id*="lblPersonsTraveling"]');
    const surnameLabel = document.querySelector('label[id*="lblTRAV_COMP_SURNAME"]');
    const givenNameLabel = document.querySelector('label[id*="lblTRAV_COM_GIVEN_NAME"]');
    const relationshipLabel = document.querySelector('label[id*="lblTCRelationship"]');
    
    let page4NeedsReinject = false;
    
    [enterPersonsText, surnameLabel, givenNameLabel, relationshipLabel].forEach(element => {
      if (element && !element.querySelector('.ds160-translation')) {
        page4NeedsReinject = true;
      }
    });
    
    if (page4NeedsReinject) {
      console.log('DS-160 Full Translation: Page 4 specific check - missing translations detected, re-injecting...');
      injectAllTranslations();
    }
  }
}, 2000);

// 专门针对page6的检查机制
setInterval(() => {
  const pageType = detectPageType();
  if (pageType === 'page6') {
    // 检查page6特有的动态字段
    const mailingAddrQuestion = document.querySelector('label[id*="lblMAILING_ADDR_SAME"]');
    const mailingAddrFields = document.querySelector('span[id*="lblCompleteInfo"]');
    const additionalEmailQuestion = document.querySelector('label[id*="lblAddEmail"]');
    const additionalPhoneQuestion = document.querySelector('label[id*="lblAddPhone"]');

    const socialMediaQuestion = document.querySelector('span[id*="lblSocialMediaQuestion"]');
    const additionalSocialQuestion = document.querySelector('label[id*="lblAddSocial"]');
    
    let page6NeedsReinject = false;
    
    [mailingAddrQuestion, mailingAddrFields, additionalEmailQuestion, additionalPhoneQuestion, 
     socialMediaQuestion, additionalSocialQuestion].forEach(element => {
      if (element && !element.querySelector('.ds160-translation')) {
        page6NeedsReinject = true;
      }
    });
    
    if (page6NeedsReinject) {
      console.log('DS-160 Full Translation: Page 6 specific check - missing translations detected, re-injecting...');
      injectAllTranslations();
    }
  }
}, 1800);

// 专门针对page7的检查机制
setInterval(() => {
  const pageType = detectPageType();
  if (pageType === 'page7') {
    // 检查page7特有的动态字段
    const passportTypeField = document.querySelector('label[id*="lblPPT_TYPE"]');
    const passportNumberField = document.querySelector('label[id*="lblPPT_NUM"]');
    const issuedCountryField = document.querySelector('label[id*="lblPPT_ISSUED_CNTRY"]');
    const lostPassportQuestion = document.querySelector('label[id*="lblLOST_PPT_IND"]');
    
    let page7NeedsReinject = false;
    
    [passportTypeField, passportNumberField, issuedCountryField, lostPassportQuestion].forEach(element => {
      if (element && !element.querySelector('.ds160-translation')) {
        page7NeedsReinject = true;
      }
    });
    
    if (page7NeedsReinject) {
      console.log('DS-160 Full Translation: Page 7 specific check - missing translations detected, re-injecting...');
      injectAllTranslations();
    }
  }
}, 1600);

// 专门针对page8的检查机制
setInterval(() => {
  const pageType = detectPageType();
  if (pageType === 'page8') {
    // 检查page8特有的字段
    const contactPersonField = document.querySelector('span[id*="lblContactPerson"]');
    const surnameField = document.querySelector('label[id*="lblUS_POC_SURNAME"]');
    const organizationField = document.querySelector('label[id*="lblUS_POC_ORGANIZATION"]');
    const relationshipField = document.querySelector('label[id*="lblUS_POC_REL_TO_APP"]');
    const addressInfoField = document.querySelector('span[id*="lblPOCAddressPhoneInfo"]');
    const streetAddressField = document.querySelector('label[id*="lblUS_POC_ADDR_LN1"]');
    const cityField = document.querySelector('label[id*="lblUS_POC_ADDR_CITY"]');
    const stateField = document.querySelector('label[id*="lblUS_POC_ADDR_STATE"]');
    const zipCodeField = document.querySelector('label[id*="lblUS_POC_ADDR_POSTAL_CD"]');
    const phoneField = document.querySelector('label[id*="lblUS_POC_HOME_TEL"]');
    const emailField = document.querySelector('label[id*="lblUS_POC_EMAIL_ADDR"]');
    
    let page8NeedsReinject = false;
    
    [contactPersonField, surnameField, organizationField, relationshipField, 
     addressInfoField, streetAddressField, cityField, stateField, zipCodeField, 
     phoneField, emailField].forEach(element => {
      if (element && !element.querySelector('.ds160-translation')) {
        page8NeedsReinject = true;
      }
    });
    
    if (page8NeedsReinject) {
      console.log('DS-160 Full Translation: Page 8 specific check - missing translations detected, re-injecting...');
      injectAllTranslations();
    }
  }
}, 1700);

// 专门针对page9的检查机制
setInterval(() => {
  const pageType = detectPageType();
  if (pageType === 'page9') {
    // 检查page9特有的字段
    const pageNoteField = document.querySelector('span[id*="lblPageNote1"]');
    const fatherNameField = document.querySelector('span[id*="Label9"]');
    const motherNameField = document.querySelector('span[id*="Label14"]');
    const fatherSurnameField = document.querySelector('label[id*="lblFATHER_SURNAME"]');
    const motherSurnameField = document.querySelector('label[id*="lblMOTHER_SURNAME"]');
    const fatherUSField = document.querySelector('label[id*="lblFATHER_LIVE_IN_US_IND"]');
    const motherUSField = document.querySelector('label[id*="lblMOTHER_LIVE_IN_US_IND"]');
    const relativesField = document.querySelector('label[id*="lblUS_IMMED_RELATIVE_IND"]');
    
    let page9NeedsReinject = false;
    
    [pageNoteField, fatherNameField, motherNameField, fatherSurnameField, 
     motherSurnameField, fatherUSField, motherUSField, relativesField].forEach(element => {
      if (element && !element.querySelector('.ds160-translation')) {
        page9NeedsReinject = true;
      }
    });
    
    if (page9NeedsReinject) {
      console.log('DS-160 Full Translation: Page 9 specific check - missing translations detected, re-injecting...');
      injectAllTranslations();
    }
  }
}, 1800);

// 专门针对page1的检查机制
setInterval(() => {
  const pageType = detectPageType();
  if (pageType === 'page1') {
    // 检查page1特有的字段
    const surnameField = document.querySelector('label[id*="lblAPP_SURNAME"]');
    const givenNameField = document.querySelector('label[id*="lblAPP_GIVEN_NAME"]');
    const nativeNameField = document.querySelector('label[id*="lblAPP_FULL_NAME_NATIVE"]');
    const otherNamesField = document.querySelector('label[id*="lblOtherNamesUsed"]');
    const telecodeField = document.querySelector('label[id*="lblTelecodeQuestion"]');
    const genderField = document.querySelector('label[id*="lblAPP_GENDER"]');
    const maritalField = document.querySelector('label[id*="lblAPP_MARITAL_STATUS"]');
    const dateOfBirthField = document.querySelector('span[id*="lblDatePlaceOfBirth"]');
    const pageNoteField = document.querySelector('span[id*="lblPageNote1"]');
    
    let page1NeedsReinject = false;
    
    // 检查动态出现的其他姓名和电码字段
    const otherSurnameField = document.querySelector('label[id*="DListAlias_ctl00_lblSURNAME"]');
    const otherGivenNameField = document.querySelector('label[id*="DListAlias_ctl00_lblGIVEN_NAME"]');
    const telecodeSurnameField = document.querySelector('label[id*="lblAPP_TelecodeSURNAME"]');
    const telecodeGivenNameField = document.querySelector('label[id*="lblAPP_TelecodeGIVEN_NAME"]');
    
    [surnameField, givenNameField, nativeNameField, otherNamesField, 
     telecodeField, genderField, maritalField, dateOfBirthField, pageNoteField,
     otherSurnameField, otherGivenNameField, telecodeSurnameField, telecodeGivenNameField].forEach(element => {
      if (element && !element.querySelector('.ds160-translation')) {
        page1NeedsReinject = true;
      }
    });
    
    if (page1NeedsReinject) {
      console.log('DS-160 Full Translation: Page 1 specific check - missing translations detected, re-injecting...');
      injectAllTranslations();
    }
  }
}, 1500);

// 专门针对page10的检查机制
setInterval(() => {
  const pageType = detectPageType();
  if (pageType === 'page10') {
    // 检查page10特有的字段
    const spouseInfoField = document.querySelector('span[id*="lblSpouseInfo"]');
    const pageNoteField = document.querySelector('span[id*="lblPageNote1"]');
    const spouseNameInfoField = document.querySelector('span[id*="lblSpouseNameInfo"]');
    const spouseSurnameField = document.querySelector('label[id*="lblSpouseSurname"]');
    const spouseGivenNameField = document.querySelector('label[id*="lblSpouseGivenName"]');
    const spouseDOBField = document.querySelector('label[id*="lblSpouseDOB"]');
    const spouseNatField = document.querySelector('label[id*="SpouseNatLabel"]');
    const spouseAddressField = document.querySelector('label[id*="lblSPOUSE_ADDR_LN1"]');
    const spouseCityField = document.querySelector('label[id*="lblSPOUSE_ADDR_CITY"]');
    
    let page10NeedsReinject = false;
    
    [spouseInfoField, pageNoteField, spouseNameInfoField, spouseSurnameField, 
     spouseGivenNameField, spouseDOBField, spouseNatField, spouseAddressField, spouseCityField].forEach(element => {
      if (element && !element.querySelector('.ds160-translation')) {
        page10NeedsReinject = true;
      }
    });
    
    if (page10NeedsReinject) {
      console.log('DS-160 Full Translation: Page 10 specific check - missing translations detected, re-injecting...');
      injectAllTranslations();
    }
  }
}, 1900);

// 专门针对page11的检查机制
setInterval(() => {
  const pageType = detectPageType();
  if (pageType === 'page11') {
    // 检查page11特有的字段
    const pageNoteField = document.querySelector('span[id*="lblPageNote1"]');
    const occupationField = document.querySelector('label[id*="lblPRESENT_OCCUPATION"]');
    const nameField = document.querySelector('label[id*="lblName"]');
    const addressField = document.querySelector('label[id*="lblEmpSchAddr1"]');
    const cityField = document.querySelector('label[id*="lblEmpSchCity"]');
    const stateField = document.querySelector('label[id*="lblEmpSchStateProvince"]');
    const countryField = document.querySelector('label[id*="lblEmpSchCountry"]');
    const phoneField = document.querySelector('label[id*="lblWORK_EDUC_TEL"]');
    const startDateField = document.querySelector('label[id*="lblWORK_EDUC_START_DTE"]');
    const incomeField = document.querySelector('label[id*="lblWORK_EDUC_MONTHLY_INCOME"]');
    const dutiesField = document.querySelector('label[id*="lblWORK_EDUC_DUTIES"]');
    
    let page11NeedsReinject = false;
    
    [pageNoteField, occupationField, nameField, addressField, 
     cityField, stateField, countryField, phoneField, startDateField, incomeField, dutiesField].forEach(element => {
      if (element && !element.querySelector('.ds160-translation')) {
        page11NeedsReinject = true;
      }
    });
    
    if (page11NeedsReinject) {
      console.log('DS-160 Full Translation: Page 11 specific check - missing translations detected, re-injecting...');
      injectAllTranslations();
    }
  }
}, 2000);

// 专门针对page12的检查机制
setInterval(() => {
  const pageType = detectPageType();
  if (pageType === 'page12') {
    // 检查page12特有的字段
    const pageNoteField = document.querySelector('span[id*="lblPageNote1"]');
    const employedField = document.querySelector('label[id*="lblPreviouslyEmployed"]');
    const educationField = document.querySelector('label[id*="lblOtherEduc"]');
    const employerNameField = document.querySelector('label[id*="lblEmployerName"]');
    const jobTitleField = document.querySelector('label[id*="lblJobTitle"]');
    const schoolNameField = document.querySelector('label[id*="lblSchoolName"]');
    const courseField = document.querySelector('label[id*="lblSchoolCourseOfStudy"]');
    const telephoneField = document.querySelector('label[id*="lblEmployerTelephoneNumber"]');
    const supervisorSurnameField = document.querySelector('label[id*="lblSupervisorSurname"]');
    const supervisorGivenField = document.querySelector('label[id*="lblSupervisorGivenNames"]');
    const courseInstructionField = document.querySelector('span[id*="Label8"]');
    const employerPostalField = document.querySelector('label[id*="lblEmployerPostalZone"]');
    const educPostalField = document.querySelector('label[id*="lblEDUC_INST_POSTAL_CD"]');
    
    let page12NeedsReinject = false;
    
    [pageNoteField, employedField, educationField, employerNameField, 
     jobTitleField, schoolNameField, courseField, telephoneField, supervisorSurnameField, supervisorGivenField, courseInstructionField, employerPostalField, educPostalField].forEach(element => {
      if (element && !element.querySelector('.ds160-translation')) {
        page12NeedsReinject = true;
      }
    });
    
    if (page12NeedsReinject) {
      console.log('DS-160 Full Translation: Page 12 specific check - missing translations detected, re-injecting...');
      injectAllTranslations();
    }
  }
}, 2100);

// 专门针对page13的检查机制
setInterval(() => {
  const pageType = detectPageType();
  if (pageType === 'page13') {
    // 检查page13特有的字段
    const pageNoteField = document.querySelector('span[id*="lblPageNote1"]');
    const clanTribeField = document.querySelector('label[id*="lblCLAN_TRIBE_IND"]');
    const languageInfoField = document.querySelector('span[id*="lblLANGUAGE_INFO"]');
    const languageNameField = document.querySelector('label[id*="lblLANGUAGE_NAME"]');
    const skillsField = document.querySelector('label[id*="lblSPECIALIZED_SKILLS_IND"]');
    const explainField = document.querySelector('label[id*="lblSPECIALIZED_SKILLS_EXPL"]');
    const organizationField = document.querySelector('label[id*="lblORGANIZATION_IND"]');
    const organizationInfoField = document.querySelector('span[id*="lblORGANIZATION_INFO"]');
    const militaryField = document.querySelector('label[id*="lblMILITARY_SERVICE_IND"]');
    const paramilitaryField = document.querySelector('label[id*="lblPARAMILITARY_IND"]');
    const countriesVisitedField = document.querySelector('label[id*="lblCOUNTRIES_VISITED_IND"]');
    const organizationNameField = document.querySelector('label[id*="lblORGANIZATION_NAME"]');
    
    let page13NeedsReinject = false;
    
    [pageNoteField, clanTribeField, languageInfoField, languageNameField, 
     skillsField, explainField, organizationField, organizationInfoField, militaryField, paramilitaryField, 
     countriesVisitedField, organizationNameField].forEach(element => {
      if (element && !element.querySelector('.ds160-translation')) {
        page13NeedsReinject = true;
      }
    });
    
    if (page13NeedsReinject) {
      console.log('DS-160 Full Translation: Page 13 specific check - missing translations detected, re-injecting...');
      injectAllTranslations();
    }
  }
}, 2200);

// 专门针对page14的检查机制
setInterval(() => {
  const pageType = detectPageType();
  if (pageType === 'page14') {
    // 检查page14特有的字段
    const pageNoteField = document.querySelector('span[id*="lblPageNote1"]');
    const diseaseField = document.querySelector('label[id*="lblCOMM_DISEASE_IND"]');
    const disorderField = document.querySelector('label[id*="lblDISORDER_IND"]');
    const drugField = document.querySelector('label[id*="lblDRUG_ABUSE_IND"]');
    const explainField1 = document.querySelector('label[id*="lblExplain"]');
    const explainField2 = document.querySelector('label[id*="Label3"]');
    const explainField3 = document.querySelector('label[id*="Label6"]');
    
    let page14NeedsReinject = false;
    
    [pageNoteField, diseaseField, disorderField, drugField, explainField1, explainField2, explainField3].forEach(element => {
      if (element && !element.querySelector('.ds160-translation')) {
        page14NeedsReinject = true;
      }
    });
    
    if (page14NeedsReinject) {
      console.log('DS-160 Full Translation: Page 14 specific check - missing translations detected, re-injecting...');
      injectAllTranslations();
    }
  }
}, 2300);

// 专门针对page15的检查机制
setInterval(() => {
  const pageType = detectPageType();
  if (pageType === 'page15') {
    // 检查page15特有的字段
    const pageNoteField = document.querySelector('span[id*="lblPageNote1"]');
    const arrestField = document.querySelector('label[id*="lblARREST_IND"]');
    const substanceField = document.querySelector('label[id*="lblSUBSTANCE_IND"]');
    const viceField = document.querySelector('label[id*="lblVICE_IND"]');
    const moneyLaunderField = document.querySelector('label[id*="lblMONEY_LAUNDER_IND"]');
    const humanTraffickingField = document.querySelector('label[id*="lblHUMAN_TRAFFICKING_IND"]');
    const assistTraffickingField = document.querySelector('label[id*="lblASSIST_PERSON_TRAFFIC_IND"]');
    const relatedTraffickingField = document.querySelector('label[id*="lblHUMAN_TRAFFICKING_RELATED_IND"]');
    
    let page15NeedsReinject = false;
    
    [pageNoteField, arrestField, substanceField, viceField, moneyLaunderField, 
     humanTraffickingField, assistTraffickingField, relatedTraffickingField].forEach(element => {
      if (element && !element.querySelector('.ds160-translation')) {
        page15NeedsReinject = true;
      }
    });
    
    if (page15NeedsReinject) {
      console.log('DS-160 Full Translation: Page 15 specific check - missing translations detected, re-injecting...');
      injectAllTranslations();
    }
  }
}, 2400);

// 专门针对page16的检查机制
setInterval(() => {
  const pageType = detectPageType();
  if (pageType === 'page16') {
    // 检查page16特有的字段
    const pageNoteField = document.querySelector('span[id*="lblPageNote1"]');
    const illegalActivityField = document.querySelector('label[id*="lblILLEGAL_ACTIVITY_IND"]');
    const terrorField = document.querySelector('label[id*="lblTERROR_IND"]');
    const terrorSuppField = document.querySelector('label[id*="lblTERROR_SUPP_IND"]');
    const terrorMbrField = document.querySelector('label[id*="lblTERROR_MBR_IND"]');
    const terrorRelField = document.querySelector('label[id*="lblTERROR_REL_IND"]');
    const genocideField = document.querySelector('label[id*="lblGENOCIDE_IND"]');
    const violenceField = document.querySelector('label[id*="lblVIOLENCE_IND"]');
    const childSoldierField = document.querySelector('label[id*="lblCHILD_SOLDIER_IND"]');
    const abortionField = document.querySelector('label[id*="lblABORTION_IND"]');
    const transplantField = document.querySelector('label[id*="lblTRANSPLANT_IND"]');
    const exViolenceField = document.querySelector('label[id*="lblEX_VIOLENCE_IND"]');
    const religiousFreedomField = document.querySelector('label[id*="lblRELIGIOUS_FREEDOM_IND"]');
    
    let page16NeedsReinject = false;
    
    [pageNoteField, illegalActivityField, terrorField, terrorSuppField, terrorMbrField, 
     terrorRelField, genocideField, violenceField, childSoldierField, abortionField, transplantField, 
     exViolenceField, religiousFreedomField].forEach(element => {
      if (element && !element.querySelector('.ds160-translation')) {
        page16NeedsReinject = true;
      }
    });
    
    if (page16NeedsReinject) {
      console.log('DS-160 Full Translation: Page 16 specific check - missing translations detected, re-injecting...');
      injectAllTranslations();
    }
  }
}, 2500);

// 专门针对page17的检查机制
setInterval(() => {
  const pageType = detectPageType();
  if (pageType === 'page17') {
    // 检查page17特有的字段
    const pageNoteField = document.querySelector('span[id*="lblPageNote1"]');
    const immigrationFraudField = document.querySelector('label[id*="lblIMMGRATN_FRAUD_IND"]');
    const deportField = document.querySelector('label[id*="lblDeport_IND"]');
    
    let page17NeedsReinject = false;
    
    [pageNoteField, immigrationFraudField, deportField].forEach(element => {
      if (element && !element.querySelector('.ds160-translation')) {
        page17NeedsReinject = true;
      }
    });
    
    if (page17NeedsReinject) {
      console.log('DS-160 Full Translation: Page 17 specific check - missing translations detected, re-injecting...');
      injectAllTranslations();
    }
  }
}, 2600);

// 专门针对page18的检查机制
setInterval(() => {
  const pageType = detectPageType();
  if (pageType === 'page18') {
    // 检查page18特有的字段
    const pageNoteField = document.querySelector('span[id*="lblPageNote1"]');
    const custodyField = document.querySelector('label[id*="lblCUSTODY_IND"]');
    const votingField = document.querySelector('label[id*="lblVOTE_VIOLATE_IND"]');
    const renounceField = document.querySelector('label[id*="lblRENOUNCE_IND"]');
    
    let page18NeedsReinject = false;
    
    [pageNoteField, custodyField, votingField, renounceField].forEach(element => {
      if (element && !element.querySelector('.ds160-translation')) {
        page18NeedsReinject = true;
      }
    });
    
    if (page18NeedsReinject) {
      console.log('DS-160 Full Translation: Page 18 specific check - missing translations detected, re-injecting...');
      injectAllTranslations();
    }
  }
}, 2700);

console.log('DS-160 Full Translation: Multi-page dynamic script loaded successfully!');