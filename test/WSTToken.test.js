const { expectEvent, shouldFail } = require('openzeppelin-test-helpers');

const WSTToken = artifacts.require('WSTToken');

let WstToken;

contract('WSTToken', function (accounts) {
  beforeEach(async function () {
    WstToken = await WSTToken.new("Workshop Token", "WST", 18);

    //accounts
    owner = accounts[0];
    user1 = accounts[1];
    user2 = accounts[2];
    other = accounts[3];
  });

  describe('as ERC20Detailed', async function () {
    it('should have token name', async function () {
        let name  = await WstToken.name();
        assert.equal(name, "Workshop Token");
    });

    it('should have token symbol', async function () {
        let symbol = await WstToken.symbol();
        assert.equal(symbol, "WST");
    });

    it('should have token decimals', async function () {
        let decimals = await WstToken.decimals();
        assert.equal(decimals, 18);
    });
  });

  describe('as ERC20Mintable', async function () {
    it('owner should have minter role', async function () {
        let isMinter = await WstToken.isMinter(owner);
        assert.equal(isMinter, true);
    });

    it('minter should mint', async function () {
        assert(await WstToken.balanceOf(user1), 0);
        let isMinter = await WstToken.mint(user1, 100);
        assert(await WstToken.balanceOf(user1), 100);
    });
  });

  describe('as ERC20', async function () {
    beforeEach(async function() {
      WstToken = await WSTToken.new("Workshop Token", "MST", 18);
      await WstToken.mint(user1, 1000);
    });

    it('should return totalSupply', async function () {
        assert(await WstToken.totalSupply(), 1000);
    });

    it('should return balanceOf', async function () {
        assert(await WstToken.balanceOf(owner), 0);
        assert(await WstToken.balanceOf(user1), 1000);
        assert(await WstToken.balanceOf(user2), 0);
        assert(await WstToken.balanceOf(other), 0);
    });

    it('should transfer', async function () {
        await WstToken.transfer(user2, 500, {from: user1});
        assert(await WstToken.balanceOf(user1), 500);
        assert(await WstToken.balanceOf(user2), 500);
    });

    it('should fail transfer', async function () {
        await shouldFail.reverting(
            WstToken.transfer(user2, 500, {from: owner})
        );
        assert(await WstToken.balanceOf(owner), 20);
        assert(await WstToken.balanceOf(user1), 1000);
        assert(await WstToken.balanceOf(user2), 0);
        assert(await WstToken.balanceOf(other), 0);
    });

    it('should approve', async function () {
        assert(await WstToken.allowance(user1, user2), 0);

        await WstToken.approve(user2, 500, {from: user1});

        assert(await WstToken.balanceOf(user1), 1000);
        assert(await WstToken.balanceOf(user2), 0);
        assert(await WstToken.allowance(user1, user2), 500);
    });

    it('should return allowance', async function () {
        assert(await WstToken.allowance(user1, user2), 0);

        await WstToken.approve(user2, 1000, {from: user1});

        assert(await WstToken.balanceOf(user1), 1000);
        assert(await WstToken.balanceOf(user2), 0);
        assert(await WstToken.allowance(user1, user2), 1000);
    });

    it('should transferFrom', async function () {
        assert(await WstToken.balanceOf(user1), 1000);
        assert(await WstToken.balanceOf(user2), 0);
        assert(await WstToken.balanceOf(other), 0);
        assert(await WstToken.allowance(user1, user2), 0);

        await WstToken.approve(user2, 500, {from: user1});

        assert(await WstToken.balanceOf(user1), 1000);
        assert(await WstToken.balanceOf(user2), 0);
        assert(await WstToken.balanceOf(other), 0);
        assert(await WstToken.allowance(user1, user2), 500);

        await WstToken.transferFrom(user1, other, 250, {from: user2});

        assert(await WstToken.balanceOf(user1), 750);
        assert(await WstToken.balanceOf(user2), 0);
        assert(await WstToken.balanceOf(other), 250);
        assert(await WstToken.allowance(user1, user2), 250);
    });

    it('should increaseAllowance', async function () {
        assert(await WstToken.balanceOf(user1), 1000);
        assert(await WstToken.balanceOf(user2), 0);
        assert(await WstToken.balanceOf(other), 0);
        assert(await WstToken.allowance(user1, user2), 0);

        await WstToken.approve(user2, 500, {from: user1});

        assert(await WstToken.balanceOf(user1), 1000);
        assert(await WstToken.balanceOf(user2), 0);
        assert(await WstToken.balanceOf(other), 0);
        assert(await WstToken.allowance(user1, user2), 500);

        await WstToken.increaseAllowance(user2, 250, {from: user1});

        assert(await WstToken.balanceOf(user1), 1000);
        assert(await WstToken.balanceOf(user2), 0);
        assert(await WstToken.balanceOf(other), 0);
        assert(await WstToken.allowance(user1, user2), 750);

    });

    it('should decreaseAllowance', async function () {
        assert(await WstToken.balanceOf(user1), 1000);
        assert(await WstToken.balanceOf(user2), 0);
        assert(await WstToken.balanceOf(other), 0);
        assert(await WstToken.allowance(user1, user2), 0);

        await WstToken.approve(user2, 500, {from: user1});

        assert(await WstToken.balanceOf(user1), 1000);
        assert(await WstToken.balanceOf(user2), 0);
        assert(await WstToken.balanceOf(other), 0);
        assert(await WstToken.allowance(user1, user2), 500);

        await WstToken.decreaseAllowance(user2, 250, {from: user1});

        assert(await WstToken.balanceOf(user1), 1000);
        assert(await WstToken.balanceOf(user2), 0);
        assert(await WstToken.balanceOf(other), 0);
        assert(await WstToken.allowance(user1, user2), 250);

    });

  });

  describe('as ERC20Pausable', async function () {
    beforeEach(async function() {
      WstToken = await WSTToken.new("Workshop Token", "MST", 18);
      await WstToken.mint(user1, 1000);
    });

    it('should be unpaused by default', async function () {
        assert.equal(await WstToken.paused(), false);
    });

    it('should pause', async function () {
        assert.equal(await WstToken.paused(), false);
        await WstToken.pause();
        assert.equal(await WstToken.paused(), true);
    });

    it('should unpause', async function () {
        assert.equal(await WstToken.paused(), false);
        await WstToken.pause();
        assert.equal(await WstToken.paused(), true);
        await WstToken.unpause();
        assert.equal(await WstToken.paused(), false);
    });

    it('should not allow transfer when paused', async function () {
        assert.equal(await WstToken.paused(), false);
        await WstToken.pause();
        assert.equal(await WstToken.paused(), true);

        await shouldFail.reverting(
            WstToken.transfer(user2, 100, {from: user1})
        );

        assert(await WstToken.balanceOf(user1), 1000);
        assert(await WstToken.balanceOf(user2), 0);
    });

    it('should not allow transferFrom when paused', async function () {
        assert(await WstToken.allowance(user1, user2), 0);
        await WstToken.approve(user2, 500, {from: user1});
        assert(await WstToken.allowance(user1, user2), 500);

        assert.equal(await WstToken.paused(), false);
        await WstToken.pause();
        assert.equal(await WstToken.paused(), true);

        await shouldFail.reverting(
            WstToken.transferFrom(user1, user2, 100, {from: user2})
        );

        assert(await WstToken.allowance(user1, user2), 500);
        assert(await WstToken.balanceOf(user1), 1000);
        assert(await WstToken.balanceOf(user2), 0);
    });

    it('should not allow approve when paused', async function () {
        assert.equal(await WstToken.paused(), false);
        await WstToken.pause();
        assert.equal(await WstToken.paused(), true);

        assert(await WstToken.allowance(user1, user2), 0);
        await shouldFail.reverting(
            WstToken.approve(user2, 500, {from: user1})
        );
        assert(await WstToken.allowance(user1, user2), 0);

    });

    it('should not allow increaseAllowance when paused', async function () {
        assert.equal(await WstToken.paused(), false);
        await WstToken.pause();
        assert.equal(await WstToken.paused(), true);

        assert(await WstToken.allowance(user1, user2), 0);
        await shouldFail.reverting(
            WstToken.increaseAllowance(user2, 500, {from: user1})
        );
        assert(await WstToken.allowance(user1, user2), 0);

    });

    it('should not allow decreaseAllowance when paused', async function () {
        assert.equal(await WstToken.paused(), false);
        await WstToken.pause();
        assert.equal(await WstToken.paused(), true);

        assert(await WstToken.allowance(user1, user2), 0);
        await shouldFail.reverting(
            WstToken.decreaseAllowance(user2, 500, {from: user1})
        );
        assert(await WstToken.allowance(user1, user2), 0);

    });


  });

  describe('as ERC20Burnable', async function () {
    beforeEach(async function() {
      WstToken = await WSTToken.new("Workshop Token", "MST", 18);
      await WstToken.mint(user1, 1000);
    });

    it('should burn', async function () {
        assert.equal(await WstToken.balanceOf(user1), 1000);
        assert.equal(await WstToken.totalSupply(), 1000);

        await WstToken.burn(100, {from: user1});

        assert.equal(await WstToken.balanceOf(user1), 900);
        assert.equal(await WstToken.totalSupply(), 900);
    });

    it('should burnFrom', async function () {
        assert.equal(await WstToken.balanceOf(user1), 1000);
        assert.equal(await WstToken.balanceOf(user2), 0);
        assert.equal(await WstToken.allowance(user1, user2), 0);
        assert.equal(await WstToken.totalSupply(), 1000);

        await WstToken.approve(user2, 200, {from: user1});
        assert.equal(await WstToken.allowance(user1, user2), 200);
        await WstToken.burnFrom(user1, 100, {from: user2});

        assert.equal(await WstToken.balanceOf(user1), 900);
        assert.equal(await WstToken.balanceOf(user2), 0);
        assert.equal(await WstToken.allowance(user1, user2), 100);
        assert.equal(await WstToken.totalSupply(), 900);
    });

  });

});