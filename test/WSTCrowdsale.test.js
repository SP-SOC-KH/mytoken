const { BN, ether, shouldFail, time } = require('openzeppelin-test-helpers');
const WSTCrowdsale = artifacts.require('WSTCrowdsale');
const WSTToken = artifacts.require('WSTToken');

let WstCrowdsale;
let WstToken;

contract('WSTCrowdsale', function (accounts) {
  beforeEach(async function () {
    WstCrowdsale = await WSTCrowdsale.deployed();
    WstToken = await WSTToken.deployed();

    //accounts
    owner = accounts[0];
    user1 = accounts[1];
    user2 = accounts[2];
    other = accounts[3];
  });

  describe('as TimedCrowdsale', async function () {
    it('should have crowdsale openTime', async function () {
        assert(await WstCrowdsale.openingTime() > 0);
    });

    it('should have crowdsale closingTime', async function () {
        assert(await WstCrowdsale.closingTime() > 0);
    });

    it('should not hasClosed', async function () {
        assert.equal(await WstCrowdsale.hasClosed(), false);
    });

    it('should not isOpen', async function () {
        assert.equal(await WstCrowdsale.isOpen(), false);
    });

    it('should Open crowdsale', async function () {
        if(time < await WstCrowdsale.openingTime())
          await time.increaseTo(await WstCrowdsale.openingTime());
        assert.equal(await WstCrowdsale.isOpen(), true);
        assert.equal(await WstCrowdsale.hasClosed(), false);
    });
  });
});

contract('WSTCrowdsale', function (accounts) {
  beforeEach(async function () {
    WstCrowdsale = await WSTCrowdsale.deployed();

    //accounts
    owner = accounts[0];
    user1 = accounts[1];
    user2 = accounts[2];
    other = accounts[3];
    wallet = accounts[9];
  });

  describe('as Crowdsale', async function () {
    it('should default to zero', async function () {
        assert.equal(await WstCrowdsale.weiRaised(), 0);
    });

    it('should open crowdsale', async function () {
        await time.increaseTo(await WstCrowdsale.openingTime());
        assert.equal(await WstCrowdsale.isOpen(), true);
        assert.equal(await WstCrowdsale.hasClosed(), false);
    });

    it('should mint MST when ETH received', async function () {
        const prevWalletBal = new BN(await web3.eth.getBalance(wallet));
        const value = ether('1');
        const mstBalance = new BN('10').pow(new BN('21'));
        assert.equal(await WstCrowdsale.weiRaised(), 0);
        await WstToken.addMinter(WstCrowdsale.address)
        await WstCrowdsale.buyTokens(user1, {from: user1, value: value});
        const temp2 = await WstCrowdsale.weiRaised()
        assert( (await WstCrowdsale.weiRaised()).eq(value) );

        assert( (await WstToken.balanceOf(user1)).eq(mstBalance) );

        const currWalletBal = new BN(await web3.eth.getBalance(wallet));
        assert(prevWalletBal.add(value).eq(currWalletBal));
    });

  });
});