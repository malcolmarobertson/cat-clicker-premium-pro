var model = {
  currentCat: null,
  cats: [
    {
      name: 'Socks',
      catImageUrl: 'images/cat.jpg',
      clicks: 0   
    },
    {
      name: 'Shoes',
      catImageUrl: 'images/cat2.jpg',
      clicks: 0   
    },
    {
      name: 'Hats',
      catImageUrl: 'images/cat3.jpg',
      clicks: 0   
    },
    {
      name: 'Jocks',
      catImageUrl: 'images/cat4.jpg',
      clicks: 0   
    },
    {
      name: 'Claws',
      catImageUrl: 'images/cat5.jpg',
      clicks: 0   
    }
  ]  
}

var octopus = {
  init: function() {
    model.currentCat = model.cats[0];
    
    catListView.init();
    catView.init();
    adminView.init();
  },
  
  getCurrentCat: function() {
    return model.currentCat;
  },
  
  getCats: function() {
    return model.cats;
  },
  
  setCurrentCat: function(cat) {
    model.currentCat = cat;
  },
  
  incrementCounter: function() {
    model.currentCat.clicks++;
    catView.render();
  }
};

var catView = {
  
  cvCanvas: null,
  cvCanvasCtx: null,
  
  init: function() {
    cvCanvas = document.querySelector("#c");
    cvCanvasCtx = cvCanvas.getContext("2d");
    cvCanvasCtx.font = "36pt Impact";
    cvCanvasCtx.textAlign = "center";     
    cvCanvasCtx.fillStyle = "white"; 
    cvCanvasCtx.strokeStyle= "black";
    cvCanvasCtx.lineWidth = 3;  
    
    cvCanvas.addEventListener('click', function(e) {
    	octopus.incrementCounter();
    });
    
    this.render();
  },
  
  render: function() {
    var currentCat = octopus.getCurrentCat();
    
    var image = new Image();
    image.src = currentCat.catImageUrl;
    image.onload = function() {           
      cvCanvasCtx.drawImage(image, 0, 0, cvCanvas.width, cvCanvas.height);    
      cvCanvasCtx.fillText('Clicks: ' + currentCat.clicks, cvCanvas.width / 2, 50);
      cvCanvasCtx.strokeText('Clicks: ' + currentCat.clicks, cvCanvas.width / 2, 50);
      cvCanvasCtx.fillText(currentCat.name, cvCanvas.width / 2, cvCanvas.height - 14);
      cvCanvasCtx.strokeText(currentCat.name, cvCanvas.width / 2, cvCanvas.height - 14);          
    }
  }
}

var catListView = {
  init: function() {
    this.catListElem = document.getElementById('cat-list');
       
    this.render();
  },
  
  render: function() {
    
    var cat, elem, i;
    
    var cats = octopus.getCats();
    
    this.catListElem.innerHTML = '';
    
    for (i = 0; i < cats.length; i++) {
      
      cat = cats[i];
      elem = document.createElement('li');
      elem.textContent = cat.name;
      elem.addEventListener('click', (function(cat) {
          return function() {              
              octopus.setCurrentCat(cat);
              catView.render();
          };
      })(cat));
      
      this.catListElem.appendChild(elem);   
    };    
  }
};             

var adminView = {
	
  init: function() {
    this.adminViewElem = document.getElementById('admin-area');
       
    this.render();
  },
  
  render: function() {
    var adminButtonElem = document.createElement('button');
    adminButtonElem.textContent = "Admin";
    adminButtonElem.addEventListener('click', function(e) {
      adminView.showAdmin();
    });
    
    this.adminViewElem.innerHTML = '';
    
    this.adminViewElem.appendChild(adminButtonElem);    
  },
  
  showAdmin: function() {
  	
  	var currentCat = octopus.getCurrentCat();
  	var br = document.createElement('br');
  	
  	this.adminViewElem.innerHTML = '';
  	
  	var adminInputName = document.createElement('input');
  	adminInputName.setAttribute('id', 'inputName');
  	adminInputName.value = currentCat.name;
  	this.adminViewElem.appendChild(adminInputName);    
  	//this.adminViewElem.appendChild(br);    
  	
  	var adminInputUrl = document.createElement('input');
  	adminInputUrl.setAttribute('id', 'inputUrl');
  	adminInputUrl.value = currentCat.catImageUrl;
  	this.adminViewElem.appendChild(adminInputUrl);    
  	//this.adminViewElem.appendChild(br);    
  	
  	var adminInputClicks = document.createElement('input');
  	adminInputClicks.setAttribute('id', 'inputClicks');
  	adminInputClicks.value = currentCat.clicks;
  	this.adminViewElem.appendChild(adminInputClicks);    
  	this.adminViewElem.appendChild(br);    
  	
  	var saveButtonElem = document.createElement('button');
    saveButtonElem.textContent = "Save";
    saveButtonElem.addEventListener('click', function(e) {
      adminView.saveCatDetails();
      catListView.render();
      catView.render();
      adminView.render();
    });
    
    this.adminViewElem.appendChild(saveButtonElem);    
    
    var cancelButtonElem = document.createElement('button');
    cancelButtonElem.textContent = "Cancel";
    cancelButtonElem.addEventListener('click', function(e) {
      adminView.render();
    });
    
    this.adminViewElem.appendChild(saveButtonElem);     	
  	
  },
  
  saveCatDetails: function() {
  	
  	var adminInputName = document.getElementById('inputName');
  	var adminInputUrl = document.getElementById('inputUrl');
  	var adminInputClicks = document.getElementById('inputClicks');
  	
  	var updateCat = octopus.getCurrentCat();
  	updateCat.name = adminInputName.value;
  	updateCat.catImageUrl = adminInputUrl.value;
  	updateCat.clicks = adminInputClicks.value;
  	
  	octopus.setCurrentCat(updateCat);
  	
  }
  
  
};             

octopus.init();

