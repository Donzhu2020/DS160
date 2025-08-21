import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const translationFile = path.join(__dirname, '../assets/data/pages/translation-page13.json');

try {
    // Read existing translation data
    const data = JSON.parse(fs.readFileSync(translationFile, 'utf8'));
    
    console.log('Current translation count:', data.fields.length);
    
    // Define new fields for page13 missing translations
    const newFields = [
        {
            "key": "branch_of_service",
            "selectors": ["text:Branch of Service"],
            "en": "Branch of Service",
            "zh": {
                "brief": "服役部门",
                "detailed": "服役部门"
            },
            "note": {
                "brief": "",
                "detailed": ""
            }
        },
        {
            "key": "rank_position",
            "selectors": ["text:Rank/Position"],
            "en": "Rank/Position",
            "zh": {
                "brief": "军衔/职位",
                "detailed": "军衔/职位"
            },
            "note": {
                "brief": "",
                "detailed": ""
            }
        },
        {
            "key": "military_specialty",
            "selectors": ["text:Military Specialty"],
            "en": "Military Specialty",
            "zh": {
                "brief": "军事专业",
                "detailed": "军事专业"
            },
            "note": {
                "brief": "",
                "detailed": ""
            }
        },
        {
            "key": "date_of_service_from",
            "selectors": ["text:Date of Service From"],
            "en": "Date of Service From",
            "zh": {
                "brief": "服役开始日期",
                "detailed": "服役开始日期"
            },
            "note": {
                "brief": "",
                "detailed": ""
            }
        },
        {
            "key": "date_of_service_to",
            "selectors": ["text:Date of Service To"],
            "en": "Date of Service To",
            "zh": {
                "brief": "服役结束日期",
                "detailed": "服役结束日期"
            },
            "note": {
                "brief": "",
                "detailed": ""
            }
        },
        {
            "key": "paramilitary_involvement",
            "selectors": ["text:Have you ever served in, been a member of, or been involved with a paramilitary unit, vigilante unit, rebel group, guerrilla group, or insurgent organization?"],
            "en": "Have you ever served in, been a member of, or been involved with a paramilitary unit, vigilante unit, rebel group, guerrilla group, or insurgent organization?",
            "zh": {
                "brief": "您是否曾在准军事部队、治安队、反叛组织、游击队或叛乱组织中服役、成为成员或参与其中？",
                "detailed": "您是否曾在准军事部队、治安队、反叛组织、游击队或叛乱组织中服役、成为成员或参与其中？"
            },
            "note": {
                "brief": "",
                "detailed": ""
            }
        },
        {
            "key": "explain_military",
            "selectors": ["text:Explain"],
            "en": "Explain",
            "zh": {
                "brief": "请解释",
                "detailed": "请解释"
            },
            "note": {
                "brief": "",
                "detailed": ""
            }
        }
    ];
    
    // Add new fields
    data.fields.push(...newFields);
    
    console.log('New translation count:', data.fields.length);
    console.log('Added fields:', newFields.map(f => f.en));
    
    // Write back to file
    fs.writeFileSync(translationFile, JSON.stringify(data, null, 2), 'utf8');
    console.log('Successfully updated translation-page13.json');
    
} catch (error) {
    console.error('Error updating translation file:', error);
}
