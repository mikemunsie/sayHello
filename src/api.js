"use strict";

import _ from "lodash";

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


export default class Api {

	constructor() {
		this.currentUserId = ""
		this.geoFire = globalGeoFire
		this.geoQuery = null
		this.usersInArea = {}
	}

	setCurrentUserId(userId) {
		this.currentUserId = userId
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
		this.geoFire.set(userId || this.currentUserId, [lat, long])

		if (!userId) {
			if (this.geoQuery) {
				this.geoQuery.updateCriteria({
					center: [lat, long]
				})
			} else {
				this.geoQuery = globalGeoFire.query({
	  				center: [lat, long],
	  				radius: 1000
				});

				var onReadyRegistration = this.geoQuery.on("ready", () => {
				  console.log("GeoQuery has loaded and fired all other events for initial data");
				});

				var onKeyEnteredRegistration = this.geoQuery.on("key_entered", (key, location, distance) => {
				  console.log(key + " entered query at " + location + " (" + distance + " km from center)");

				  if (!this.usersInArea[key]) {
				  	this.usersInArea[key] = {}
				  }

				  const entry = this.usersInArea[key]

				  this.getUser(key).then((user) => {
				  	entry['distance'] = distance
				  	entry['user'] = user
				  	entry['id'] = key
				  })


				});

				var onKeyExitedRegistration = this.geoQuery.on("key_exited", (key, location, distance) => {
				  console.log(key + " exited query to " + location + " (" + distance + " km from center)");

				  delete this.usersInArea[key]

				});

				var onKeyMovedRegistration = this.geoQuery.on("key_moved", (key, location, distance) => {
				  console.log(key + " moved within query to " + location + " (" + distance + " km from center)");

				  this.usersInArea[key]['distance'] = distance
				});
			}
			
		}
		
	}

	getUsersInArea() {
		var users = _.values(this.usersInArea)
		_.remove(users, (user) => {
			_.keys(user).length === 0
		})

		return users
	}

	getUser(userId) {
		return usersRef.child(userId).once('value').then((snapshot) => snapshot.val())
	}

	getCurrentUser() {
		return getUser(this.currentUserId)
	}

}
