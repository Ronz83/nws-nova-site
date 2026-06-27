process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

async function testFetch() {
  const url = process.env.VITE_SUPABASE_URL + '/auth/v1/health';
  try {
    const res = await fetch(url);
    const text = await res.text();
    console.log(`Status: ${res.status}`);
    console.log(`Body starts with: ${text.substring(0, 50)}`);
  } catch (err) {
    console.error(err);
  }
}

testFetch();
