const Faucet = artifacts.require("../build/contracts/Faucet");
const UserDataContract = artifacts.require(
  "../build/contracts/UserDataContract"
);
// const MyToken = artifacts.require("../build/contracts/MyToken");

module.exports = function (deployer) {
  // Deploy the MyToken contract first
  return deployer.deploy(UserDataContract);
  // deployer
  //   .deploy(MyToken, 100000) // Change 1000000 to desired initial token supply
  //   .then((instance) => {
  //     myTokenInstance = instance;
  //     // Deploy the UserDataContract
      
  //   })
  //   .then(()=>{
  //     if(!myTokenInstance){
  //       throw new Error("MyToken instance is not available")
  //     }
  //   })
  //   .then(() => {
  //     return myTokenInstance.transfer(Faucet.address, 100000);
  //   })
  //   .then(() => {
  //     // Deploy the Faucet contract, passing the address of the MyToken contract
  //     return deployer.deploy(Faucet, MyToken.address, 1, 86400); // Change 1000 and 86400 to desired drip amount and interval
  //   });
};
