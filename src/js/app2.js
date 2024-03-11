// App object
App = {
  //object member variables
  web3Provider: null,//store web3 reference
  contracts: {},//instantiate an empty object
  /*
  init :  1.Setup web3 provider, 
          2.Load contracts,
          3,Binds events to html components
  */
  init: () => {
    // Initialize web3 and set the provider to the testRPC.
    if (!typeof web3 !== 'undefined') {
      App.web3Provider = window.ethereum;
      web3 = new Web3(window.ethereum);
    } else {
      // set the provider you want from Web3.providers
      App.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545');
      web3 = new Web3(App.web3Provider);
    }
    //Next, we load the contracts
    return App.initContract();
  },
  /*
  initContract: Load the contract details
  */
  initContract: () => {
    $.getJSON('https://api.npoint.io/5b4f209496ae794b9eb6', function (data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract.
      var MyTokenArtifact = data;
      App.contracts.MyToken = TruffleContract(MyTokenArtifact);

      // Set the provider for our contract.
      App.contracts.MyToken.setProvider(App.web3Provider);

      // Use our contract to retieve and mark the adopted pets.
      return App.getBalances();
    });
    //Next, we bind the event handlers of html components
    return App.bindEvents();
  },
  uploadFile: async () => {
    // let formData = new FormData();
    // formData.append("file", fileupload.files[0]);
    var file = fileupload.files[0];
    read = new FileReader();
    read.readAsBinaryString(file);
    read.onloadend = async ()=> {
      // console.log(read.result);
      var MyTokenArtifact = JSON.parse(read.result);
      App.contracts.MyToken = TruffleContract(MyTokenArtifact);

      // Set the provider for our contract.
      App.contracts.MyToken.setProvider(App.web3Provider);
      myTokenInstance = await App.contracts.MyToken.deployed();
      result = await myTokenInstance.symbol();
      $('#MyTokenSymbol').text(result);
      // Use our contract to retieve and mark the adopted pets.
      return App.getBalances();
    }
  },

  bindEvents: () => {
    $(document).on('click', '#transferButton', App.handleTransfer);
  },
  handleTransfer: (event) => {
    event.preventDefault();
    //Retrieve the values from the input box
    var amount = parseInt($('#MyTokenTransferAmount').val());
    var toAddress = $('#MyTokenTransferAddress').val();

    console.log('Transfer ' + amount + ' TT to ' + toAddress);

    var myTokenInstance;
    //Get the accounts
    web3.eth.getAccounts(function (error, accounts) {
      if (error) { console.log(error); }
      var account = accounts[0];
      App.contracts.MyToken.deployed().then(function (instance) {
        myTokenInstance = instance;
        //call the contract transfer method to execute the transfer
        return myTokenInstance.transfer(toAddress, amount, { from: account, gas: 100000 });
      }).then(function (result) {
        // alert('Transfer Successful!');
        $('#exampleModal').modal('show');
        return App.getBalances();
      }).catch(function (err) {
        console.log(err.message);
      });
    });
  },

  getBalances: () => {
    var myTokenInstance;
    /*Retrieve all the accounts that is currently connected
      to the blockchain*/
    web3.eth.getAccounts(async (error, accounts) => {
      if (error) console.log(error);
      //Use the first account
      var account = accounts[0];
      //Display the wallet address in the place holder
      $('#MyTokenWallet').text(account)
      //Test
      myTokenInstance = await App.contracts.MyToken.deployed();
      result = await myTokenInstance.balanceOf(account);
      balance = result.c[0];
      $('#MyTokenBalance').text(balance);

      result = await myTokenInstance.symbol();
      $('#MyTokenSymbol').text(result);
      count = await myTokenInstance.totalSupply()
      for(i=1;i<=count;i++){
        owner = await myTokenInstance.ownerOf(i);
        if(owner == account) result = "IS OWNER"
      }
      
      $('#MyTokenOwner').text(result);

      try{
      result = await myTokenInstance.description();
      $('#MyTokenDescription').text(result);
      }catch(err) {
        $('#MyTokenDescription').text("No Description");
      }
      result = await myTokenInstance.tokenURI(1);
      $('#MyTokenImage').attr("src", result);

      $('#exampleModal').modal('show');
      //end Test

      //Get the reference of the deployed token in the blockchain
      // App.contracts.MyToken.deployed().then(function (instance) {
      //   myTokenInstance = instance;
      //   //call the balanceOf the token of an account
      //   return myTokenInstance.balanceOf(account);
      // }).then(function (result) {
      //   balance = result.c[0];
      //   $('#MyTokenBalance').text(balance);
      // }).catch(function (err) {
      //   console.log(err.message);
      // });
    });
  },
}
// Web page loaded event handler
$(() => {
  $(window).load(function () {
    App.init();
  });
});