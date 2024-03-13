# NFT Ticketing

## Project Background
The world of event ticketing is undergoing a transformative shift with the emergence of Non-Fungible Tokens (NFTs). NFTs are unique digital assets that represent ownership of a specific item or piece of content on the blockchain. Integrating NFTs into the ticketing industry offers a range of benefits, from enhanced security to improved fan engagement and new revenue streams. In this write-up, we explore how NFT ticketing solutions are revolutionising the way events are managed and experienced.

NFTix is a dynamic team driven by a shared passion for innovation and a mission to revolutionise the event industry through the power of Non-Fungible Tokens (NFTs). With a deep understanding of the challenges faced by event organisers and attendees alike, we are dedicated to transforming event ticketing into a seamless, secure, and engaging experience.

## Owner
- Lim Kim Hoe

## Contract Addresses
Premium Gold Tickets:
1. 1st Row - 0xE27f14f769b44d1E0289f2433443eDca8B536BD1
2. 2nd Row - 0x9a8F3fad8a63Dd83031895109Eb8eC55dcDC8298
3. 3rd Row - 0x5824e92c3bc9498518E4E54720F8cE3ad0F99486

Standard Tickets:
4. Section 1 - 0xD0c51D73B8287Cb57cD7E04Ee4c0c85759450a02
5. Section 2 - 0x1207ecf691755aee4B67b091cd1b8cCcc5b84644
6. Section 3 - 0xf67EBE71Dcd55295FCfbC2f0F337786DFa2a1e0D
7. Section 4 - 0xC6BD5471E9C3b9F7f9d51E14b3D883C776c53247
8. Section 5 - 0x468cAADF90c156b1e15d535A3056ec57847498A6

## Opensea Testnet Collections
To view the respective collections with the following URL:
Premium Gold Tickets:
- https://testnets.opensea.io/collection/rock-music-singapore-2023
- https://testnets.opensea.io/collection/rock-music-singapore-2023-1
- https://testnets.opensea.io/collection/rock-music-singapore-2023-2

Standard Tickets:
- https://testnets.opensea.io/collection/rock-music-singapore-2023-3
- https://testnets.opensea.io/collection/rock-music-singapore-2023-4
- https://testnets.opensea.io/collection/rock-music-singapore-2023-5
- https://testnets.opensea.io/collection/rock-music-singapore-2023-6
- https://testnets.opensea.io/collection/rock-music-singapore-2023-7

## Listing NFT to Opensea
The following steps show how to list NFT with Smart Contract:
1.	Distribute Unique File to IPFS P2P network via Pinata IPFS.
2.	Create Rest API to return JSON Metadata for TokenURI (File) and ContractLevelURI (Collection).
3.	Deploy ERC721 Smart Contract with Rest API URL to Georli Testnet.
    - Update the contracts/Creature.sol with the 2 REST API URL
    - Migrate Smart Contract by using Truffle Suite via Infura.
4.	View NFT at OpenSea Testnet with NFT Contract Address.
    - OpenSea retrieves REST API from the NFT Contract Address.
    - OpenSea request Metadata in JSON from REST API.
    - OpenSea embeds Metadata information into the webpage, such as Name, Description, Image URL, Attributes.
5.	Mint NFT with the following steps:
    - Configure the information in ".env" file
    - Indicate the number of nft of each contract/ collection for **NUM_CREATURES** in **scripts/mint.js** 
    - Run `node scripts/mint.js` from root directory


## Deployed to Live Site
**Render.com** is a cloud platform that simplifies the deployment and scaling of applications. It provides a serverless infrastructure for running web services and applications, allowing developers to focus on writing code rather than managing servers.

The DApp has been deployed to the following URL:
1. NFT Wallet - Metamask Connect - https://nftix.onrender.com
2. NFT Verifier/Scanner - Scan Ticket Verification QR Code - https://nftix.onrender.com/scanner 

## User Guides
Below are the steps to use NFTix Dapp:

1. Download Metamask to Mobile Phone. 
2. Sign-Up and Sign-In to Metamask.
3. Get ether from Goerli PoW faucets [https://goerli-faucet.pk910.de].
4. Send me your wallet address, I will transfer you the ticket via OpenSea Testnet.
5. Access the NFTix Wallet in Metamask Mobile Browser:
   - https://nftix.onrender.com/
6. Once loaded, it will auto connect to the Metamask Account.
7. Select the ticket type, loading icon will be shown and it will search for the ticket that you owned.
8. Your owned NFT Ticket will be shown, tap on it to see pop-up Ticket Verification QR Code.
9. Take a Sceenshot from your mobile phone.
10. Access the NFTix Verification Scanner in Metamask Mobile Browser new tab:
    - https://nftix.onrender.com/scanner
11. To verify QR Code, follow one of the option below:
    i) Give permission to access camera once scanner page is loaded, then scanner the QR Code in camera view.
    ii) Tap on upload image and browse the QR Code screenshot.
12. Verification result will be shown either PASSED or FAILED.

## Setup or Installation
1. Git Clone the the project
2. `npm install` to install all the dependencies
3. `npm start` to run the project at localhost, the project will be launched in port 4001
   - http://localhost:4001 
   
(Note: Change of the port number in server.js if the port is already inused)


## Support
Kindly contact Kim Hoe at dnezcom@gmail.com if you have any inquiries.

## Project Write-Up
Project details (PDF file) can be downloaded here:
https://drive.google.com/file/d/1StEIOwO9P-ZS_WnjewHz46vkqkZKOCAL/view?usp=sharing 


