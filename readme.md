# ComplianceLink - A Decentralized Compliance Engine (DCE)

A powerful, cross-chain compliance solution for decentralized finance (DeFi) applications. The Decentralized Compliance Engine (DCE) leverages the Circle Compliance API, Wormhole protocol, and smart contracts to provide seamless, automated compliance across multiple blockchains.

## Table of Contents
- [Introduction](#introduction)
- [Prototype](prototype#)
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

The Decentralized Compliance Engine (DCE) is designed to address regulatory and compliance needs within DeFi. It provides a fully decentralized, cross-chain KYC/AML compliance framework that is secure, efficient, and scalable. By integrating with the Circle Compliance API, Wormhole protocol, and deploying smart contracts on multiple blockchains (Ethereum, Solana, and etc), DCE ensures cross-border regulatory compliance, enabling DeFi applications to meet global standards while remaining decentralized.

## Prototype - Current Development (Live for Testing)

The **ComplianceLink Prototype** is a preliminary version of our Decentralized Compliance Engine (DCE), allowing developers and stakeholders to explore the core functionalities, user interactions, and backend architecture that drive our solution. The prototype demonstrates key features, including user KYC submission, compliance checks, and cross-chain status updates. 

### Deployed Contracts on Testnet/Devnet

1. **Solana Token Contract**  
   - For using token string function to save compliance data
   - Contract Address : 

### Video Demo and Site Link

For a walkthrough of ComplianceLink in action, check out our [Demo Video](https://youtu.be/Re01oAZEXiY) showcasing user interactions, compliance checks, and cross-chain synchronization. 

To experience ComplianceLink yourself, visit our [Live Prototype Site](https://compliancelink.onrender.com/), where you can submit KYC information, view compliance statuses, and explore cross-chain transactions.

### Visual Guide

Below are some images to help guide you through using ComplianceLink:

![User Interface](#) 
![Compliance Status](#)  
![Cross-Chain Transactions](#)
![View Data on Blockchain](https://github.com/DEEPML1818/ComplianceLink/blob/main/CL-ss-1.jpeg)

These visuals offer a glimpse into the user experience, with intuitive interfaces for compliance management and cross-chain operations.

### Features Demonstrated

1. **KYC and AML Verification Flow**  
   Users can submit KYC information through the frontend, which triggers the compliance validation process with Circle’s Compliance API, showcasing automated user verification.

2. **On-Chain Compliance Status Recording**  
   Compliance statuses are recorded on the Identity Verification Contract, simulating the smart contract enforcement that restricts access based on compliance status.

3. **Cross-Chain Status Synchronization**  
   Utilizing Wormhole’s interoperability layer, compliance statuses are synchronized across multiple blockchain networks, simulating cross-chain compliance.

### Accessing the Prototype

- **Frontend:** A web-based frontend built using [React] provides a user interface for submitting KYC data, viewing compliance status, and simulating cross-chain transactions.
- **Backend:** The backend API, built with Node, handles data submission, compliance checks, and interactions with smart contracts deployed on test networks.
- **Smart Contracts:** Test contracts are deployed on Ethereum and Solana testnets, facilitating user status updates and enforcement.

### How to Run the Prototype

To explore the ComplianceLink prototype:

1. **Clone the Repository:** Clone the project repository and install dependencies.
   ```bash
   git clone https://github.com/DEEPML1818/ComplianceLink.git
   cd ComplianceLink
3. **Set Environment Variables:** Add Circle API, Wormhole SDK, and other required keys in a `.env` file.
   ```bash
   CIRCLE_API_KEY=<Your_Circle_API_Key>
4. **Start the Backend Server:** Will start automatically when run `npm start` to launch the frontend server.
5. **Launch the Frontend:** Use `npm start` in the frontend directory to start the interface.
   ```bash
   npm start
6. **Deploy Smart Contracts (Optional):** Use [Hardhat/Truffle] to deploy smart contracts on test networks.

**Note:** The prototype is for demonstration purposes only and may not contain all features or security layers of the full implementation.

## MVP Development (Next Phase - OnGoing development)

The **MVP Development** phase will build upon the ComplianceLink prototype by integrating advanced features and expanding cross-chain compatibility. This phase will focus on refining compliance processes, enhancing backend stability, and ensuring that the KYC/AML verification and cross-chain enforcement mechanisms operate seamlessly in a live environment. Key objectives include implementing real-time compliance monitoring, expanding support for additional blockchain networks, and developing a robust user interface for broader accessibility. This stage is critical to transforming ComplianceLink into a fully operational, decentralized compliance solution capable of supporting the evolving needs of DeFi ecosystems.

**Following after this, is our projected plan for ComplianceLink further developments**

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
  - **Solana**: Rust for smart contracts
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
   git clone https://github.com/DEEPML1818/ComplianceLink.git
   cd ComplianceLink

2. **Install Dependencies**
   ```bash
   nvm install 16.20.0 && nvm use 16.20.0
   npm ci or npm i 

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
Smart contracts can be deployed on Ethereum and Solana using Solidity and Rust, respectively.

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
For questions or partnership inquiries, please contact us at: navinder.tech@gmail.com
