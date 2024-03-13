// App object
App = {
    web3Provider: null,//store web3 reference
    contracts:{},//instantiate an empty object
    /*
    init :  1.Setup web3 provider,
            2.Load contracts,
            3,Binds events to html components
    */
    init: (x) => {
      // // Initialize web3 and set the provider to the testRPC.
      
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
      
      return App.initContract(x);
      
      
    },
    initContract: (x) => {

      console.log(x);
      var jsonFile;
      switch (x) {
        case "1":
          jsonFile = "Creature1.json";
          break;
        case "2":
          jsonFile = "Creature2.json";
          break;
        case "3":
          jsonFile = "Creature3.json";
          break;
        case "4":
          jsonFile = "Creature4.json";
          break;
        case "5":
          jsonFile = "Creature5.json";
          break;
        case "6":
          jsonFile = "Creature6.json";
          break;
        case "7":
          jsonFile = "Creature7.json";
          break;
        case "8":
          jsonFile = "Creature8.json";
          break;
        default:
          jsonFile = "Creature1.json";
      }
      console.log(jsonFile);
      $.getJSON(jsonFile, function (data) {
        // Get the necessary contract artifact file and instantiate it with truffle-contract.
        console.log(data);
        var MyTokenArtifact = data;
        
        App.contracts.MyToken = TruffleContract(MyTokenArtifact);
  
        // Set the provider for our contract.
        App.contracts.MyToken.setProvider(App.web3Provider);

        // Use our contract to retieve and mark the adopted pets.
        return App.getBalances(x);
      });
      //Next, we bind the event handlers of html components
      // return App.bindEvents();
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
        console.log(account)
        
        App.contracts.MyToken.deployed().then(function (instance) {
          myTokenInstance = instance;
          //call the contract transfer method to execute the transfer
          // return myTokenInstance.transfer(toAddress, amount, { from: account, gas: 100000 });
          return myTokenInstance.transfer(toAddress, amount, { from: account });
        }).then(function (result) {
          alert('Transfer Successful!');
          return App.getBalances();
        }).catch(function (err) {
          console.log(err.message);
        });
      });
    },
   
    getBalances: (x) => {
      var myTokenInstance;
  /*Retrieve all the accounts that is currently connected
    to the blockchain*/
    // async function fetch_tokenuri(url){
    //   const response = await fetch(url);
    //   return response.json();
    // }

    web3.eth.getAccounts(async (error, accounts) => {
      if (error) console.log(error);

      //Use the first account
      var account = accounts[0];

      $('#MyTokenWallet').text(account);

      if(x!="0"){

        //Test
        myTokenInstance = await App.contracts.MyToken.deployed();
        console.log(myTokenInstance)
        result = await myTokenInstance.balanceOf(account);
        console.log(result)
        balance = result.words[0];
        
        $('#MyTokenBalance').text(balance);

        let symbol = await myTokenInstance.symbol();
        $('#MyTokenSymbol').text(symbol);
        // let tokenURI = await myTokenInstance.tokenURI();
        let totalSupply = await myTokenInstance.totalSupply();
        // console.log(totalSupply.c[0])
        // let myTokenURI = await myTokenInstances.tokenURI(1)
        let isOwner = false;

        // console.log(typeof totalSupply.c[0]== 'number' && totalSupply.c[0]%1== 0)
        var ticket_html = "";
        $('#loading').show();
        for(let i=1; i <= totalSupply.words[0]; i++){
          console.log("checking --- ")
          var owner = await myTokenInstance.ownerOf(i);
          if(owner==account){
            var tokenuri = await myTokenInstance.tokenURI(i);
            var response = await fetch(tokenuri)
            var data = await response.json();
            //console.log(data);
            ticket_html += '<div class="card" style="margin: 20px;"><img id="MyTokenImage" class="card-img-top mx-auto d-block" src="';
            ticket_html += data.image;
            ticket_html +='" alt="Card image" style="width: 60%;"><div class="card-body" style="text-align:center;"><h4 class="card-title" id="tid">';
            ticket_html += '#' + i + '</h4></div></div>';

            isOwner = true;

            
            // console.log(tokenuri)
            
            
          }
          
        }
        $('#loading').hide();
        if(isOwner){
          $('#ticket').html(ticket_html);
        }else{
          $('#ticket').html("Sorry, no tickets found.");
        }
      }
      
      // if(isOwner){
      //   $('#ownership i:first-child').addClass('active').siblings().removeClass('active');
      // }else{
      //   $('#ownership i:last-child').addClass('active').siblings().removeClass('active');
      // }

      // console.log(totalSupply.c[0]);

      // let desc = await myTokenInstance.description();
      // $('#MyTokenDescription').html(desc);

      // let imgURL = await myTokenInstance.imgURL();
      // $('#MyTokenImage').attr("src", imgURL).width("60%");;



      // if (error) console.log(error);
      // //Use the first account
      // var account = accounts[0];
      // //Display the wallet address in the place holder
      // $('#MyTokenWallet').text(account)
      // //Get the reference of the deployed token in the blockchain
      // App.contracts.MyToken.deployed().then((instance) => {
      //   myTokenInstance = instance;
      //   //call the balanceOf the token of an account
      //   return myTokenInstance.balanceOf(account);
      // }).then((result) => {
      //   balance = result.c[0];
      //   //Display the balance in the place holder
      //   $('#MyTokenBalance').text(balance);
      // }).catch((err) => {
      //   console.log(err.message);
      // });
    });
  
    }
};
// Web page loaded event handler
$(() => {
  $(window).load(function () {
    App.init(0);
  });
  $("#getTicket").change(function () {
      var v = this.value;
      App.init(v);
  });
});

