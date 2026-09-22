require('dotenv').config();
const fs = require('fs');
async function upload() {
  const id = process.env.XRAY_CLIENT_ID;
  const secret = process.env.XRAY_CLIENT_SECRET;
  const auth = await fetch('https://xray.cloud.getxray.app/api/v2/authenticate', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({client_id: id, client_secret: secret})
  });
  const token = (await auth.text()).replace(/"/g,'');
  console.log('Token OK');
  const xml = fs.readFileSync('test-results/junit.xml','utf8');
  const res = await fetch('https://xray.cloud.getxray.app/api/v2/import/execution/junit?projectKey=SCRUM', {
    method: 'POST',
    headers: {'Content-Type':'text/xml','Authorization':`Bearer ${token}`},
    body: xml
  });
  console.log(await res.text());
  console.log('DONE');
}
upload();