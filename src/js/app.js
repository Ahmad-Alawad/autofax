App = {
  web3Provider: null,
  contracts: {},
  contractInstance: null,
  msg: $('.msg'),
  globalLength:0,




  init: function () {

    return App.initWeb3();
  },



  initWeb3: function () {
    // Is there an injected web3 instance?
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
    } else {
      // If no injected web3 instance is detected, fall back to Ganache
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
    }
    web3 = new Web3(App.web3Provider);
    return App.initContract();
  },




  initContract: function () {
    $.getJSON('AutoFax.json', function (data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      var AutoFaxArtifact = data;
      App.contracts.AutoFax = TruffleContract(AutoFaxArtifact);

      // Set the provider for our contract
      App.contracts.AutoFax.setProvider(App.web3Provider);

      App.createContractInstance();
      
      // App.contractInstance.setMaintance("0x2CF0C499ff12B149AD8a76E751842F96C1586b0D","1","Oil change",1000);
      // App.contractInstance.setMaintance("0x2CF0C499ff12B149AD8a76E751842F96C1586b0D","1","fix wheels change",2000);
      return App.bindEvents();

    });
  },



  createContractInstance() {
    App.contracts.AutoFax.deployed()
      .then(function (instance) {
        console.log("Just before intance");
        App.contractInstance = instance;
      //   App.contractInstance.setMaintance("0x2CF0C499ff12B149AD8a76E751842F96C1586b0D","1","Oil change",1000);
      // App.contractInstance.setMaintance("0x2CF0C499ff12B149AD8a76E751842F96C1586b0D","1","fix wheels change",2000);
      });

  },




  bindEvents: function () {
    $('.set-maintance').click(App.setMaintance);
    $('.get-length').click(App.getLength);
    $('.get-history').click(App.getAllHistory);
  },

  getLength: function(vin){
    console.log("Inside is getLength");
    var length = App.contractInstance.getLength(vin).then((data) => {
    console.log(data);
    // debugger;
    console.log("Length: ",data['c'][0]);

    length = data['c'][0];
    App.globalLength =  length;
    
  });

} ,



  sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
 },

   getAllHistory: async function(){

    console.log("Inside getHistory");
    const vin = $('#vin-key').val();
    App.getLength(vin);
    console.log("Before Sleep")
    await App.sleep(2000);
    console.log("After Sleep : " ,App.globalLength);
    var history = [];
    document.getElementById("all-data").innerHTML = "";

    for (var i=0; i<App.globalLength; i++){
      history[i] = App.getHistoryByIndex(vin,i);
      await App.sleep(1000);
      console.log("History loop", i, "history[i]",history[i] );
    }



      

} ,

// Set History 

setMaintance: function(){

    console.log("Inside getHistory");

    const owner = $('#owner-key').val();
    const vin = $('#vin-key').val();
    const main = $('#main-key').val();
    const milage = $('#milage-key').val();
    
    console.log("before set main");
    App.contractInstance.setMaintance(owner,vin,main,parseInt(milage, 10));
    console.log("after set main");
      

} ,

 getHistoryByIndex: function(vin,index){

  console.log("Inside is getHistory by index");
  App.contractInstance.getHistory(vin,index).then((data) => {
    console.log(data);
    console.log("Owner", data[0]);
    console.log("Entry Person", data[1]);
    console.log("Description", data[2]);
    console.log("Milage", data[3]['c'][0]);
    var date = new Date(data[4]['c'][0]*1000);
    console.log("Entry Date", date);



    var ul = document.getElementById("all-data");
    var li = document.createElement("li");
    li.appendChild(document.createTextNode("Date: "+date + " Description: "+data[2]+" Milage: "+data[3]['c'][0]));
    li.classList.add('list-group-item');
    ul.appendChild(li);

    return {'owner':data[0], 'entryPerson':data[1], 'description':data[2],
    'milage':data[3]['c'][0],'date':Date(data[4]['c'][0]*1000)};

    

});
} ,

};

$(function () {
  $(window).load(function () {
    App.init();
  });
});