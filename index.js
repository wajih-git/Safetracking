//Alarm handling
var request2;
//use to send sms
var mobile;
//open safetrackinDB and get the data
// Create app database and database functions
function createDatabase () {
  var dbRequest = window.indexedDB.open('safetrackingDB', 1);

  dbRequest.onupgradeneeded = (event) => {
    var db = event.target.result;
    var objectStore = db.createObjectStore('trackingData', { keyPath: 'id' });
    objectStore.transaction.oncomplete = (event) => {
    assignVariables0(db);
  };
  };
  dbRequest.onsuccess = (event) => {
    var db = event.target.result;
    assignVariables1(db);
  }
  dbRequest.onerror = (event) => {
    statusElement.innerHTML = "Error, re-install the app";
  };
}
// Store app data in the database
function storeTrackingData () {
 // check input against blank fields and replace blank fields with default values
if ((mobileInput.value.length === 0)) {
  statusElement.innerHTML = 'Set mobile number in settings';
}
if ((smsInputx.value.length === 0)) {
  smsInputx.value = '1';
}
if ((smsInputy.value.length === 0)) {
  smsInputy.value = '7';
}
if (smsInputz.value.length === 0) {
  smsInputz.value = '2';
}
if (poinameInput1.value.length === 0) {
  poinameInput1.value = 'NorthPo';
}
if (latInput1.value.length === 0) {
  latInput1.value = '89.99';
}
if (lgInput1.value.length === 0) {
  lgInput1.value = '-135.0';
}
if (poinameInput2.value.length === 0) {
  poinameInput2.value = 'SouthPo';
}
if (latInput2.value.length === 0) {
  latInput2.value = '-89.99';
}
if (lgInput2.value.length === 0) {
  lgInput2.value = '135.0';
}
  
  var data = {
    id: 'record1',
    mobileNumber: mobileInput.value,
    xDB: smsInputx.value,
    yDB: smsInputy.value,
    zDB: smsInputz.value,
    poinameInput1DB: poinameInput1.value,
    poinameInput2DB: poinameInput2.value,
    latInput1DB: latInput1.value,
    lgInput1DB: lgInput1.value,
    latInput2DB: latInput2.value,
    lgInput2DB: lgInput2.value
  };

  const dbRequest = window.indexedDB.open('safetrackingDB', 1);

  dbRequest.onsuccess = function(event) {
    var db = event.target.result;
    var transaction = db.transaction(['trackingData'], 'readwrite');
    var objectStore = transaction.objectStore('trackingData');

    objectStore.put(data);
  };
}

//Function used to assign default values to the variables first time DB opens
function assignVariables0(database) {
  const objectStore = database.transaction("trackingData").objectStore("trackingData");

  objectStore.openCursor().onsuccess = (event) => {
    const cursor = event.target.result;
    if (!cursor) {
      smsInputx.value = 1;
      smsInputy.value = 7;
      smsInputz.value = 2;
      poinameInput1.value = 'NorthPo';
      latInput1.value = 89.99;
      lgInput1.value = -135.0;
      poinameInput2.value = 'SouthPo';
      latInput2.value = -89.99;
      lgInput2.value = 45.0;
      statusElement.innerHTML = 'Check settings';
      var data = {
        id: 'record1',
        mobileNumber: mobileInput.value,
        xDB: smsInputx.value,
        yDB: smsInputy.value,
        zDB: smsInputz.value,
        poinameInput1DB: poinameInput1.value,
        poinameInput2DB: poinameInput2.value,
        latInput1DB: latInput1.value,
        lgInput1DB: lgInput1.value,
        latInput2DB: latInput2.value,
        lgInput2DB: lgInput2.value
      };
      //First initialisation of database with record1 updated with default value
      objectStore.put(data);
    }
  };
}

