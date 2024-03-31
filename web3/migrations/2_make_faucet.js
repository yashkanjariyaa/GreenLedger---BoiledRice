// SPDX-License-Identifier: MIT
const CarbonCredit = artifacts.require("../build/contracts/CarbonCredit");

module.exports = function (deployer) {
  deployer.deploy(CarbonCredit);
};

