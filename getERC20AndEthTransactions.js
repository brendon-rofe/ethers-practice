const { ethers } = require("ethers");
const rpcProvider = new ethers.providers.JsonRpcProvider(
  `https://goerli.infura.io/v3/e10199aab40c4d00a5583a7003b1cc61`
);
const etherScanProvider = new ethers.providers.EtherscanProvider("goerli");

const ethAddress1 = "0x94Cd4C8b08bEc0B960C613d1af83311F467F1b1A";
const ethAddress2 = "0xd140a68aBe78548C8b4CB79b6ceC226e72E3c764";

const erc20Abi = [
  "event Transfer(address indexed from, address indexed to, uint256 value)",
];

const erc20Address = "0x59200ca2bb109A97EB3c2Ca932c3Fa0152731FAf";

const erc20Contract = new ethers.Contract(erc20Address, erc20Abi, rpcProvider);

const getERC20TransferEvents = async (address) => {
  const transferFilter = erc20Contract.filters.Transfer(null, null, null);
  const transferEvents = await erc20Contract.queryFilter(transferFilter);
  const timestamps = [];
  for (i = 0; i < transferEvents.length; i++) {
    const timestamp = (await rpcProvider.getBlock(transferEvents[i].blockNumber)).timestamp;
    timestamps.push(new Date(timestamp * 1000));
  }
  // console.log(timestamps);
  console.log(transferEvents);
};

const getEthTransfers = (ethAddress) => {
  const ethTransfers = [];
  const ethTransferTimesStamps = [];
  etherScanProvider
    .getHistory(ethAddress)
    .then((history) => {
      history.forEach((tx) => {
        ethTransfers.push(tx);
        ethTransferTimesStamps.push(new Date(tx.timestamp * 1000));
      });
      // console.log(ethTransferTimesStamps);
      console.log(ethTransfers);
    })
    .catch((err) => {
      console.error(err);
    });
};

getERC20TransferEvents(ethAddress1);

// getEthTransfers(ethAddress1);
