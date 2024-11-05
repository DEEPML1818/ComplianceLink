const { ethers } = require("ethers");
const {
    getEmitterAddressSolana,
    sendMessage,
    getSigningRouterAddress,
    // Import other necessary functions if needed
} = require("@certusone/wormhole-sdk");
const config = require("./config");

// Setup provider for Solana
const solanaProvider = new ethers.providers.JsonRpcProvider(config.solana.rpcUrl);

// Correctly format the private key for Solana
const solanaPrivateKey = "44caej1QeFLNtwvnFFBnaGFTbnK5VB92nCUuz4YtvBqqfUaoBwiewBLqALbfYZqaKWvop7xs4ELTWB2kiRgZHNCV"; // Replace with your actual Solana private key
const solanaWallet = ethers.Wallet.fromMnemonic(solanaPrivateKey); // Change to Wallet.fromMnemonic or a suitable method if needed

// Setup provider for Ethereum
const ethProvider = new ethers.providers.JsonRpcProvider(config.ethereum.rpcUrl);
const ethPrivateKey = "c5a640429beb585a609e26cfa2f41e7091447ecb4e0a961c36e3d7a643ab1815"; // Replace with your actual Ethereum private key
const ethWallet = new ethers.Wallet(ethPrivateKey, ethProvider);

// Replace with your actual ComplianceRegistry and Wormhole contract addresses
const ComplianceRegistryAddress = "YOUR_COMPLIANCE_REGISTRY_ADDRESS"; 
const WormholeAddress = "YOUR_WORMHOLE_CONTRACT_ADDRESS"; 

// Function to register compliance data
async function registerComplianceData(dataHash) {
    const tx = await solanaProvider.sendTransaction(
        {
            to: ComplianceRegistryAddress,
            value: ethers.utils.parseEther("0.001"), // Set appropriate value
            data: ethers.utils.defaultAbiCoder.encode(["string"], [dataHash]),
        },
        [solanaWallet]
    );
    await tx.wait();
    console.log("Registered compliance data:", dataHash);
}

// Function to dispatch message to Ethereum
async function dispatchMessageToEthereum(dataHash) {
    const emitterAddress = getEmitterAddressSolana(solanaWallet.address);
    
    const tx = await ethWallet.sendTransaction({
        to: WormholeAddress,
        value: ethers.utils.parseEther("0.01"), // Set appropriate value
        data: ethers.utils.defaultAbiCoder.encode(["string"], [dataHash]),
    });
    await tx.wait();
    console.log("Dispatched message to Ethereum:", dataHash);
}

// Main function
async function testBridge() {
    const dataHash = "0x12345"; // Example data hash
    await registerComplianceData(dataHash);
    await dispatchMessageToEthereum(dataHash);
}

testBridge().catch(console.error);
