import fs from 'fs';
import https from 'https';

async function testGHL() {
  const tokenData = JSON.parse(fs.readFileSync('ghl_token.json', 'utf8'));
  const companyId = tokenData.companyId;
  const token = tokenData.access_token;

  const url = `https://services.leadconnectorhq.com/locations/search?companyId=${companyId}`;
  
  const options = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Version': '2021-07-28',
      'Accept': 'application/json'
    }
  };

  const req = https.request(url, options, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      console.log('Status:', res.statusCode);
      try {
        const json = JSON.parse(data);
        console.log('Found locations:', json.locations?.length);
        if (json.locations?.length > 0) {
          console.log('First Location ID:', json.locations[0].id);
          console.log('First Location Name:', json.locations[0].name);
        }
      } catch(e) {
        console.log('Raw response:', data.substring(0, 200));
      }
    });
  });

  req.on('error', e => console.error(e));
  req.end();
}

testGHL();
