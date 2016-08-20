"use strict";

const firebase = require('firebase');
const GeoFire = require('geofire');

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAZQ5NYLKX0CJ2k3mIaHkYQXjMyAM2G2oY",
    authDomain: "sayhello-bde3e.firebaseapp.com",
    databaseURL: "https://sayhello-bde3e.firebaseio.com",
    storageBucket: "sayhello-bde3e.appspot.com",
  };

const firebaseApp = firebase.initializeApp(config);

const databaseRef = firebaseApp.database().ref();

const usersRef = databaseRef.child("users")

const globalGeoFire = new GeoFire(databaseRef.child("locations"))


class Api {

	constructor() {
		this.currentUserId = ""
		this.geoFire = globalGeoFire
		this.geoQuery = null
		this.usersInArea = {}
	}

	createUser(user) {
		var postUser = {
			pic: user.pic || null,
  			name: user.name || null,
			phone: user.phone || null,
			email: user.email || null,
			website: user.website || null,
			profession: user.profession || null,
			title: user.title || null,
			social: {
				twitter: user && user.social && user.social.twitter || null,
			    linkedIn: user && user.social && user.social.linkedIn || null
		  	}
		}

		return usersRef.push(postUser)
	}

	pulseMyLocation(lat, long) {
		pulse(lat, long)
	}

	pulse(lat, long, userId) {
		console.log("pulsing %s %s %s", lat, long, userId)
		var gf = globalGeoFire
		// gf.set("location", [lat, long])
		gf.set(userId || this.currentUserId, [lat, long])

		if (!userId) {
			if (this.geoQuery) {
				this.geoQuery.updateCriteria({
					center: [lat, long],
  					radius: 100
				})
			} else {
				this.geoQuery = globalGeoFire.query({
	  				center: [lat, long],
	  				radius: 10
				});

				var self = this;
				var onReadyRegistration = this.geoQuery.on("ready", function() {
				  console.log("GeoQuery has loaded and fired all other events for initial data");
				});

				var onKeyEnteredRegistration = this.geoQuery.on("key_entered", function(key, location, distance) {
				  console.log(key + " entered query at " + location + " (" + distance + " km from center)");

				  this.usersInArea[key] || this.usersInArea[key] = {}
				  def entry = this.usersInArea[key]
				  
				  getUser(key).then((user) => {
				  	entry['distance'] = distance
				  	entry['user'] = user
				  	entry['id'] = key
				  })


				});

				var onKeyExitedRegistration = this.geoQuery.on("key_exited", function(key, location, distance) {
				  console.log(key + " exited query to " + location + " (" + distance + " km from center)");

				  delete this.usersInArea[key]

				});

				var onKeyMovedRegistration = this.geoQuery.on("key_moved", function(key, location, distance) {
				  console.log(key + " moved within query to " + location + " (" + distance + " km from center)");

				  this.usersInArea[key].distance = distance
				});
			}
			
		}
		
	}

	getUsersInArea() {
		var list = []
		for (key in this.usersInArea) {
			list.push(this.usersInArea[key])
		}

		return list
	}

	getUser(userId) {
		usersRef.child(userId).once('value').then((snapshot) => snapshot.val())
	}

	getCurrentUser() {
		getUser(this.currentUserId)
	}

	setCurrentUserId(userId) {
		this.currentUserId = userId
		this.geoFire = new GeoFire(usersRef.child(userId))
	}
}

var api = new Api()

const name = "victor" + new Date().getTime()
var userId = api.createUser({name: name}).key
var userId2 = api.createUser({name: "Person2" + new Date().getTime()}).key
var userId3 = api.createUser({name: "Person3" + new Date().getTime()}).key


api.setCurrentUserId(userId)

api.pulse(10.223, 11.1323)

var count = 0
setInterval(() => {
	api.pulse(10.23 + count, 11.1233 + count, userId2)
	api.pulse(0 + count, 0 + count, userId3)

	count++
}, 500);


