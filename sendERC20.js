const ethers = require("ethers");

const contractAddress = "0x59200ca2bb109A97EB3c2Ca932c3Fa0152731FAf";
const contractABI = [
  "function balanceOf(address account) view returns (uint256)",
  "function transfer(address recipient, uint256 amount) returns (bool)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function transferFrom(address sender, address recipient, uint256 amount) returns (bool)"
];

const provider = new ethers.providers.InfuraProvider('goerli', 'e10199aab40c4d00a5583a7003b1cc61')
const privateKey = "";
const wallet = new ethers.Wallet(privateKey, provider);

const contract = new ethers.Contract(contractAddress, contractABI, wallet);

const spenderAddress = "0xd140a68aBe78548C8b4CB79b6ceC226e72E3c764";
const fromAddress = "0x94Cd4C8b08bEc0B960C613d1af83311F467F1b1A";
const amount = ethers.utils.parseUnits("100", 0);

const sendERC20 = async () => {
  const approvalTx = await contract.approve(spenderAddress, amount);
  await approvalTx.wait();

  // Transfer tokens
  const transferTx = await contract.transferFrom(fromAddress, spenderAddress, amount);
  const tx = await transferTx.wait();
  console.log(tx);
};

sendERC20();