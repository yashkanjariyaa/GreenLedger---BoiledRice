const Faucet = artifacts.require("../build/contracts/Faucet");
const UserDataContract = artifacts.require(
  "../build/contracts/UserDataContract"
);
const MyToken = artifacts.require("../build/contracts/MyToken");

module.exports = function (deployer) {
  // Deploy the MyToken contract first
  deployer
    .deploy(MyToken, 1000) // Change 1000000 to desired initial token supply
    .then(() => {
      // Deploy the UserDataContract
      return deployer.deploy(UserDataContract);
    })
    .then(() => {
      // Deploy the Faucet contract, passing the address of the MyToken contract
      return deployer.deploy(Faucet, MyToken.address, 1, 86400); // Change 1000 and 86400 to desired drip amount and interval
    });
};
