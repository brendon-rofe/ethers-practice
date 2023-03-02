const { ethers } = require("ethers");
const provider = new ethers.providers.JsonRpcProvider(`https://goerli.infura.io/v3/e10199aab40c4d00a5583a7003b1cc61`)

const erc20Abi = [
"event Transfer(address indexed from, address indexed to, uint256 value)",
];

const erc20Address = "0x59200ca2bb109A97EB3c2Ca932c3Fa0152731FAf";

const erc20Contract = new ethers.Contract(erc20Address, erc20Abi, provider);

const getTransferEvents = async (address) => {
    const transferFilter = erc20Contract.filters.Transfer(address, null, null);
    const transferEvents = await erc20Contract.queryFilter(transferFilter);
    transferEvents.forEach(event => {
        console.log(`From: ${event.args.from}`);
        console.log(`To: ${event.args.to}`);
        console.log(`Value: ${event.args.value.toString()}`);
        console.log(`Block number: ${event.blockNumber}`);
        console.log(`Transaction hash: ${event.transactionHash}`);
        console.log(`--------------------------------------------------`);
      });
    }
getTransferEvents('0x94Cd4C8b08bEc0B960C613d1af83311F467F1b1A');