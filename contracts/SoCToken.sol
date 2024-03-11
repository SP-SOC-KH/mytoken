// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title Ronnie Token Contract
 */
contract SoCToken is ERC20 {
    string public _name = "SoCToken";
    string public _description =
        "This token is created with love and friendship so that it represents long lasting";
    string public _symbol = "SOC";
    string public _imgURL =
        "https://gateway.pinata.cloud/ipfs/QmSLbdzYBUJqpmdq2pC9SCfcaPPuSyEqKXpdVH41zkKb4K";
    uint8 public decimals = 2;
    uint256 public INITIAL_SUPPLY = 10000000;

    constructor() public {
        _mint(msg.sender, INITIAL_SUPPLY);
    }

    function name() public view returns (string memory) {
        return _name;
    }

    function symbol() public view returns (string memory) {
        return _symbol;
    }

    function description() public view returns (string memory) {
        return _description;
    }

    function imgURL() public view returns (string memory) {
        return _imgURL;
    }
}