//Assign variables when the ojectstore has already been created
function assignVariables1(database) {
      const objectStore = database.transaction("trackingData").objectStore("trackingData");
      var getDataRequest = objectStore.get('record1');

      getDataRequest.onsuccess = (event) => {
        var getData = event.target;
        if ((getData.result.mobileNumber.length === 0)) {
          statusElement.innerHTML = 'Set mobile number in settings';
        } else {
          mobileInput.value = getData.result.mobileNumber;
          statusElement.innerHTML = 'Ready to send location to +' + mobileInput.value;
        }
        if ((getData.result.xDB.length === 0)) {
          smsInputx.value = '1';
        } else {
          smsInputx.value = getData.result.xDB;
        }
        if ((getData.result.yDB.length === 0)) {
          smsInputy.value = '7';
        } else {
          smsInputy.value = getData.result.yDB;
        }
        if (getData.result.zDB.length === 0) {
          smsInputz.value = '2';
        } else {
          smsInputz.value = getData.result.zDB;
        }
        if (getData.result.poinameInput1DB.length === 0) {
          poinameInput1.value = 'NorthPo';
        } else {
          poinameInput1.value = getData.result.poinameInput1DB;
        }
        if (getData.result.latInput1DB.length === 0) {
          latInput1.value = '89.99';
        } else {
          latInput1.value = getData.result.latInput1DB;
        }
        if (getData.result.lgInput1DB.length === 0) {
          lgInput1.value = '-135.0';
        } else {
          lgInput1.value = getData.result.lgInput1DB;
        }
        if (getData.result.poinameInput2DB.length === 0) {
          poinameInput2.value = 'SouthPo';
        } else {
          poinameInput2.value = getData.result.poinameInput2DB;
        }
        if (getData.result.latInput2DB.length === 0) {
          latInput2.value = '-89.99';
        } else {
          latInput2.value = getData.result.latInput2DB;
        }
        if (getData.result.lgInput2DB.length === 0) {
          lgInput2.value = '135.0';
        } else {
          lgInput2.value = getData.result.lgInput2DB;
        }      
      };
      getDataRequest.onerror = (event) => {
        smsInputx.value = 1;
        smsInputy.value = 7;
        smsInputz.value = 2;
        poinameInput1.value = 'NorthPo';
        latInput1.value = 89.99;
        lgInput1.value = -135.0;
        poinameInput2.value = 'SouthPo';
        latInput2.value = -89.99;
        lgInput2.value = 45.0;
        statusElement.innerHTML = 'Check settings';
      };  
}


//spare generic function to update input field from DB values
function assignVariables() {
  const dbRequest = window.indexedDB.open('safetrackingDB', 1);
  dbRequest.onsuccess = (event) => {
    var db = event.target.result;
    var transaction = db.transaction(['trackingData'], 'readwrite');
    transaction.oncomplete = () => {
      var objectStore = transaction.objectStore('trackingData');
      var getDataRequest = objectStore.get('record1');

      getDataRequest.onsuccess = (event) => {
        var getData = event.target;
        if ((getData.result.mobileNumber.length === 0)) {
          statusElement.innerHTML = 'Set mobile number in settings';
        } else {
          mobileInput.value = getData.result.mobileNumber;
          statusElement.innerHTML = 'Ready to send location to +' + mobileInput.value;
        }
        if ((getData.result.xDB.length === 0)) {
          smsInputx.value = '1';
        } else {
          smsInputx.value = getData.result.xDB;
        }
        if ((getData.result.yDB.length === 0)) {
          smsInputy.value = '7';
        } else {
          smsInputy.value = getData.result.yDB;
        }
        if (getData.result.zDB.length === 0) {
          smsInputz.value = '2';
        } else {
          smsInputz.value = getData.result.zDB;
        }
        if (getData.result.poinameInput1DB.length === 0) {
          poinameInput1.value = 'NorthPo';
        } else {
          poinameInput1.value = getData.result.poinameInput1DB;
        }
        if (getData.result.latInput1DB.length === 0) {
          latInput1.value = '89.99';
        } else {
          latInput1.value = getData.result.latInput1DB;
        }
        if (getData.result.lgInput1DB.length === 0) {
          lgInput1.value = '-135.0';
        } else {
          lgInput1.value = getData.result.lgInput1DB;
        }
        if (getData.result.poinameInput2DB.length === 0) {
          poinameInput2.value = 'SouthPo';
        } else {
          poinameInput2.value = getData.result.poinameInput2DB;
        }
        if (getData.result.latInput2DB.length === 0) {
          latInput2.value = '-89.99';
        } else {
          latInput2.value = getData.result.latInput2DB;
        }
        if (getData.result.lgInput2DB.length === 0) {
          lgInput2.value = '135.0';
        } else {
          lgInput2.value = getData.result.lgInput2DB;
        }      
    //+'/'+smsInputx.value+'/'+smsInputy.value+'/'+smsInputz.value+'/'+poinameInput1.value+'/'+latInput1.value+'/'+lgInput1.value+'/'+poinameInput2.value+'/'+latInput2.value+'/'+lgInput2.value;
      };
      getDataRequest.onerror = (event) => {
        smsInputx.value = 1;
        smsInputy.value = 7;
        smsInputz.value = 2;
        poinameInput1.value = 'NorthPo';
        latInput1.value = 89.99;
        lgInput1.value = -135.0;
        poinameInput2.value = 'SouthPo';
        latInput2.value = -89.99;
        lgInput2.value = 45.0;
        statusElement.innerHTML = 'Check settings';
      };
    };
  };
}


