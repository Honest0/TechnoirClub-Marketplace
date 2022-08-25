# Solidity API

## RobotCore

_Contract inherit from RobotMarketPlace and RobotFactory contracts._

### _gen0Counter

```solidity
uint256 _gen0Counter
```

### CREATION_LIMIT_GEN0

```solidity
uint256 CREATION_LIMIT_GEN0
```

### constructor

```solidity
constructor(uint256 _gen0Limit) public
```

_Set immutable amount of generation 0 robots available for minting._

| Name | Type | Description |
| ---- | ---- | ----------- |
| _gen0Limit | uint256 | Limit of generation 0 robots that the owner of the contract can create. |

### modifying

```solidity
function modifying(uint64 _firstRobotParentId, uint64 _secondRobotParentId) public
```

_Function to create a new robot from the IDs of two available robots for a specific address.
The ID of the new robot is calculated randomly using parts from the first and second parent IDs.
To calculate the generation and ID of a new robot, _newRobotId() and _newRobotGeneration() are called, respectively.
At the end it calls _createRobot() from RobotFactory contract.

Requirements:

- The owner of `_firstRobotParentId` and `_secondRobotParentId` must be the initiator of the function.
- `_firstRobotParentId` and `_secondRobotParentId` must be different IDs._

| Name | Type | Description |
| ---- | ---- | ----------- |
| _firstRobotParentId | uint64 | Id of first robot that will be the first 'parent'. |
| _secondRobotParentId | uint64 | Id of second robot that will be the second 'parent'. Emits a {Build} event. |

### _newRobotId

```solidity
function _newRobotId(uint64 firstRobotParentId_, uint64 secondRobotParentId_) private view returns (uint256 newRobotId_)
```

_The function for calculating the ID of the new robot, which is calculated from 8 parts, each of which is
randomly taken from one of the parents. Randomly, one of these parts does not belong to either parent and is
a unique part of the new robot.

Algorithm use a mask on random number to check if the firstRobotParentId or the secondRobotParentID will be used
For example 205 is 11001101 in binary So 1 is firstRobotParent and 0 is secondRobotParent
firstRobotParent - firstRobotParent - secondRobotParent - secondRobotParent
- firstRobotParent - firstRobotParent - secondRobotParent - firstRobotParent
Than we get a binary bitwise AND operation with i, which is '00000001' for i = 1, '00000010' for i = 2,
'00000100' for i = 4, '00001000' for i = 8, '00010000' for i = 16, '00100000' for i = 32,
'01000000' for i = 64 and '10000000' for i = 128 for uint8 i(8 bits)._

| Name | Type | Description |
| ---- | ---- | ----------- |
| firstRobotParentId_ | uint64 | Id of first robot that will be the first 'parent'. |
| secondRobotParentId_ | uint64 | Id of second robot that will be the second 'parent'. |

### _newRobotGeneration

```solidity
function _newRobotGeneration(uint32 firstRobotParentGeneration_, uint32 secondRobotParentGeneration_) private pure returns (uint32 newRobotGeneration_)
```

_The function for calculating the generation of the new robot, which is calculated from generation
of first and second 'parents'.

Algorithm check generations of the 'parents'. If the generation of one of the parents is greater than
the generation of the other, then one is added to the generation level of this parent and divided by two.
If the generation level of both parents is the same, then the generation level of the new robot
will be one more than its 'parents'._

| Name | Type | Description |
| ---- | ---- | ----------- |
| firstRobotParentGeneration_ | uint32 | generation of first robot that will be the first 'parent'. |
| secondRobotParentGeneration_ | uint32 | generation of second robot that will be the second 'parent'. |

### createRobotGen0

```solidity
function createRobotGen0(uint64 _id) external
```

_Function to create a new robot of generation 0. The ID of the new robot is any fifteen-digit number.
There can be a limited number of these tokens, set by the owner of the contract.

Requirements:

- `_gen0Counter` must be less than `CREATION_LIMIT_GEN0`._

| Name | Type | Description |
| ---- | ---- | ----------- |
| _id | uint64 | Fifteen-digit ID number of new robot of generation 0. Emits a {Build} event. |

### getRobot

```solidity
function getRobot(uint64 _id) public view returns (uint64 robotId, uint64 buildTime, uint64 firstRobotParentId, uint64 secondRobotParentId, uint32 generation, uint32 tokenId)
```

_Returns Robot data by providing token Id._

### getCreatedGen0

```solidity
function getCreatedGen0() external view returns (uint256)
```

_Returns created amount of gen 0 robots._

## RobotFactory

_The contract is the base for the RobotCore contract and contains a robot object._

### Robot

