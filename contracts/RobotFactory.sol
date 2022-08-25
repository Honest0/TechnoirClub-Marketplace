// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

/**
 * @title RobotFactory contract.
 * NOTE: The contract inherits from the openzeppelin ERC721 contract and implements the basic function of creating a robot.
 * @dev The contract is the base for the RobotCore contract and contains a robot object.
 */
contract RobotFactory is ERC721("TechnoirClub", "NOIR") {
    struct Robot {
        uint64 robotId;
        uint64 buildTime;
        uint64 firstRobotParentId;
        uint64 secondRobotParentId;
        uint32 generation;
        uint32 tokenId;
    }

    Robot[] internal _robots;

    /**
     * @dev Emitted when new robot is build.
     * @param owner Robot owner.
     * @param robotId If of this robot.
     * @param firstRobotParentId Id of first 'parent' robot.
     * @param secondRobotParentId Id of first 'seconf' robot.
     * @param generation Generation of new robot.
     */
    event Build(
        address owner,
        uint64 buildTime,
        uint64 robotId,
        uint64 firstRobotParentId,
        uint64 secondRobotParentId,
        uint32 generation,
        uint32 tokenId
    );

    /**
     * @dev This is the base internal function for minting a new robot. It used in RobotCore when createRobotGen0()
     * or modify() functions are called.
     * @param id_ Fifteen-digit number id of new robot.
     * @param firstRobotParentId_ Robot Id of first 'Parent' robot.
     * @param secondRobotParentId_ Robot Id of second 'Parent' robot.
     * @param generation_ Generation of new robot.
     * @param owner_ Owner address of the token.
     *
     * Emits a {Build} event.
     */
    function _createRobot(
        uint64 id_,
        uint64 firstRobotParentId_,
        uint64 secondRobotParentId_,
        uint32 generation_,
        address owner_
    ) internal returns (uint256) {
        uint32 tokenId_ = uint32(_robots.length);
        uint64 builTime_ = uint64(block.timestamp);
        Robot memory _robot = Robot({
            robotId: id_,
            buildTime: builTime_,
            firstRobotParentId: firstRobotParentId_,
            secondRobotParentId: secondRobotParentId_,
            generation: generation_,
            tokenId: tokenId_
        });
        _robots.push(_robot);
        emit Build(owner_, builTime_, id_, firstRobotParentId_, secondRobotParentId_, uint32(generation_), tokenId_);
        _safeMint(msg.sender, tokenId_, "");
        return tokenId_;
    }

    /**
     * @dev Function to check all tokens belonging to a specific address. The function returns empty array
     * if the address does not own any token.
     * @param owner_ Address to be verified.
     */
    function tokensOfOwner(address owner_) external view returns (uint256[] memory ownerTokens) {
        uint256 tokenCount = balanceOf(owner_);
        if (tokenCount == 0) {
            return new uint256[](0);
        } else {
            uint256[] memory result = new uint256[](tokenCount);
            uint256 totalRobots = totalSupply();
            uint256 resultIndex = 0;
            for (uint256 tokenId = 0; tokenId <= totalRobots; tokenId++) {
                if (ownerOf(tokenId) == owner_) {
                    result[resultIndex] = tokenId;
                    resultIndex++;
                }
            }
            return result;
        }
    }

    /**
     * @dev Returns all minted robot - tokens.
     */
    function totalSupply() public view returns (uint256) {
        return _robots.length - 1;
    }
}