// Get the mobile number input and start button elements
const statusElement = document.getElementById("status");
// Mobile number input
const mobileInput = document.createElement('input');
mobileInput.type = 'tel';
mobileInput.name = 'mobile';
mobileInput.maxLength = 12;
mobileInput.size = 12;
mobileInput.required = true;

// parent element
var parent = document.getElementById('parent');
parent.type = 'text';  

// SMS number input 
const smsInputx = document.createElement('input');
smsInputx.type = 'tel';
smsInputx.name = 'smsNum';
smsInputx.size = 1;
smsInputx.maxLength = 1;


const smsInputy = document.createElement('input');
smsInputy.type = 'tel';
smsInputy.name = 'smsNum'; 
smsInputy.maxLength = 1;
smsInputy.size = 1;

const smsInputz = document.createElement('input');
smsInputz.type = 'tel';
smsInputz.name = 'smsNum'; 
smsInputz.maxLength = 1;
smsInputz.size = 1;

//Point of interest input
const poinameInput1 = document.createElement('input');
poinameInput1.type = 'text';
poinameInput1.name = 'name';
poinameInput1.size = 7;

const poinameInput2 = document.createElement('input');
poinameInput2.type = 'text';
poinameInput2.name = 'name';
poinameInput2.size = 7;

const latInput1 = document.createElement('input');
latInput1.type = 'tel';
latInput1.min = -90;
latInput1.max = 90;
latInput1.maxLength = 9; // Allow minus sign
latInput1.size = 9;

const lgInput1 = document.createElement('input');
lgInput1.type = 'tel';
lgInput1.min = -180;
lgInput1.max = 180;
lgInput1.maxLength = 9; // Allow minus sign
lgInput1.size = 9;

const latInput2 = document.createElement('input');
latInput2.type = 'tel';
latInput2.min = -90;
latInput2.max = 90;
latInput2.maxLength = 9; // Allow minus sign
latInput2.size = 9;

const lgInput2 = document.createElement('input');
lgInput2.type = 'tel';
lgInput2.min = -180;
lgInput2.max = 180;
lgInput2.maxLength = 9; // Allow minus sign
lgInput2.size = 9;

// Label for mobile input
const mobileLabel = document.createElement('label');
mobileLabel.textContent = 'Send location gps by SMS to mobile number:+';

// Label for sms input
const smsLabelx = document.createElement('label');
smsLabelx.textContent = ' every 4min for ';

const smsLabely = document.createElement('label');
smsLabely.textContent = ' hour(s),then every 40min for ';

