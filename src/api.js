"use strict";

import _ from "lodash";
import EventEmitter from 'events';

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
const pendingsRef = databaseRef.child("pending")
const contactsRef = databaseRef.child("contacts")


const globalGeoFire = new GeoFire(databaseRef.child("locations"))


class Api extends EventEmitter {

	constructor() {
		super();

		this.AREA_CHANGED_EVENT = "api_area_changed"
		this.ON_ENTER_EVENT = "api_on_enter"
		this.ON_EXIT_EVENT = "api_on_exit"
		this.ON_MOVED_EVENT = "api_on_moved"
		this.REQUEST_CONTACT_EVENT = "api_request_contact"
		this.CONTACT_ADDED_EVENT = "api_contact_added"
		this.currentUserId = ""
		this.geoFire = globalGeoFire
		this.geoQuery = null
		this.usersInArea = {}
		this.pendingsRef = null
		this.contactsRef = null
	}


	setCurrentUserId(userId) {
		this.currentUserId = userId
		this.myRef = usersRef.child(userId)
		this.pendingsRef = pendingsRef.child(userId)
		this.contactsRef = contactsRef.child(userId)

		this.listenToPendingRequests_()
		this.listenToAddedContacts_()
	}

	getCurrentUser() {
		return this.getUser(this.currentUserId)
	}

	getUser(userId) {
		return usersRef.child(userId).once('value').then((snapshot) => snapshot.val())
	}

	createUser(user) {
		return usersRef.push(this.getUserData_(user))
	}

	updateMyUser(user) {
		return usersRef.child(userId).update(getUserData_(user))
	}

	updateUser(userId, user) {
		return usersRef.child()
	}

	getUserData_(user) {
		return {
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

				  	this.emit(this.ON_ENTER_EVENT, entry)
				  });
				});

				var onKeyExitedRegistration = this.geoQuery.on("key_exited", (key, location, distance) => {
				  console.log(key + " exited query to " + location + " (" + distance + " km from center)");

				  const entry = this.usersInArea[key]
				  delete this.usersInArea[key]

				  this.emit(this.ON_EXIT_EVENT, entry)
				});

				var onKeyMovedRegistration = this.geoQuery.on("key_moved", (key, location, distance) => {
				  console.log(key + " moved within query to " + location + " (" + distance + " km from center)");

				  const entry = this.usersInArea[key]
				  entry['distance'] = distance

				  this.emit(this.ON_MOVED_EVENT, entry)
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

	// ########  request/accept api
	requestContact(userId) {
		this.getCurrentUser().then((user) => {
			this.pendingsRef.child(userId).set(user)	
		})
	}

	acceptRequest(userId) {
		return this.pendingsRef.child(userId).remove().then(() => {
			return this.contactsRef.child(userId).set({contact: true})
		})
	}

	denyRequest(userId) {
		this.pendingsRef.child(userId).remove()
	}

	listenToPendingRequests_() {
		this.pendingsRef.on('child_added', (snapshot) => {
			this.emit(this.REQUEST_CONTACT_EVENT, { id: snapshot.key, user: snapshot.val() })
		})
	}

	listenToAddedContacts_() {
		this.contactsRef.on('child_added', (snapshot) => {
			this.getUser(snapshot.key).then((user) => {
				this.emit(this.CONTACT_ADDED_EVENT, { id: snapshot.key, user: user})
			})
		})
	}
}

export default new Api()
