// App object
App = {
    web3Provider: null,//store web3 reference
    contracts:{},//instantiate an empty object
    /*
    init :  1.Setup web3 provider,
            2.Load contracts,
            3,Binds events to html components
    */
    init: (x,y,z) => {
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
      
      return App.initContract(x,y,z);
      
      
    },
    initContract: (x,y,z) => {

      console.log(x);
      var jsonFile, tilte;
      switch (x) {
        case "0xE27f14f769b44d1E0289f2433443eDca8B536BD1":
          jsonFile = "Creature1.json";
          tilte = "Premium Gold Tickets 1st Row";
          break;
        case "0x9a8F3fad8a63Dd83031895109Eb8eC55dcDC8298":
          jsonFile = "Creature2.json";
          tilte = "Premium Gold Tickets 2nd Row";
          break;
        case "0x5824e92c3bc9498518E4E54720F8cE3ad0F99486":
          jsonFile = "Creature3.json";
          tilte = "Premium Gold Tickets 3rd Row";
          break;
        case "0xD0c51D73B8287Cb57cD7E04Ee4c0c85759450a02":
          jsonFile = "Creature4.json";
          tilte = "Standard Tickets Section 1";
          break;
        case "0x1207ecf691755aee4B67b091cd1b8cCcc5b84644":
          jsonFile = "Creature5.json";
          tilte = "Standard Tickets Section 2";
          break;
        case "0xf67EBE71Dcd55295FCfbC2f0F337786DFa2a1e0D":
          jsonFile = "Creature6.json";
          tilte = "Standard Tickets Section 3";
          break;
        case "0xC6BD5471E9C3b9F7f9d51E14b3D883C776c53247":
          jsonFile = "Creature7.json";
          tilte = "Standard Tickets Section 4";
          break;
        case "0x468cAADF90c156b1e15d535A3056ec57847498A6":
          jsonFile = "Creature8.json";
          tilte = "Standard Tickets Section 5";
          break;
        default:
          jsonFile = "Creature1.json";
          tilte = "Standard Tickets Section 1";
      }
      console.log(jsonFile);
      $.getJSON("scjson/"+jsonFile, function (data) {
        // Get the necessary contract artifact file and instantiate it with truffle-contract.
        console.log(data);
        var MyTokenArtifact = data;
        
        App.contracts.MyToken = TruffleContract(MyTokenArtifact);
  
        // Set the provider for our contract.
        App.contracts.MyToken.setProvider(App.web3Provider);

        // Use our contract to retieve and mark the adopted pets.
        return App.verifyTicket(y,z,tilte);
      });

    },
     verifyTicket: (y,z,title) => {
      var myTokenInstance;

      web3.eth.getAccounts(async (error, accounts) => {
        if (error) console.log(error);

        //Test
        myTokenInstance = await App.contracts.MyToken.deployed();
        console.log(myTokenInstance)

        var owner = await myTokenInstance.ownerOf(y);
        var ticket_html = "";
        if(owner==z){
          document.getElementById('result').innerHTML = `
            <h2>${title}</h2><h2>Seat No. ${y}</h2><div class="tick"></div><h2>VERIFICATION PASSED</h2>
          `;
        }else{
          document.getElementById('result').innerHTML = `
          <h2>${title}</h2><h2>Seat No. ${y}</h2><div class="cross"></div><h2>VERIFICATION FAILED</h2>
        `;
        }
        
      });
  
    }
};
// Web page loaded event handler
$(() => {
  $(window).load(function () {
    const scanner = new Html5QrcodeScanner('reader', { 
      // Scanner will be initialized in DOM inside element with id of 'reader'
      qrbox: {
          width: 280,
          height: 280,
      },  // Sets dimensions of scanning box (set relative to reader element width)
      fps: 20, // Frames per second to attempt a scan
    });


    scanner.render(success, error);
    // Starts scanner

    function success(result) {
      
        const resultArray = result.split("/");
        App.init(resultArray[0],resultArray[1],resultArray[2]);
        // document.getElementById('result').innerHTML = `
        // <h2>Premium Gold Tickets 3rd Row</h2><h2>Seat No. 1</h2><div class="tick"></div><h2>PASSED</h2>
        // `;
        // Prints result as a link inside result element

        scanner.clear();
        // Clears scanning instance

        document.getElementById('reader').remove();
        // Removes reader element from DOM since no longer needed
    
    }

    function error(err) {
        console.error(err);
        // Prints any errors to the console
    }
    
    
    
  });


  
    
});