const smsLabelz = document.createElement('label');
smsLabelz.textContent = ' hour(s),finally every 4min for';

const smsLabellast = document.createElement('label');
smsLabellast.textContent = ' hour(s). GPS coordinates are within 10m to 50m accuracy depending on location.';

//label for point of interest input
const poinameLabel = document.createElement('label');
poinameLabel.textContent = 'Optionally define 2 places of interest. Your first is called:'

const lat1label= document.createElement('label');
lat1label.textContent = 'with a GPS latitude of: ';

const lg1label= document.createElement('label');
lg1label.textContent = 'and GPS longitude of: ';

const poinameLabel2 = document.createElement('label');
poinameLabel2.textContent = '.Your 2nd is called:'

const lat2label= document.createElement('label');
lat2label.textContent = 'with a GPS latitude of: ';

const lg2label= document.createElement('label');
lg2label.textContent = 'and a GPS longitude of: ';



//GPS variables
var request;
var options = {
  enableHighAccuracy: true,
  timeout: 240000,
  maximumAge: 60000
};

let targetLat;
let targetLng;
var destReached = false
var datenow = new Date();
var xHourFromNow = new Date();
var yHourFromNow;
var zHourFromNow;
var isInstructions = false;
var isStartmenu = true;
var isSettings = false;
var isSettings2 = false; //set places page

const icon = document.getElementById('icon');
icon.style.backgroundColor = '#F00'; // Set background color to red
icon.style.backgroundImage = 'linear-gradient(to bottom, #F00 0%, #F2F2F2 100%)'; // Set red gradient
var isRed = true;

