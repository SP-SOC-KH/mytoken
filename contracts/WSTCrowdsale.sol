// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0;


import "@openzeppelin/contracts/crowdsale/validation/TimedCrowdsale.sol";
import "@openzeppelin/contracts/crowdsale/emission/MintedCrowdsale.sol";
import "@openzeppelin/contracts/crowdsale/validation/CappedCrowdsale.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title WST Token Crowdsale contract.
 * @dev Contract accept ETH and mint new WSTToken for the ETH sender.
 * The Crowdsale has some features:
 * CappedCrowdsale: Max ETH cap the Crowdsale accept.
 * TimedCrowdsale: Crowdsale starts on openingTime and closes on closingTime.
 * MintedCrowdsale: The Crowdsale mints new token via the WSTToken contract.
 */
contract WSTCrowdsale is
    CappedCrowdsale, TimedCrowdsale, MintedCrowdsale {

    /**
     * @dev Contract constructor accepts parameter and initialize the crowdsale.
     * @param _rate Rate for the Crowdsale contract.
     * @param _wallet Wallet address where ETH will be sent.
     * @param _token WSTToken address.
     * @param _openingTime Opening time of the Crowdsale.
     * @param _closingTime Closing time of the Crowdsale.
     * @param _cap Max cap in ETH for Crowdsale.
     */
    constructor(
        uint256 _rate,
        address payable _wallet,
        IERC20 _token,
        uint256 _openingTime,
        uint256 _closingTime,
        uint256 _cap
    )
        Crowdsale(_rate, _wallet, _token)
        TimedCrowdsale(_openingTime, _closingTime)
        CappedCrowdsale(_cap)
        public
    {
        // solium-disable-previous-line no-empty-blocks
    }
}