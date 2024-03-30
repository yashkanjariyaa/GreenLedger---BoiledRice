// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract UserDataContract is ERC721 {
    struct UserData {
        string username;
        string email;
        string location;
        uint256 age;
        string dailyPlan;
        uint256 totalDays;
        string[] dates;
        uint256 leaderboardRank;
        uint256 points;
        string[] badges;
    }

    mapping(uint256 => UserData) private userDataMap;
    uint256 private tokenIdCounter;

    constructor() ERC721("UserDataToken", "UDT") {}

    event UserRegistered(uint256 indexed tokenId, string username);
    event DailyPlanUpdated(uint256 indexed tokenId, string newDailyPlan);
    event TotalDaysUpdated(uint256 indexed tokenId, uint256 newTotalDays);
    event DatesUpdated(uint256 indexed tokenId, string[] newDates);
    event PointsAdded(uint256 indexed tokenId, uint256 addedPoints);
    event BadgeEarned(uint256 indexed tokenId, string badgeName);

    function registerUser(
        string memory _username,
        string memory _email,
        string memory _location,
        uint256 _age,
        string memory _dailyPlan
    ) external {
        require(bytes(_username).length > 0, "Username cannot be empty");
        require(bytes(_email).length > 0, "Email cannot be empty");
        require(bytes(_location).length > 0, "Location cannot be empty");

        uint256 newTokenId = tokenIdCounter;
        tokenIdCounter++;

        UserData storage userData = userDataMap[newTokenId];

        userData.username = _username;
        userData.email = _email;
        userData.location = _location;
        userData.age = _age;
        userData.dailyPlan = _dailyPlan;

        _safeMint(msg.sender, newTokenId);

        emit UserRegistered(newTokenId, _username);
    }

    function updateDailyPlan(uint256 _tokenId, string memory _dailyPlan) external {
        require(_exists(_tokenId), "Token ID does not exist");
        UserData storage userData = userDataMap[_tokenId];
        userData.dailyPlan = _dailyPlan;
        emit DailyPlanUpdated(_tokenId, _dailyPlan);
    }

    function updateTotalDays(uint256 _tokenId, uint256 _totalDays) external {
        require(_exists(_tokenId), "Token ID does not exist");
        UserData storage userData = userDataMap[_tokenId];
        userData.totalDays = _totalDays;
        emit TotalDaysUpdated(_tokenId, _totalDays);
    }

    function updateDates(uint256 _tokenId, string[] memory _dates) external {
        require(_exists(_tokenId), "Token ID does not exist");
        UserData storage userData = userDataMap[_tokenId];
        userData.dates = _dates;
        emit DatesUpdated(_tokenId, _dates);
    }

    function addPoints(uint256 _tokenId, uint256 _points) external {
        require(_exists(_tokenId), "Token ID does not exist");
        UserData storage userData = userDataMap[_tokenId];
        userData.points += _points;
        emit PointsAdded(_tokenId, _points);
    }

    function addBadge(uint256 _tokenId, string memory _badgeName) external {
        require(_exists(_tokenId), "Token ID does not exist");
        UserData storage userData = userDataMap[_tokenId];
        userData.badges.push(_badgeName);
        emit BadgeEarned(_tokenId, _badgeName);
    }

    function getUserData(uint256 _tokenId)
        external
        view
        returns (
            string memory username,
            string memory email,
            string memory location,
            uint256 age,
            string memory dailyPlan,
            uint256 totalDays,
            string[] memory dates,
            uint256 leaderboardRank,
            uint256 points,
            string[] memory badges
        )
    {
        UserData storage userData = userDataMap[_tokenId];
        return (
            userData.username,
            userData.email,
            userData.location,
            userData.age,
            userData.dailyPlan,
            userData.totalDays,
            userData.dates,
            userData.leaderboardRank,
            userData.points,
            userData.badges
        );
    }
}
