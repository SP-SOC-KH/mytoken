App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    console.log('step1')
    return App.initWeb3();
  },

  initWeb3: async function() {
    console.log('step2')
    // Initialize web3 and set the provider to the testRPC.

    // if (typeof window.ethereum !== 'undefined') {
    //   web3 = new Web3(window.ethereum);
    //   try {
    //     // Request account access if needed
    //     await window.ethereum.enable();
    //     // Acccounts now exposed
    //   } catch (error) {
    //     // User denied account access...
    //   }
    // } else {
    //    // set the provider you want from Web3.providers
    //    App.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545');
    //    web3 = new Web3(App.web3Provider);
    // }

    // if (typeof window.ethereum !== 'undefined') {
    //   web3 = new Web3(window.ethereum);
    //   try {
    //     // Request account access
    //     const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    //     // Accounts now exposed, use the first account
    //     const account = accounts[0];
    //   } catch (error) {
    //     // User denied account access or an error occurred
    //     console.error('User denied account access or an error occurred:', error);
    //   }
    // } else {
    //   // Warn the user that they need to install MetaMask
    //   console.error('Please install MetaMask!');
    //   // App.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545');
    //   //  web3 = new Web3(App.web3Provider);
    // }


    // if (!typeof web3 !== 'undefined') {
    //   App.web3Provider = window.ethereum;
    //   web3 = new Web3(window.ethereum);

    //   console.log(App.web3Provider)
    // } else {
    //   // set the provider you want from Web3.providers
    //   App.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545');
    //   web3 = new Web3(App.web3Provider);
    // }

    if (!typeof web3 !== 'undefined') {

      App.web3Provider =window.ethereum;
      // web3 = new Web3(web3.currentProvider);
      web3 = new Web3(window.ethereum);
      console.log(web3)
    } else {
      // set the provider you want from Web3.providers
      App.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545');
      web3 = new Web3(App.web3Provider);
    }
    console.log('step3')

    return App.initContract();
  },

  initContract: function() {
    console.log('step4')
    $.getJSON('SOCToken.json', function(message) {
      console.log('message: '+message)
      // Get the necessary contract artifact file and instantiate it with truffle-contract.
      var MyTokenArtifact = message;
      App.contracts.MyToken = TruffleContract(MyTokenArtifact);

      // Set the provider for our contract.
      if (window.ethereum) {
        App.contracts.MyToken.setProvider(App.web3Provider);
      } else {
        console.error("Ethereum provider not found. Install MetaMask or another wallet provider.");
      }
      // App.contracts.MyToken.setProvider(App.web3Provider);

      // Use our contract to retrieve and mark the adopted pets.
      return App.getBalances();
    });

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '#transferButton', App.handleTransfer);
  },

  handleTransfer: function(event) {
    event.preventDefault();
    //Retrieve the values from the input box
    var amount = parseInt($('#MyTokenTransferAmount').val());
    var toAddress = $('#MyTokenTransferAddress').val();

    console.log('Transfer ' + amount + ' TT to ' + toAddress);

    var myTokenInstance;
    //Get the accounts
    web3.eth.getAccounts(function(error, accounts) {
      if (error) {console.log(error);}
      var account = accounts[0];
      App.contracts.MyToken.deployed().then(function(instance) {
        myTokenInstance = instance;
        //call the constract transfer method to execut the transfer
        return myTokenInstance.transfer(toAddress, amount, {from: account, gas: 100000});
      }).then(function(result) {
        alert('Transfer Successful!');
        return App.getBalances();
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  },

  getBalances: function() {
    console.log('Getting balances...');
    var myTokenInstance;
    /*Retrive all the accounts that is currently connected
      to the blockchain*/
    web3.eth.getAccounts(function(error, accounts) {
      if (error) console.log(error);
      //Use the first account
      var account = accounts[0];
      //Display the wallet address in the place holder
      $('#MyTokenWallet').text(account)
      App.contracts.MyToken.deployed().then(function(instance) {
        myTokenInstance = instance;

        return myTokenInstance.balanceOf(account);
      }).then(function(result) {
        balance = result.c[0];

        $('#MyTokenBalance').text(balance);
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
