const { Web3 } = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
const abi = require("../../../web3/build/contracts/Faucet.json").abi;
const tokenABI = require('../../../web3/build/contracts/MyToken.json').abi;
const contractAddress = process.env.FAUCET_CONTRACT_ADDRESS;
const contract = new web3.eth.Contract(abi, contractAddress);
const tokenContract = new web3.eth.Contract(tokenABI, process.env.TOKEN_CONTRACT_ADDRESS)
async function checkTokenBalance() {
  try {
      const balance = await tokenContract.methods.balanceOf(contractAddress).call();
      console.log('Token balance of the faucet contract:', balance);
  } catch (error) {
      console.error('Error checking token balance:', error);
  }
}

const sendTokens = async (req, res) => {
  try {
    const { account } = req.body;
    checkTokenBalance();
    // console.log(contractAddress);
    // console.log(typeof(contract.methods))
    // console.log(contract.methods)
    // console.log(typeof(contract.methods.lastAccessTime));
    const lastDripTime = await contract.methods.getLastAccessTime(account).call();
    const currentTime = Math.floor(Date.now() / 100);
    const dripInterval = await contract.methods.dripInterval().call();
    if (
      lastDripTime === 0 ||
      (currentTime >= lastDripTime) + parseInt(dripInterval)
    ) {
      console.log("Requesting drip...");

      const tx = await contract.methods.drip().send({
        from: account,
      });

      console.log("Drip transaction hash :", tx.transactionHash);
    } else {
      console.log("Drip not available yet. Please wait...");
      res
        .status(403)
        .json({
          success: false,
          message: "Drip not available yet. Please wait...",
        });
    }
  } catch (error) {
    console.error("Error Driping Token:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = sendTokens;
