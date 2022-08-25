// SPDX-License-Identifier: MIT
import "./RobotFactory.sol";

pragma solidity 0.8.15;

/**
 * @title RobotMarketPlace contract.
 * NOTE: The contract includes functions for setting up, removing offers and buying robots.
 * @dev Contract RobotFactory contract.
 */
contract RobotMarketPlace is RobotFactory {
    struct Offer {
        address payable seller;
        uint256 price;
        uint256 tokenId;
    }

    Offer[] private _offers;

    // Mapping from token ID to Offer object.
    mapping(uint256 => Offer) private _tokenIdToOffer;
    // Mapping from token ID to Offer Id.
    mapping(uint256 => uint256) private _tokenIdToOfferId;

    /**
     * @dev Emitted when a new transaction occurs.
     * @param TxType String type of transaction.
     * @param owner Owner address of the token.
     * @param tokenId token Id.
     */
    event MarketTransaction(string TxType, address owner, uint256 tokenId);

    /**
     * @dev Function for exhibiting a token for sale.
     *
     * Requirements:
     *
     * - `_price` cannot be 0.
     * - `_tokenIdToOffer[_tokenId].price` must be 0, which mean that there is no offer for this token yet.
     *
     * @param _price The price in wei that the seller wants to receive for this token.
     * @param _tokenId Id of the token for sale.
     *
     * Emits a {MarketTransaction} event of type `Create offer`.
     */
    function setOffer(uint256 _price, uint256 _tokenId) public {
        require(_price != 0, "Price cannot be zero");
        require(_tokenIdToOffer[_tokenId].price == 0, "You can't sell twice the same offers");
        Offer memory _offer = Offer({seller: payable(msg.sender), price: _price, tokenId: _tokenId});
        _tokenIdToOffer[_tokenId] = _offer;
        _offers.push(_offer);
        uint256 index = _offers.length - 1;
        _tokenIdToOfferId[_tokenId] = index;
        emit MarketTransaction("Create offer", msg.sender, _tokenId);
    }

    /**
     * @dev Function to remove from the sale a specific token.
     *
     * Requirements:
     *
     * - `ownerOf(_tokenId)` must be `msg.sender`.
     * - `offer.seller` must be `msg.sender`, which mean that only the seller can remove the offer.
     *
     * @param _tokenId Id of the token to be removed from sales.
     *
     * Emits a {MarketTransaction} event of type `Remove offer`.
     */
    function removeOffer(uint256 _tokenId) public {
        require(ownerOf(_tokenId) == msg.sender, "The user doesn't own this token");
        Offer memory offer = _tokenIdToOffer[_tokenId];
        require(offer.seller == msg.sender, "No such offer exists");
        _offers[_tokenIdToOfferId[_tokenId]] = _offers[_offers.length - 1];
        _offers.pop();
        delete _tokenIdToOffer[_tokenId];
        _approve(msg.sender, _tokenId);
        emit MarketTransaction("Remove offer", msg.sender, _tokenId);
    }

    /**
     * @dev Function to buy a token available for purchase.
     *
     * Requirements:
     *
     * - `msg.value` must be `offer.price`, which means the buyer has to pay the exact price to the seller.
     *
     * @param _tokenId Id of the token to be purchased.
     *
     * Emits a {MarketTransaction} event of type `Buy`.
     */
    function buyRobot(uint256 _tokenId) public payable {
        Offer memory offer = _tokenIdToOffer[_tokenId];
        require(msg.value == offer.price, "The price is not correct");
        _offers[_tokenIdToOfferId[_tokenId]] = _offers[_offers.length - 1];
        _offers.pop();
        delete _tokenIdToOffer[_tokenId];
        _approve(msg.sender, _tokenId);
        transferFrom(offer.seller, msg.sender, _tokenId);
        offer.seller.transfer(msg.value);
        emit MarketTransaction("Buy", msg.sender, _tokenId);
    }

    /**
     * @dev Returns Offer data by providing token Id.
     */
    function getOffer(uint256 _tokenId)
        public
        view
        returns (
            address payable seller,
            uint256 price,
            uint256 tokenId
        )
    {
        Offer storage offer = _tokenIdToOffer[_tokenId];
        return (offer.seller, offer.price, offer.tokenId);
    }

    /**
     * @dev Returns all available tokens for sale.
     */
    function getAllTokensOnSale() public view returns (uint256[] memory listOfToken) {
        uint256 totalOffers = _offers.length;
        if (totalOffers == 0) {
            return new uint256[](0);
        } else {
            uint256[] memory resultOfToken = new uint256[](totalOffers);
            uint256 offerId;
            for (offerId = 0; offerId < totalOffers; offerId++) {
                if (_offers[offerId].price != 0) {
                    resultOfToken[offerId] = _offers[offerId].tokenId;
                }
            }
            return resultOfToken;
        }
    }
}
