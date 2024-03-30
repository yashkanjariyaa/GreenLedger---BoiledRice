// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("CarbonCredit", "CBC") {
        // Verify that initialSupply is not negative
        require(initialSupply >= 0, "Initial supply cannot be negative");

        _mint(msg.sender, initialSupply);
    }
}
