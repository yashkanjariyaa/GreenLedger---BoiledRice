const Web3 = require("web3");
const web3 = new Web3("http://127.0.0.1:7545");
const abi = require("../../../web3/build/contracts/UserDataContract.json");
const contractAddress = process.env.USER_DATA_CONTRACT;
const contract = new web3.eth.Contract(abi, contractAddress);

async function recoverAccount(message, signature) {
  const recoveredPublicKey = await web3.eth.accounts.recover(
    message,
    signature
  );
  const recoveredAccount =
    web3.eth.accounts.publicKeyToAccount(recoveredPublicKey);
  return recoveredAccount.address;
}

async function getCurrentUserData(tokenId) {
  return await contract.methods.getUserData(tokenId).call();
}

const userUpdateController = async (req, res) => {
  try {
    const { adminUsername, username, totalDays, dailyPlan, signature, tokenId } =
      req.body;
      const currentData = getCurrentUserData(tokenId);
    if (
      currentData.adminUsername === adminUsername &&
      currentData.totalDays === totalDays &&
      currentData.dailyPlan === dailyPlan
    ) {
      // If data is the same, no need to update
      return res
        .status(200)
        .json({ success: true, message: "User data is already up to date." });
    }

    let encodedABI;
    if(currentData.adminUsername != adminUsername){
        encodedABI = contract.methods.updateAdminUsername(tokenId, adminUsername).encodeABI();
    }
    if(currentData.dailyPlan != dailyPlan){
        encodedABI = contract.methods.updateDailyPlan(tokenId, dailyPlan).encodeABI();
    }
    if(currentData.username != username){
        encodedABI = contract.methods.updateUsername(tokenId, username).encodeABI();
    }
    if(currentData.totalDays != totalDays){
        totalDays = contract.methods.updateTotalDays(tokenId, totalDays).encodeABI();
    }

    const message = web3.utils.soliditySha3(
      adminUsername,
      username,
      totalDays,
      dailyPlan
    );
    const account = await recoverAccount(message, signature);

    // const encodedABI = contract.methods
    //   .registerUser(adminUsername, username, totalDays, dailyPlan)
    //   .encodeABI();

    const tx = {
      from: account,
      to: contractAddress,
      gas: 500000, // Adjust gas limit accordingly
      data: encodedABI,
    };

    const receipt = await web3.eth.sendTransaction(tx);
    console.log("Transaction receipt:", receipt);
    res.status(200).json({ success: true, receipt });
  } catch (error) {
    console.error("Error updating user data:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = userUpdateController;
