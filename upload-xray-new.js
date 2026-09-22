require('dotenv').config();
const fs = require('fs');
const axios = require('axios');

const JIRA_URL = process.env.JIRA_URL;
const EMAIL = process.env.JIRA_EMAIL;
const TOKEN = process.env.JIRA_API_TOKEN;
const PROJECT_KEY = process.env.JIRA_PROJECT_KEY || 'SCRUM';

async function upload() {
  const xmlPath = 'test-results/junit.xml';
  if (!fs.existsSync(xmlPath)) {
    console.log('junit.xml nahi mili, pehle npx playwright test --reporter=junit chalao');
    return;
  }
  const xml = fs.readFileSync(xmlPath, 'utf8');
  const auth = Buffer.from(`${EMAIL}:${TOKEN}`).toString('base64');

  console.log('Backup: Direct Jira Test Execution bana rahi hun...');
  try {
    const res = await axios.post(`${JIRA_URL}/rest/api/3/issue`, {
      fields: {
        project: { key: PROJECT_KEY },
        summary: `Playwright Execution - ${new Date().toLocaleDateString()}`,
        issuetype: { name: 'Test Execution' },
        description: {
          type: "doc",
          version: 1,
          content: [
            {
              type: "paragraph",
              content: [{ type: "text", text: `Playwright Tests Run - ${new Date().toString()}` }]
            },
            {
              type: "codeBlock",
              attrs: { language: "xml" },
              content: [{ type: "text", text: xml.slice(0, 2000) }]
            }
          ]
        }
      }
    }, {
      headers: { 'Authorization': `Basic ${auth}`, 'Content-Type': 'application/json' }
    });
    console.log('SUCCESS! Ban gaya:', res.data.key);
    console.log(`Link: ${JIRA_URL}/browse/${res.data.key}`);
  } catch (e) {
    console.log('Final ERROR:', JSON.stringify(e.response?.data, null, 2) || e.message);
  }
}
upload();