//Function to assess distance to destination. Returns 1 if within 50m 0 if not
function isWithin50m(targetLat, targetLng, destLat, destLng) {
   // Validate latitude range
  if (destLat < -90 || destLat > 90) {
    return false; 
  }
  
  // Validate longitude range
  if (destLng < -180 || destLng > 180) {
      return false;
  }
  // Calculate distance between points using haversine formula
  const radius = 6371e3; // Earth radius in meters
  const latDelta = toRadians(destLat - targetLat);
  const lonDelta = toRadians(destLng - targetLng);

  const a = Math.sin(latDelta/2) * Math.sin(latDelta/2) +
          Math.cos(toRadians(targetLat)) * Math.cos(toRadians(destLat)) *
          Math.sin(lonDelta/2) * Math.sin(lonDelta/2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  const distance = radius * c;

  // Compare distance to threshold
  return distance <= 50; 
}

// Helper function to convert degrees to radians
function toRadians(degrees) {
  return degrees * Math.PI / 180;
}

//launch app function
function launchSelf() {
  var request3 = window.navigator.mozApps.getSelf();
  request3.onsuccess = function() {
    if (request3.result) {
      request3.result.launch();
    }
  };
}

//GPS functions
function success(pos) {
  var crd = pos.coords;
  mobile = '+' + mobileInput.value.toString();
 if (isWithin50m(crd.latitude, crd.longitude, latInput1.value, lgInput1.value)) {
    if (!destReached){
      navigator.mozMobileMessage.send(mobile, "I'm at " + poinameInput1.value +". I will now pause sending location until I'm more than 40m away from here.").then(id => {
      // Have to handle in callback  
      navigator.mozMobileMessage.delete(id); 
    });
    }
    destReached = true;
  } else if (isWithin50m(crd.latitude, crd.longitude, latInput2.value, lgInput2.value)) {
    if (!destReached){
    navigator.mozMobileMessage.send(mobile, "I'm at " + poinameInput2.value +". I will now pause sending location until I'm more than 40m away from here.").then(id => {
      // Have to handle in callback
      navigator.mozMobileMessage.delete(id);
    });
    }
   destReached = true;
  } else {
  navigator.mozMobileMessage.send(mobile, "https://maps.google.com/?q="+crd.latitude+","+crd.longitude).then(id => {
    // Have to handle in callback  
    navigator.mozMobileMessage.delete(id); 
  });
  destReached = false;
  }
}

function error(err) {
  //Reset dest reached variable to force location to be sent next time position is called
  destReached = false;
  mobile = '+' + mobileInput.value.toString();
  if(err.code == 1) {
    navigator.mozMobileMessage.send(mobile, 'Allow the app to access your location all the time on the device where the app is installe').then(id => {
      // Have to handle in callback  
      navigator.mozMobileMessage.delete(id); 
    });
  } else if(err.code == 2) {
    navigator.mozMobileMessage.send(mobile, 'Unable to access the GPS system at this time. I will try again').then(id => {
      // Have to handle in callback  
      navigator.mozMobileMessage.delete(id); 
    });
  } else {
    navigator.mozMobileMessage.send(mobile, err.message).then(id => {
      // Have to handle in callback  
      navigator.mozMobileMessage.delete(id); 
    });
  }
}

function sendsms() {
  statusElement.innerHTML = 'sending location to ' +mobileInput.value.toString(); 
  // + mobileNumberInput.value;
  //try {
  navigator.geolocation.getCurrentPosition(success, error, { enableHighAccuracy: true, timeout: 240000, maximumAge: 60000 });
  request2 = navigator.mozAlarms.add(new Date((+new Date()) + 30000), 'ignoreTimezone');
  request2.onerror = function () {
    statusElement.innerHTML = "Error. Restart the app";
  };
}

function addMobileNumberInput() {

// Parent element

// Append inputs and labels 
parent.appendChild(mobileLabel);
parent.appendChild(mobileInput);

parent.appendChild(smsLabelx);
parent.appendChild(smsInputx);

parent.appendChild(smsLabely);
parent.appendChild(smsInputy);

parent.appendChild(smsLabelz);
parent.appendChild(smsInputz);

parent.appendChild(smsLabellast);

  // Focus input
  mobileInput.focus();
}

function addPlaces() {
// Create set places page in settings

parent.appendChild(poinameLabel);
parent.appendChild(poinameInput1);

parent.appendChild(lat1label);
parent.appendChild(latInput1);

parent.appendChild(lg1label);
parent.appendChild(lgInput1);

parent.appendChild(poinameLabel2);
parent.appendChild(poinameInput2);

parent.appendChild(lat2label);
parent.appendChild(latInput2);

parent.appendChild(lg2label);
parent.appendChild(lgInput2);
  // Focus input
  poinameInput1.focus();
  poinameInput1.select();
}


function sendLocationForOneHour() {
  var count = 0;
  var count2 = 100;
  destReached = false;
  //icon
  icon.style.backgroundColor = '#008000'; // Set background color to green
  icon.style.backgroundImage = 'linear-gradient(to bottom, #008000 0%, #F2F2F2 100%)'; // Set green gradient
  document.getElementById("text").textContent = "ON";
  document.getElementById("center").textContent = "STOP"; 
  isRed = false;
//icon
  xHourFromNow = new Date((+new Date()) + (smsInputx.value * 60 * 60 * 1000));
  yHourFromNow = new Date((+xHourFromNow) + (smsInputy.value * 60 * 60 * 1000));
  zHourFromNow = new Date((+yHourFromNow) + (smsInputz.value * 60 * 60 * 1000));
  //yHourFromNow = new Date((+new Date()) + ((smsInputx.value * 60 * 60 * 1000)+(smsInputy.value * 60 * 60 * 1000)));
  //zHourFromNow = new Date((+new Date()) + (smsInputx.value+smsInputy.value+smsInputz.value) * 60 * 60 * 1000);

  statusElement.innerHTML = 'Sending location to +' + mobileInput.value;
  //delete all alarms
  var allAlarms = navigator.mozAlarms.getAll();
  allAlarms.onsuccess = function() {
    // Remove all pending alarms
    this.result.forEach(function(alarm) {
      var removeRequest = navigator.mozAlarms.remove(alarm.id);
      //if unable to remove alarms, avoid exponential SMS loops being generated
      removeRequest.onerror = function() {
        statusElement.innerHTML = "Critical error, restart the app";
        throw new Error("Critical error");
      };
  
    });
  };
  //Call a critical error and stop the app alarms could get cleared
  allAlarms.onerror = function() {
        statusElement.innerHTML = "Critical error, restart the app";
        throw new Error("Critical error");
      };

  //Create alarm  
  request2 = navigator.mozAlarms.add(new Date((+new Date()) + 30000), 'ignoreTimezone');
  navigator.mozSetMessageHandler('alarm', function() {
    //delete all pending alarms before setting new ones to avoid doubling alarms after unexpeceted shutdown
    var leftOverAlarms = navigator.mozAlarms.getAll();
    leftOverAlarms.onsuccess = function() {
      // Remove all pending alarms
      this.result.forEach(function(alarm) {
        var remove = navigator.mozAlarms.remove(alarm.id);
        //if unable to remove alarms, avoid exponential SMS loops being generated
        remove.onerror = function() {
          statusElement.innerHTML = "Critical error, restart the app";
          throw new Error("Critical error");
        };
      });
    };

    if (count < 8 || count2 < 80) {
      count++;
      count2++;
      wakelock = navigator.requestWakeLock('gps');
      request2 = navigator.mozAlarms.add(new Date((+new Date()) + 30000), 'ignoreTimezone');
      //finish the middle cycle if time for last interval has started
      datenow = new Date();
      if ((datenow >= yHourFromNow) && (datenow <= zHourFromNow)) {
        count2 =80;
      }
    } else {
      count = 0;
      datenow = new Date();
      //send sms every 4min if time between first or last interval
      if ((datenow <= xHourFromNow) || ((datenow >= yHourFromNow) && (datenow <= zHourFromNow))) {
        //launchSelf();
        wakelock = navigator.requestWakeLock('gps');      
        setTimeout(function () {
        sendsms();
        }, 2.0 * 1000);
        //send sms every 40 min if time within middle interval
      } else if ((datenow > xHourFromNow) && (datenow < yHourFromNow)) {
        count = 10;
        count2 = 0;
        wakelock = navigator.requestWakeLock('gps');      
        setTimeout(function () {
        sendsms();
        }, 2.0 * 1000);
        //exit app if time after last interval
      } else {
        //launch app for icon change to take effect
        launchSelf();
        mobile = '+' + mobileInput.value.toString();
        navigator.mozMobileMessage.send(mobile, "The Safetracking service has now automatically stopped and will stop sending GPS location. Re-start the service on the app when needed.").then(id => {
          // Have to handle in callback  
          navigator.mozMobileMessage.delete(id); 
        });
        icon.style.backgroundColor = '#F00'; // Set background color to red
        icon.style.backgroundImage = 'linear-gradient(to bottom, #F00 0%, #F2F2F2 100%)'; // Set red gradient
        isRed = true;
        document.getElementById("text").textContent = "OFF";
        document.getElementById("center").textContent = "START";
        statusElement.innerHTML = 'Ready to send location to' + mobileInput.value;
        //clear all alarms
        allAlarms = navigator.mozAlarms.getAll();
        allAlarms.onsuccess = function() {
            this.result.forEach(function(alarm) {
            var removeRequest2 = navigator.mozAlarms.remove(alarm.id);
            //if unable to remove alarms, avoid exponential SMS loops being generated
            removeRequest2.onerror = function() {
            statusElement.innerHTML = "Critical error, restart the app";
            throw new Error("Critical error");
            };
           });
          };
        allAlarms.onerror = function() {
        statusElement.innerHTML = "Critical error, restart the app";
            throw new Error("Critical error");
        }; 
        //set global start variable to false to bring app to stop state
        start = false;
        wakeLock.unlock(); 
      }
    }
    });
}

function stopSendingLocation() {
  statusElement.innerHTML = 'Stopped sending location to +' + mobileInput.value;
  //Icon Red
  icon.style.backgroundColor = '#F00'; // Set background color to red
  icon.style.backgroundImage = 'linear-gradient(to bottom, #F00 0%, #F2F2F2 100%)'; // Set red gradient
  document.getElementById("text").textContent = "OFF";
  document.getElementById("center").textContent = "START"; 
  isRed = true;
  //icon

  //clear all alarms
  allAlarms = navigator.mozAlarms.getAll();
  allAlarms.onsuccess = function() {
      this.result.forEach(function(alarm) {
      var removeRequest = navigator.mozAlarms.remove(alarm.id);
      //if unable to remove alarms, avoid exponential SMS loops being generated
      removeRequest.onerror = function() {
      statusElement.innerHTML = "Critical error, restart the app";
      throw new Error("Critical error");
      };
     });
    };
  allAlarms.onerror = function() {
  statusElement.innerHTML = "Critical error, restart the app";
      throw new Error("Critical error");
  }; 
  wakeLock.unlock();
}

//Main program execution
createDatabase();
//Reset icon colours and state
//Icon Red
icon.style.backgroundColor = '#F00'; // Set background color to red
icon.style.backgroundImage = 'linear-gradient(to bottom, #F00 0%, #F2F2F2 100%)'; // Set red gradient
document.getElementById("text").textContent = "OFF";
document.getElementById("center").textContent = "START";

//initialise start button
var start = false;
// Start sending SMS messages when the start button is pressed
//Send first GPS location to request location permission
navigator.geolocation.getCurrentPosition(success, error, options);
var wakelock = navigator.requestWakeLock('gps');
document.addEventListener("keydown", (event) => {
  switch (event.key) {
  case "Enter":
    if (isStartmenu){
      if (!start) {
        start = true;
        sendLocationForOneHour();
      }else if (start) {
        start = false;
        stopSendingLocation();
      }
      isInstructions = false;
      isStartmenu = true;
      isSettings = false;
    }
      //exit even listener
    break;
    case "ArrowUp":
      if (isStartmenu) {
        if (!start) {
          start = true;
          sendLocationForOneHour();
        }else if (start) {
          start = false;
          stopSendingLocation();
        } 
        isInstructions = false;
        isStartmenu = true;
        isSettings = false;
      }else if (isSettings) {
        // Shift focus up
         if(document.activeElement === smsInputz) {
           smsInputy.focus();
           smsInputy.select();
         } else if(document.activeElement === smsInputy) {
           smsInputx.focus();
           smsInputx.select();
         } else if(document.activeElement === smsInputx) {
           mobileInput.select();
         } else if(document.activeElement === mobileInput) {
           smsInputz.focus();
           smsInputz.select();
         }
       }else if (isSettings2) {
         if(document.activeElement === lgInput2) {
           latInput2.focus();
           latInput2.select();
         } else if(document.activeElement === latInput2) {
          poinameInput2.select();
          poinameInput2.focus();
         } else if(document.activeElement === poinameInput2) {
           lgInput1.focus();
           lgInput1.select();
         } else if(document.activeElement === lgInput1) {
           latInput1.focus();
           latInput1.select();
         } else if(document.activeElement === latInput1) {
           poinameInput1.focus();
           poinameInput1.select();
         } else if(document.activeElement === poinameInput1) {
           lgInput2.focus();
           lgInput2.select();
         }
       }
    //exit even listener
    break;
    case "ArrowDown":
      if (isStartmenu) { 
        if (!start) {
          start = true;
          sendLocationForOneHour();
        }else if (start) {
          start = false;
          //stop sending location
          stopSendingLocation();
        }
        isInstructions = false;
        isStartmenu = true;
        isSettings = false;
      }else if (isSettings) {
        if(document.activeElement === mobileInput) {
          smsInputx.focus();
          smsInputx.select();
        } else if(document.activeElement === smsInputx) {
          smsInputy.focus();
          smsInputy.select();
        } else if(document.activeElement === smsInputy) {
        smsInputz.focus();
        smsInputz.select();
        } else if(document.activeElement === smsInputz) {
          mobileInput.focus(); 
          mobileInput.select();
        }
      }else if (isSettings2) {
        if(document.activeElement === poinameInput1) {
          latInput1.focus();
          latInput1.select();
        } else if(document.activeElement === latInput1) {
          lgInput1.focus();
          lgInput1.select();
        }else if(document.activeElement === lgInput1) {
          poinameInput2.focus();
          poinameInput2.select();
        } else if(document.activeElement === poinameInput2) {
          latInput2.focus();
          latInput2.select();
        } else if(document.activeElement === latInput2) {
          lgInput2.focus();
          lgInput2.select();
        } else if(document.activeElement === lgInput2) {
          poinameInput1.focus(); 
          poinameInput1.select();
        }
      }
      break;
    case "SoftLeft":
      if (isStartmenu) {
        //Delete icon
        icon.style.display = 'none';
        //Go to instruction menu and update content
        statusElement.textContent = "When the service is started the phone will send location coordinates by SMS to the provided mobile number for the duration defined in settings. Make sure the phone number is entered correctly starting with the country code. Check you mobile provider for cost of SMS. We strongly advise to use unlimited SMS plans. Cost of SMS is the responsibilty of the user.";
        document.getElementById("center").textContent = ""; 
        document.getElementById("left").textContent = "Back"; 
        document.getElementById("right").textContent = "";
        isStartmenu = false;
        isInstructions = true;
        isSettings = false;
      } else if (isInstructions || isSettings || isSettings2) {
        //Remove status text
        statusElement.textContent = "";
        //Reset icon colours and state
        //Icon Red
        icon.style.display = 'block';
        document.getElementById("parent").textContent = "";
        if (isRed) {
          document.getElementById("text").textContent = "OFF";
          document.getElementById("center").textContent = "START";
          statusElement.innerHTML = 'Ready to send location to +' + mobileInput.value;
        }
        else {
          document.getElementById("text").textContent = "ON";
          document.getElementById("center").textContent = "STOP";
        }
        document.getElementById("right").textContent = "Settings";
        document.getElementById("left").textContent = "Instructions";
        isInstructions = false;
        isStartmenu = true;
        isSettings = false;
        storeTrackingData();
      }
      //exit even listener
      break;  
    case "SoftRight":
      if (isStartmenu) {
       //Delete icon
       icon.style.display = 'none';
       //Update status text
       statusElement.textContent = "Your app settings:";
       // Add the mobile number input instruction
       addMobileNumberInput();
       //Update bottom app controls
       document.getElementById("center").textContent = ""; 
       document.getElementById("left").textContent = "Back"; 
       document.getElementById("right").textContent = "Set places";
    
       isStartmenu = false;
       isSettings = true;
       isInstructions = false;
      } else if (isSettings) {
       //Update status text
       statusElement.textContent = "Set places of interest using decimal GPS coordinates:";
        //clear existing input
        document.getElementById("parent").removeChild(mobileLabel);
        
        document.getElementById("parent").removeChild(smsLabelx);
        document.getElementById("parent").removeChild(smsInputx);
        
        document.getElementById("parent").removeChild(smsLabely);
        document.getElementById("parent").removeChild(smsInputy);

        document.getElementById("parent").removeChild(smsLabelz);
        document.getElementById("parent").removeChild(smsInputz);
        document.getElementById("parent").removeChild(smsLabellast);


        parent.type = 'text';
        addPlaces();
        document.getElementById("parent").removeChild(mobileInput);

        isSettings2 = true;
        isSettings = false;
        //Update bottom app controls
        document.getElementById("center").textContent = ""; 
        document.getElementById("left").textContent = "Back"; 
        document.getElementById("right").textContent = "";        
      }
      break;
    //ignore other keys
    default:
      return;
    //close event listener function
  }
});
