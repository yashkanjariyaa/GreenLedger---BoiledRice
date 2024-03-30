const { Web3 } = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
const abi = require("../../../web3/build/contracts/Faucet.json").abi;
const contractAddress = process.env.FAUCET_CONTRACT_ADDRESS;
const contract = new web3.eth.Contract(abi, contractAddress);

const sendTokens = async (req, res) => {
  try {
    const { account } = req.body;
    const lastDripTime = await contract.methods.lastAccessTime(account).call();
    const currentTime = Math.floor(Date.now() / 100);

    if (
      lastDripTime === 0 ||
      currentTime >= lastDripTime + contract.dripInterval()
    ) {
      console.log("Requesting drip...");

      const tx = await contract.methods.drip().send({
        from: account,
      });

      console.log("Drip transaction hash :", tx.transactionHash);
    } else {
      console.log("Drip not available yet. Please wait...");
    }
  } catch (error) {
    console.error("Error Driping Token:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = sendTokens;
