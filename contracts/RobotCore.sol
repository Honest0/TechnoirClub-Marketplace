// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./RobotMarketPlace.sol";

/**
 * @title RobotCore contract.
 * NOTE: The contract includes the main functions for minting and modifying robots.
 * @dev Contract inherit from RobotMarketPlace and RobotFactory contracts.
 */
contract RobotCore is Ownable, RobotMarketPlace {
    uint256 private _gen0Counter;
    uint256 public immutable CREATION_LIMIT_GEN0;

    /**
     * @dev Set immutable amount of generation 0 robots available for minting.
     * @param _gen0Limit Limit of generation 0 robots that the owner of the contract can create.
     */
    constructor(uint256 _gen0Limit) {
        require(_gen0Limit > 1, "Minimum 2 gen0 required");
        CREATION_LIMIT_GEN0 = _gen0Limit;
    }

    /**
     * @dev Function to create a new robot from the IDs of two available robots for a specific address.
     * The ID of the new robot is calculated randomly using parts from the first and second parent IDs.
     * To calculate the generation and ID of a new robot, _newRobotId() and _newRobotGeneration() are called, respectively.
     * At the end it calls _createRobot() from RobotFactory contract.
     *
     * Requirements:
     *
     * - The owner of `_firstRobotParentId` and `_secondRobotParentId` must be the initiator of the function.
     * - `_firstRobotParentId` and `_secondRobotParentId` must be different IDs.
     *
     * @param _firstRobotParentId Id of first robot that will be the first 'parent'.
     * @param _secondRobotParentId Id of second robot that will be the second 'parent'.
     *
     * Emits a {Build} event.
     */
    function modifying(uint64 _firstRobotParentId, uint64 _secondRobotParentId) public {
        require(ownerOf(_firstRobotParentId) == msg.sender, "One or both of the tokens do not belong to caller");
        require(ownerOf(_secondRobotParentId) == msg.sender, "One or both of the tokens do not belong to caller");
        require(_firstRobotParentId != _secondRobotParentId, "The robot can't modify himself alone");
        (uint64 firstRobotParentId, , , , uint32 firstRobotParentGeneration, ) = getRobot(_firstRobotParentId);
        (uint64 secondRobotParentId, , , , uint32 secondRobotParentGeneration, ) = getRobot(_secondRobotParentId);
        uint256 newRobotId = _newRobotId(firstRobotParentId, secondRobotParentId);
        uint32 newRobotGeneration = _newRobotGeneration(firstRobotParentGeneration, secondRobotParentGeneration);
        _createRobot(uint64(newRobotId), _firstRobotParentId, _secondRobotParentId, newRobotGeneration, msg.sender);
    }

    /**
     * @dev The function for calculating the ID of the new robot, which is calculated from 8 parts, each of which is
     * randomly taken from one of the parents. Randomly, one of these parts does not belong to either parent and is
     * a unique part of the new robot.
     *
     * Algorithm use a mask on random number to check if the firstRobotParentId or the secondRobotParentID will be used
     * For example 205 is 11001101 in binary So 1 is firstRobotParent and 0 is secondRobotParent
     * firstRobotParent - firstRobotParent - secondRobotParent - secondRobotParent
     * - firstRobotParent - firstRobotParent - secondRobotParent - firstRobotParent
     * Than we get a binary bitwise AND operation with i, which is '00000001' for i = 1, '00000010' for i = 2,
     * '00000100' for i = 4, '00001000' for i = 8, '00010000' for i = 16, '00100000' for i = 32,
     * '01000000' for i = 64 and '10000000' for i = 128 for uint8 i(8 bits).
     *
     * @param firstRobotParentId_ Id of first robot that will be the first 'parent'.
     * @param secondRobotParentId_ Id of second robot that will be the second 'parent'.
     */
    function _newRobotId(uint64 firstRobotParentId_, uint64 secondRobotParentId_)
        private
        view
        returns (uint256 newRobotId_)
    {
        uint256 newRobotId;
        uint64[8] memory idArray;
        uint64 index = 8;
        uint256 random;
        for (uint256 i = 1; i <= 128; i *= 2) {
            random = uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty, msg.sender))) % 255;
            index -= 1;
            if (i == 16) {
                if (random % 2 != 0) {
                    idArray[index] = firstRobotParentId_ % 10;
                } else {
                    idArray[index] = secondRobotParentId_ % 10;
                }
                firstRobotParentId_ /= 10;
                secondRobotParentId_ /= 10;
            } else if (random & i != 0) {
                idArray[index] = firstRobotParentId_ % 100;
                firstRobotParentId_ /= 100;
                secondRobotParentId_ /= 100;
            } else {
                idArray[index] = secondRobotParentId_ % 100;
                firstRobotParentId_ /= 100;
                secondRobotParentId_ /= 100;
            }
        }
        /* Add a random parameter in a random place */
        uint64 newIdIndex = uint64(random % 8);
        if (newIdIndex == 3) {
            idArray[newIdIndex] = uint64(random % 9) + 1;
        } else {
            idArray[newIdIndex] = uint64(random % 89) + 11;
        }
        /* Id is reversed in the right order */
        for (uint256 i = 0; i < 8; i++) {
            newRobotId += idArray[i];
            if (i != 7) {
                newRobotId *= 100;
            }
            if (i == 2) {
                newRobotId /= 10;
            }
        }
        return newRobotId;
    }

    /**
     * @dev The function for calculating the generation of the new robot, which is calculated from generation
     * of first and second 'parents'.
     *
     * Algorithm check generations of the 'parents'. If the generation of one of the parents is greater than
     * the generation of the other, then one is added to the generation level of this parent and divided by two.
     * If the generation level of both parents is the same, then the generation level of the new robot
     * will be one more than its 'parents'.
     *
     * @param firstRobotParentGeneration_ generation of first robot that will be the first 'parent'.
     * @param secondRobotParentGeneration_ generation of second robot that will be the second 'parent'.
     */
    function _newRobotGeneration(uint32 firstRobotParentGeneration_, uint32 secondRobotParentGeneration_)
        private
        pure
        returns (uint32 newRobotGeneration_)
    {
        uint32 newRobotGeneration = 0;
        if (secondRobotParentGeneration_ < firstRobotParentGeneration_) {
            newRobotGeneration = firstRobotParentGeneration_ + 1;
            newRobotGeneration /= 2;
        } else if (secondRobotParentGeneration_ > firstRobotParentGeneration_) {
            newRobotGeneration = secondRobotParentGeneration_ + 1;
            newRobotGeneration /= 2;
        } else {
            newRobotGeneration = firstRobotParentGeneration_ + 1;
        }
        return newRobotGeneration;
    }

    /**
     * @dev Function to create a new robot of generation 0. The ID of the new robot is any fifteen-digit number.
     * There can be a limited number of these tokens, set by the owner of the contract.
     *
     * Requirements:
     *
     * - `_gen0Counter` must be less than `CREATION_LIMIT_GEN0`.
     *
     * @param _id Fifteen-digit ID number of new robot of generation 0.
     *
     * Emits a {Build} event.
     */
    function createRobotGen0(uint64 _id) external {
        require(_gen0Counter < CREATION_LIMIT_GEN0, "Gen0 the number of robots has reached its maximum");
        _gen0Counter++;
        uint256 tokenId = _createRobot(_id, 0, 0, 0, msg.sender);
        setOffer(0.2 ether, tokenId);
    }

    /**
     * @dev Returns Robot data by providing token Id.
     */
    function getRobot(uint64 _id)
        public
        view
        returns (
            uint64 robotId,
            uint64 buildTime,
            uint64 firstRobotParentId,
            uint64 secondRobotParentId,
            uint32 generation,
            uint32 tokenId
        )
    {
        Robot storage robot = _robots[_id];
        require(robot.buildTime > 0, "the robot doesn't exist");
        robotId = robot.robotId;
        buildTime = uint64(robot.buildTime);
        firstRobotParentId = uint64(robot.firstRobotParentId);
        secondRobotParentId = uint64(robot.secondRobotParentId);
        generation = robot.generation;
        tokenId = robot.tokenId;
    }

    /**
     * @dev Returns created amount of gen 0 robots.
     */
    function getCreatedGen0() external view returns (uint256) {
        return _gen0Counter;
    }
}
