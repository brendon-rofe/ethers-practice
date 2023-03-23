const { ethers } = require("ethers");

// Set up your provider and contract instance
const provider = new ethers.providers.JsonRpcProvider(
  `https://goerli.infura.io/v3/e10199aab40c4d00a5583a7003b1cc61`
);
const contractAddress = "0x98927Dc9f8e7c759CFc90E21f42BcDB88c5ed16B"; // USDC contract address on Polygon
const contractAbi = ["function transfer(address to, uint256 amount) returns (bool)"];
const contract = new ethers.Contract(contractAddress, contractAbi, provider);

// Set up your transaction parameters
const fromAddress = "0x123456...";
const toAddress = "0xd140a68aBe78548C8b4CB79b6ceC226e72E3c764";
const amount = ethers.utils.parseUnits("100", 6); // Transfer 100 USDC (6 decimal places)

const getGasLimit = async () => {
  // Estimate the gas cost for the transfer
  const gasLimit = await contract.estimateGas.transfer(toAddress, amount);
  console.log("Gas limit:", gasLimit);
}

getGasLimit();
