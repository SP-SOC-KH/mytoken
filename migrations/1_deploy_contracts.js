var SOCToken = artifacts.require("SOCToken");

module.exports = function(deployer) {
  deployer.deploy(SOCToken);
};

// const WSTToken = artifacts.require("WSTToken");
// const WSTCrowdsale = artifacts.require("WSTCrowdsale");
// var BigNumber = require('big-number');
// module.exports = async function (deployer, network, accounts) {


//   //1. Deploy WSTToken
//   await deployer.deploy(WSTToken, "Workshop Token", "WST", 18);

//   //2. Deploy WSTCrowdsale
//   var owner = accounts[0];
//   var wallet = accounts[9];

//   var milliseconds = (new Date).getTime(); // Today time
//   var currentTimeInSeconds = parseInt(milliseconds / 1000);
//   var oneDayInSeconds = 86400;
//   var openingTime = currentTimeInSeconds + 60; // openingTime after a minute
//   var closingTime = openingTime + (oneDayInSeconds * 90); // closingTime after 90 days
//   var rate = 1000; //1000 WST tokens per ether
//   var cap = BigNumber(10000).pow(18); // 10000 ** 18 = 10000 ether

//   await deployer.deploy(
//     WSTCrowdsale,
//     rate,
//     wallet,
//     WSTToken.address,
//     openingTime,
//     closingTime,
//     cap
//   );

//   //3. Owner Adds MinterRole for WSTCrowdsale
//   var WstToken = await WSTToken.deployed();
//   WstToken.addMinter(WSTCrowdsale.address);
// }