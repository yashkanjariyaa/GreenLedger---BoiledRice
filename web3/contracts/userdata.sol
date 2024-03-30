// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract UserDataContract is ERC721 {
    struct UserData {
        string adminUsername;
        string username;
        uint256 totalDays;
        string dailyPlan;
        uint256[] dates;
    }

    mapping(uint256 => UserData) private userDataMap;
    uint256 private tokenIdCounter;

    constructor() ERC721("UserDataToken", "UDT") {}

    event UserRegistered(
        uint256 indexed tokenId,
        string adminUsername,
        string username
    );
    event DailyPlanUpdated(uint256 indexed tokenId, string newDailyPlan);
    event AdminUsernameUpdated(
        uint256 indexed tokenId,
        string newAdminUsername
    );
    event UsernameUpdated(uint256 indexed tokenId, string newUsername);
    event TotalDaysUpdated(uint256 indexed tokenId, uint256 newTotalDays);
    event DatesUpdated(uint256 indexed tokenId, uint256[] newDates);

    function registerUser(
        string memory _adminUsername,
        string memory _username,
        uint256 _totalDays,
        string memory _dailyPlan,
        uint256[] memory _dates
    ) external {
        require(
            bytes(_adminUsername).length > 0,
            "Admin Username cannot be empty"
        );
        require(bytes(_username).length > 0, "Username cannot be empty");

        uint256 newTokenId = tokenIdCounter;
        tokenIdCounter++;

        UserData storage userData = userDataMap[newTokenId];

        userData.adminUsername = _adminUsername;
        userData.username = _username;
        userData.totalDays = _totalDays;
        userData.dailyPlan = _dailyPlan;
        userData.dates = _dates;

        _safeMint(msg.sender, newTokenId);

        emit UserRegistered(newTokenId, _adminUsername, _username);
    }

    function updateDailyPlan(
        uint256 _tokenId,
        string memory _dailyPlan
    ) external {
        require(_exists(_tokenId), "Token ID does not exist");
        UserData storage userData = userDataMap[_tokenId];
        userData.dailyPlan = _dailyPlan;
        emit DailyPlanUpdated(_tokenId, _dailyPlan);
    }

    function updateAdminUsername(
        uint256 _tokenId,
        string memory _adminUsername
    ) external {
        require(_exists(_tokenId), "Token ID does not exist");
        UserData storage userData = userDataMap[_tokenId];
        userData.adminUsername = _adminUsername;
        emit AdminUsernameUpdated(_tokenId, _adminUsername);
    }

    function updateUsername(
        uint256 _tokenId,
        string memory _username
    ) external {
        require(_exists(_tokenId), "Token ID does not exist");
        UserData storage userData = userDataMap[_tokenId];
        userData.username = _username;
        emit UsernameUpdated(_tokenId, _username);
    }

    function updateTotalDays(uint256 _tokenId, uint256 _totalDays) external {
        require(_exists(_tokenId), "Token ID does not exist");
        UserData storage userData = userDataMap[_tokenId];
        userData.totalDays = _totalDays;
        emit TotalDaysUpdated(_tokenId, _totalDays);
    }

    function updateDates(uint256 _tokenId, uint256[] memory _dates) external {
        require(_exists(_tokenId), "Token ID does not exist");
        UserData storage userData = userDataMap[_tokenId];
        userData.dates = _dates;
        emit DatesUpdated(_tokenId, _dates);
    }

    function getUserData(
        uint256 _tokenId
    )
        external
        view
        returns (
            string memory adminUsername,
            string memory username,
            uint256 totalDays,
            string memory dailyPlan,
            uint256[] memory dates
        )
    {
        UserData storage userData = userDataMap[_tokenId];
        return (
            userData.adminUsername,
            userData.username,
            userData.totalDays,
            userData.dailyPlan,
            userData.dates
        );
    }
}
