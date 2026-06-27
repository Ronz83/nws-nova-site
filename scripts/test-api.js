async function test() {
  try {
    const oppsRes = await fetch('http://127.0.0.1:3001/api/crm/opportunities');
    const opps = await oppsRes.json();
    console.log('Opportunities Response:', opps);

    const convsRes = await fetch('http://127.0.0.1:3001/api/crm/conversations');
    const convs = await convsRes.json();
    console.log('Conversations Response:', convs);
  } catch(e) {
    console.error(e);
  }
}
test();
