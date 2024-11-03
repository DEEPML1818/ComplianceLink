# ComplianceLink - A Decentralized Compliance Engine (DCE)

A powerful, cross-chain compliance solution for decentralized finance (DeFi) applications. The Decentralized Compliance Engine (DCE) leverages the Circle Compliance API, Wormhole protocol, and smart contracts to provide seamless, automated compliance across multiple blockchains.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Architecture](#architecture)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Smart Contracts](#smart-contracts)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

---

## Introduction

The Decentralized Compliance Engine (DCE) is designed to address regulatory and compliance needs within DeFi. It provides a fully decentralized, cross-chain KYC/AML compliance framework that is secure, efficient, and scalable. By integrating with the Circle Compliance API, Wormhole protocol, and deploying smart contracts on multiple blockchains (Ethereum, Solana, and Sui), DCE ensures cross-border regulatory compliance, enabling DeFi applications to meet global standards while remaining decentralized.

## Features

- **Cross-Chain Compliance**: Enforces KYC/AML compliance across multiple blockchains using Wormhole.
- **Automated KYC/AML Checks**: Integrates Circle's Compliance API for seamless onboarding and compliance updates.
- **Decentralized Enforcement**: Smart contracts enforce compliance statuses, preventing non-compliant users from initiating transactions.
- **Real-Time Compliance Status**: Periodic checks and real-time updates ensure users stay compliant.
- **Scalability**: Built to handle high transaction volumes using Redis for task management and IPFS for decentralized data storage.

## Architecture

### Overview
DCE operates on a modular architecture comprising the following main components:
1. **API Layer** - Handles calls to Circle Compliance API and Wormhole SDK.
2. **Middleware** - Processes compliance responses and executes smart contract actions.
3. **Smart Contracts** - Enforce compliance on-chain and lock/unlock funds based on compliance status.
4. **Database** - Off-chain storage for user metadata, transaction logs, and audit trails.
5. **Blockchain Interactions** - Cross-chain transactions are facilitated using Wormhole protocol.

### Workflow
1. **User Onboarding** - Users submit KYC details, which are verified through Circle’s API.
2. **Compliance Check** - Circle's API response is processed, and user status is recorded on-chain.
3. **Cross-Chain Enforcement** - Compliance statuses are propagated across chains using Wormhole, maintaining user eligibility.
4. **Real-Time Updates** - Continuous compliance monitoring via Circle’s API ensures compliance status remains current.

## Technology Stack

- **Backend**: Node.js, Express.js
- **Blockchain Interactions**:
  - **Ethereum**: Solidity for smart contracts
  - **Solana/Sui**: Rust for smart contracts
  - **Wormhole SDK** for cross-chain interactions
- **Database**: MongoDB/PostgreSQL for off-chain storage, Redis for message queuing
- **Storage**: IPFS for decentralized KYC document storage
- **Frontend**: Web3.js/Ethers.js for wallet integration (future)

## Installation

### Prerequisites
- Node.js v14 or higher
- MongoDB or PostgreSQL
- IPFS for decentralized storage
- Redis for message queuing
- Access to Circle’s Compliance API and Wormhole SDK

### Steps
1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/dce
   cd dce

2. **Install Dependencies**
   ```bash
   npm install

3. **Set Up Environment Variables**
   - Create a .env file in the root directory with the following keys :
   ```bash
   CIRCLE_API_KEY=<Your_Circle_API_Key>
   WORMHOLE_API_KEY=<Your_Wormhole_API_Key>
   DB_URI=<Your_Database_URI>
   REDIS_URL=<Your_Redis_URL>

4. **Initialize Database**
   - Run migrations if needed for your database configuration.

5. **Start the Server**
   ```bash
   npm start

6. **Run IPFS Node**
   - Follow IPFS documentation to set up a local or remote IPFS node.
  

## Usage
### Compliance Checks
1. **User KYC Submission**: Users submit their KYC information via a frontend application that interacts with the DCE API.
2. **Compliance API Interaction**: The DCE backend sends KYC data to Circle’s Compliance API for validation.
3. **Status Recording**: Compliance statuses are stored in the on-chain Identity Verification Contract for future reference.

### Cross-Chain Enforcement
1. **Transaction Request**: Users initiate transactions, triggering compliance checks.
2. **Smart Contract Enforcement**: Smart contracts validate user compliance before allowing the transaction to proceed.
3. **Wormhole Protocol for Cross-Chain**: Compliance status is synchronized across chains to ensure regulatory adherence.

## Smart Contracts
### Identity Verification Contract
This contract records KYC statuses for each user’s wallet address. The contract locks funds for users failing to meet compliance.

### Compliance Rules Contract
Implements compliance rules and enforces them across transactions. Integrates with Wormhole to propagate compliance status across blockchains.

### Deployment
Smart contracts can be deployed on Ethereum, Solana, and Sui using Solidity and Rust, respectively.

## API Documentation
### Endpoints
| Endpoint             | Method | Description                                              |
|----------------------|--------|----------------------------------------------------------|
| /api/v1/kyc          | POST   | Submit KYC details for compliance verification           |
| /api/v1/status       | GET    | Retrieve compliance status for a user                    |
| /api/v1/cross-chain  | POST   | Initiate cross-chain transaction with compliance checks  |
| /api/v1/audit-log    | GET    | Fetch transaction and compliance audit logs              |


## Sample Request
1. **KYC Submission**
   ```bash
   POST /api/v1/kyc
    Content-Type: application/json
    
    {
      "user_id": "unique_user_id",
      "kyc_data": {
        "firstName": "John",
        "lastName": "Doe",
        "documentId": "AB123456"
      }
    }

2. **Response**
   ```bash
       {
      "status": "verified",
      "message": "KYC approved, user is compliant."
    }

## Contributing
We welcome contributions from the community! Please submit pull requests to the development branch, and adhere to our code of conduct.

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Submit a pull request with a clear description of your changes.

## License
Distributed under the MIT License. See LICENSE for more information.

## Contact
For questions or partnership inquiries, please contact us at: []
