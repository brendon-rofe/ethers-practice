const ethers = require("ethers");

const contractAddress = "0x59200ca2bb109A97EB3c2Ca932c3Fa0152731FAf"; // Replace with the actual contract address
const contractABI = [
  // Replace with the actual contract ABI
  "function balanceOf(address account) view returns (uint256)",
  "function transfer(address recipient, uint256 amount) returns (bool)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function transferFrom(address sender, address recipient, uint256 amount) returns (bool)"
];

const provider = new ethers.providers.JsonRpcProvider(
  `https://goerli.infura.io/v3/e10199aab40c4d00a5583a7003b1cc61`
);
const privateKey = "";
const signer = provider.getSigner();

const contract = new ethers.Contract(contractAddress, contractABI, signer);

const spenderAddress = "0xd140a68aBe78548C8b4CB79b6ceC226e72E3c764"; // Replace with the address you want to send the tokens to
const fromAddress = "0x94Cd4C8b08bEc0B960C613d1af83311F467F1b1A"; // Replace with the address you want to send the tokens from
const amount = ethers.utils.parseUnits("100", 0); // Replace with the amount of tokens you want to send (in wei)

const sendERC20 = async () => {
  // Approve transfer
  const contractWithSigner = contract.connect(signer);
  const approvalTx = await contractWithSigner.approve(spenderAddress, amount);
  await approvalTx.wait();

  // Transfer tokens
  const transferTx = await contractWithSigner.transferFrom(fromAddress, spenderAddress, amount);
  const tx = await transferTx.wait();
  console.log(tx);
};

sendERC20();