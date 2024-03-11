// App object
App = {
  //object member variables
  web3Provider: null,//store web3 reference
  contracts: {},//instantiate an empty object
  account: null, //account of wallet
  /*
  init :  1.Setup web3 provider, 
          2.Load contracts,
          3,Binds events to html components
  */
  init: async() => {
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
    await App.initContract();
    //Load account details
    await App.getAccountDetails();
    //Bind the DOM components
    await App.bindEvents();
  },
  /*
  initContract: Load the contract details
  */
  initContract: async () => {
    data = await $.getJSON('https://api.npoint.io/5b4f209496ae794b9eb6')
    // Get the necessary contract artifact file and instantiate it with truffle-contract.
    App.contracts.MyToken = TruffleContract(data);

    // Set the provider for our contract.
    App.contracts.MyToken.setProvider(App.web3Provider);
  },
  /*
  uploadFile: Load local abi json file
  */
  uploadFile: async () => {
    // let formData = new FormData();
    // formData.append("file", fileupload.files[0]);
    var file = fileupload.files[0];
    read = new FileReader();
    read.readAsBinaryString(file);
    read.onloadend = async () => {
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

    //call the contract transfer method to execute the transfer
    myTokenInstance.transfer(toAddress, amount, { from: account, gas: 100000 })
      .then(function (result) {
        // alert('Transfer Successful!');
        $('#exampleModal').modal('show');
        return App.getBalances();
      }).catch(function (err) {
        console.log(err.message);
      });
  },
  getAccountDetails: async()=>{
        /*Retrieve all the accounts that is currently connected
      to the blockchain*/
      web3.eth.getAccounts(async (error, accounts) => {
        if (error) console.log(error);
        //Use the first account
        App.account = accounts[0];
        //Display the wallet address in the place holder
        $('#MyTokenWallet').text(App.account)
        //Test
        App.tokenInstance = await App.contracts.MyToken.deployed();
        result = await App.tokenInstance.symbol();
        $('#MyTokenSymbol').text(result);
        count = await App.tokenInstance.totalSupply()
        // Use our contract to retrieve account balance.
        await App.getBalances();
      })
  },
  getBalances: async() => {
      result = await App.tokenInstance.balanceOf(App.account);
      balance = result.toNumber();
      $('#MyTokenBalance').text(balance);

      count = await App.tokenInstance.totalSupply()
      for (i = 1; i <= count; i++) {
        owner = await App.tokenInstance.ownerOf(i);
        if (owner == App.account) result = "IS OWNER"
      }
      $('#MyTokenOwner').text(result);
  },
}
// Web page loaded event handler
$(() => {
  $(window).load(function () {
    App.init();
  });
});