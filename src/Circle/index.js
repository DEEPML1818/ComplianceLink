const fetch = require('node-fetch');
const { v4: uuidv4 } = require('uuid');

const url = 'https://api.circle.com/v1/w3s/compliance/screening/addresses';
const apiKey = 'TEST_API_KEY:74ffbed384b58a1bfc3e253b3eb05720:b31bbd03b3cd8c153cc926d4a148cc7f'; // Replace this with your actual API key

// List of addresses to scan (testnet addresses for testing)
const addresses = [
  '0x0d043128146654C7683Fbf30ac98D7B2285DeD00',
  '0xAnotherAddressHere',
  '0xYetAnotherAddress'
];

// Suspect list for flagging suspicious addresses
const suspectList = [
  '0xSuspiciousAddress1',
  '0xSuspiciousAddress2',
  // Add more addresses or criteria as needed
];

// Function to scan an individual address
async function scanAddress(address, chain = 'AVAX-FUJI') {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      address,
      chain,
      idempotencyKey: uuidv4() // Unique idempotency key for each request
    })
  };

  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`HTTP error! status: ${res.status} - ${errorText}`);
    }
    const json = await res.json();

    // Check if address is in the suspect list and log accordingly
    if (suspectList.includes(address)) {
      console.warn(`Warning: ${address} is in the suspect list.`);
    }

    console.log(`Result for ${address}:`, json);
  } catch (err) {
    console.error(`Error scanning address ${address}:`, err);
  }
}

// Loop through all addresses and scan each one
async function scanAllAddresses() {
  for (const address of addresses) {
    await scanAddress(address);
  }
}

// Run the scanning process
scanAllAddresses();
