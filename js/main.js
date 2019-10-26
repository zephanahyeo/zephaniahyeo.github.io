


//section 1: firebase-related code
{
//---------------------------------------
//INITIALIZING FIREBASE:
var firebaseConfig = {
    apiKey: "AIzaSyA-9dcG-Jti9BzZeEH8IHTKw03nlxepeyU",
    authDomain: "reservation-site-89d63.firebaseapp.com",
    databaseURL: "https://reservation-site-89d63.firebaseio.com",
    projectId: "reservation-site-89d63",
    storageBucket: "reservation-site-89d63.appspot.com",
    messagingSenderId: "672905674819",
    appId: "1:672905674819:web:b57e882af7b8c04f5654f6",
    measurementId: "G-4R16KWYZFK"
};

firebase.initializeApp(firebaseConfig);

//shortcuts
var database = firebase.database();
var ref = firebase.database().ref('reservations');

//MAKING RESERVATIONS:

// reservation data saved here
var reservationData = {
	name: null,
	day: null
};

// saves the "day" field into the reservationData variable on selection
$('.reservation-day li').on('click', function(){
	reservationData.day = $(this).text();
	//replaces the text in the toggle menu with the selected day
	$('.dropdown-toggle').text(reservationData.day);
});

// saves the "name" field and uploads to Firebase on "make reservation" button press
$('.reservation-button').on('click', function(e){
	e.preventDefault();
//retrieving the name from text input field
    reservationData.name = $('.reservation-name').val();   
//checking to see if the name and date have been entered
    if ((reservationData.day !== null) && (reservationData.name !== "")) {  
//uploading to Firebase
      ref.push(reservationData);
    } else {
    alert('Please enter a name and a date.');
  }
});



//RETRIEVING RESERVATIONS FROM FIREBASE:



ref.on("value", function(results) {
   	var resData = results.val();
   	var data = [];

    //clears list
    $('#reservation-list').empty();

   	for (var item in resData){
   		var context = {
   			name: resData[item].name,
   			day: resData[item].day
   		}
   		var source = $('#reservation-template').html();
   		var template = Handlebars.compile(source);
   		var resListData = template(context);
   		data.push(resListData);
   	}

   	for (var i in data) {
   		$('#reservation-list').append(data[i]);
   	}
}, function (error) {
   console.log("Error: " + error.code);
});


//----------------------------------------
}

//section 2: google maps-related code
{
//-----------------------------------------

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 24.0179867, lng: 121.6377793},
    zoom: 13,
    scrollwheel: false,
          styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#263c3f'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#6b9a76'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#2f3948'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#17263c'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#515c6d'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
            }
          ]
        });
  var marker = new google.maps.Marker({
    position: {lat: 24.0179867, lng: 121.6377793},
    map: map,
    title: 'Cat & Weasel'
  });
}

//--------------------------------------
}

//section 3: check time

var today = new Date();

if ((today.getHours() >= 12) && (today.getDay() === 0 || today.getDay() >= 2)) {
  $('#open-status').text("hours: 12 pm to 12 am Tuesdays through Sundays (open now!)");
} else {
  $('#open-status').text("hours: 12 pm to 12 am Tuesdays through Sundays (be back after lunch)");
}