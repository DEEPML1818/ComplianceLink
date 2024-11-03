const fetch = require('node-fetch');
const { v4: uuidv4 } = require('uuid');

const url = 'https://api.circle.com/v1/w3s/compliance/screening/addresses';
const apiKey = 'TEST_API_KEY:74ffbed384b58a1bfc3e253b3eb05720:b31bbd03b3cd8c153cc926d4a148cc7f'; // Replace this with your actual API key

const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
  },
  body: JSON.stringify({ 
    address: '0x0d043128146654C7683Fbf30ac98D7B2285DeD00', 
    chain: 'AVAX-FUJI',
    idempotencyKey: uuidv4() // Generate a unique idempotency key
  })
};

fetch(url, options)
  .then(res => {
    if (!res.ok) {
      return res.text().then(text => {
        throw new Error(`HTTP error! status: ${res.status} - ${text}`);
      });
    }
    return res.json();
  })
  .then(json => console.log(json))
  .catch(err => console.error('error:', err));
