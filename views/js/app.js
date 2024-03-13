// App object
App = {
  
    web3Provider: null,//store web3 reference
    contracts:{},//instantiate an empty object
    /*
    init :  1.Setup web3 provider,
            2.Load contracts,
            3,Binds events to html components
    */
    init: () => {

      // A Web3Provider wraps a standard Web3 provider, which is
      // what MetaMask injects as window.ethereum into each page
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      // const [errorMessage, setErrorMessage] = [null,null];
      // const [defaultAccount, setDefaultAccount] = [null,null];
      // const [userBalance, setUserBalance] = [null,null];
      // const connectwalletHandler = () => {
      //     if (window.Ethereum) {
      //         provider.send("eth_requestAccounts", []).then(async () => {
      //             await accountChangedHandler(provider.getSigner());
      //         })
      //     } else {
      //         setErrorMessage("Please Install Metamask!!!");
      //     }
      // }
      // const accountChangedHandler = async (newAccount) => {
      //     const address = await newAccount.getAddress();
      //     setDefaultAccount(address);
      //     const balance = await newAccount.getBalance()
      //     setUserBalance(ethers.utils.formatEther(balance));
      //     await getuserBalance(address)
      // }
      // const getuserBalance = async (address) => {
      //     const balance = await provider.getBalance(address, "latest")
      // }

      let account = undefined;

      //Initialize web3 and set the provider to the testRPC.
      async function connectWallet(){

      //     // MetaMask requires requesting permission to connect users accounts
          const data = await provider.send("eth_requestAccounts", []);

      //     // The MetaMask plugin also allows signing transactions to
      //     // send ether and pay to change state within the blockchain.
      //     // For this, you need the account signer...
          const signer = provider.getSigner()
          
          account = data[0];

          $('#MyTokenWallet').text(account);
          
          console.log(account) // at this point you have something in.
          return true
      }

      connectWallet();
      
            
      if (!typeof web3 !== 'undefined') {
        App.web3Provider = window.ethereum;
        web3 = new Web3(window.ethereum);

        console.log(App.web3Provider)
      } else {
        // set the provider you want from Web3.providers
        App.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545');
        web3 = new Web3(App.web3Provider);
      }
      // App.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545');
      // web3 = new Web3(App.web3Provider);
      // //Next, we load the contracts
      // return App.initContract();
      //Next, we load the contracts
      
      return App.initContract();
      
      
    },
    initContract: function() {
     
      $.getJSON('scjson/SOCToken.json', function(message) {
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
      var amount = parseInt($('#MyTokenTransferAmount').val()*10000);
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
// Web page loaded event handler
$(() => {
  $(window).load(function () {
    App.init();
  });
  $("#getTicket").change(function () {
      var v = this.value;
      App.init();
  });

  
    
});