```solidity
struct Robot {
  uint64 robotId;
  uint64 buildTime;
  uint64 firstRobotParentId;
  uint64 secondRobotParentId;
  uint32 generation;
  uint32 tokenId;
}
```

### _robots

```solidity
struct RobotFactory.Robot[] _robots
```

### Build

```solidity
event Build(address owner, uint64 buildTime, uint64 robotId, uint64 firstRobotParentId, uint64 secondRobotParentId, uint32 generation, uint32 tokenId)
```

_Emitted when new robot is build._

| Name | Type | Description |
| ---- | ---- | ----------- |
| owner | address | Robot owner. |
| buildTime | uint64 |  |
| robotId | uint64 | If of this robot. |
| firstRobotParentId | uint64 | Id of first 'parent' robot. |
| secondRobotParentId | uint64 | Id of first 'seconf' robot. |
| generation | uint32 | Generation of new robot. |
| tokenId | uint32 |  |

### _createRobot

```solidity
function _createRobot(uint64 id_, uint64 firstRobotParentId_, uint64 secondRobotParentId_, uint32 generation_, address owner_) internal returns (uint256)
```

_This is the base internal function for minting a new robot. It used in RobotCore when createRobotGen0()
or modify() functions are called._

| Name | Type | Description |
| ---- | ---- | ----------- |
| id_ | uint64 | Fifteen-digit number id of new robot. |
| firstRobotParentId_ | uint64 | Robot Id of first 'Parent' robot. |
| secondRobotParentId_ | uint64 | Robot Id of second 'Parent' robot. |
| generation_ | uint32 | Generation of new robot. |
| owner_ | address | Owner address of the token. Emits a {Build} event. |

### tokensOfOwner

```solidity
function tokensOfOwner(address owner_) external view returns (uint256[] ownerTokens)
```

_Function to check all tokens belonging to a specific address. The function returns empty array
if the address does not own any token._

| Name | Type | Description |
| ---- | ---- | ----------- |
| owner_ | address | Address to be verified. |

### totalSupply

```solidity
function totalSupply() public view returns (uint256)
```

_Returns all minted robot - tokens._

## RobotMarketPlace

_Contract RobotFactory contract._

### Offer

```solidity
struct Offer {
  address payable seller;
  uint256 price;
  uint256 tokenId;
}
```

### _offers

```solidity
struct RobotMarketPlace.Offer[] _offers
```

### _tokenIdToOffer

```solidity
mapping(uint256 => struct RobotMarketPlace.Offer) _tokenIdToOffer
```

### _tokenIdToOfferId

```solidity
mapping(uint256 => uint256) _tokenIdToOfferId
```

### MarketTransaction

```solidity
event MarketTransaction(string TxType, address owner, uint256 tokenId)
```

_Emitted when a new transaction occurs._

| Name | Type | Description |
| ---- | ---- | ----------- |
| TxType | string | String type of transaction. |
| owner | address | Owner address of the token. |
| tokenId | uint256 | token Id. |

### setOffer

```solidity
function setOffer(uint256 _price, uint256 _tokenId) public
```

_Function for exhibiting a token for sale.

Requirements:

- `_price` cannot be 0.
- `_tokenIdToOffer[_tokenId].price` must be 0, which mean that there is no offer for this token yet._

| Name | Type | Description |
| ---- | ---- | ----------- |
| _price | uint256 | The price in wei that the seller wants to receive for this token. |
| _tokenId | uint256 | Id of the token for sale. Emits a {MarketTransaction} event of type `Create offer`. |

### removeOffer

```solidity
function removeOffer(uint256 _tokenId) public
```

_Function to remove from the sale a specific token.

Requirements:

- `ownerOf(_tokenId)` must be `msg.sender`.
- `offer.seller` must be `msg.sender`, which mean that only the seller can remove the offer._

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tokenId | uint256 | Id of the token to be removed from sales. Emits a {MarketTransaction} event of type `Remove offer`. |

### buyRobot

```solidity
function buyRobot(uint256 _tokenId) public payable
```

_Function to buy a token available for purchase.

Requirements:

- `msg.value` must be `offer.price`, which means the buyer has to pay the exact price to the seller._

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tokenId | uint256 | Id of the token to be purchased. Emits a {MarketTransaction} event of type `Buy`. |

### getOffer

```solidity
function getOffer(uint256 _tokenId) public view returns (address payable seller, uint256 price, uint256 tokenId)
```

_Returns Offer data by providing token Id._

### getAllTokensOnSale

```solidity
function getAllTokensOnSale() public view returns (uint256[] listOfToken)
```

_Returns all available tokens for sale._

