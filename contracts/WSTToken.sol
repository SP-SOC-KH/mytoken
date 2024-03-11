// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0;

import "@openzeppelin/contracts/token/ERC20/ERC20Pausable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Mintable.sol";

/**
 * @title Workshop Token Contract
 * An ERC20 token which has the following features:
 * ERC20Burnable
 * ERC20Pausable
 * ERC20Mintable
 * ERC20Detailed
 */
contract WSTToken is
    ERC20Burnable,
    ERC20Pausable,
    ERC20Mintable,
    ERC20Detailed
{
    /**
     * @dev Contract constructor accepts parameter and initialize the
     * token contract.
     * @param _name Name of the token.
     * @param _symbol Symbol of the token.
     * @param _decimals Decimals of the token.
     */
    constructor(
        string memory _name,
        string memory _symbol,
        uint8 _decimals
    ) public ERC20Detailed(_name, _symbol, _decimals) {
        // solium-disable-previous-line no-empty-blocks
    }
}
