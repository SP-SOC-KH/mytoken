// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title Ronnie Token Contract
 */
contract SOCToken is ERC20 {
    string public _name = "SOCToken";
    string public _description =
        "This token is created with love and friendship so that it represents long lasting";
    string public _symbol = "SOC";
    string public _imgURL =
        "https://pink-glamorous-cuckoo-175.mypinata.cloud/ipfs/QmYsTtGKMpUjuCLC7wXf65BXhSytobiAzprEywvTYT3NP2";
    uint8 public decimals = 4;
    uint256 public INITIAL_SUPPLY = 100000000000;

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
