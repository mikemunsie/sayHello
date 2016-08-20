"use strict";

// import api from "./api.js"
import Api from "./api.js"

const api = new Api()
const api2 = new Api()

const name = "victor" + new Date().getTime()
var userId = api.createUser({name: name}).key
api.setCurrentUserId(userId)
// var userId3 = api.createUser({name: "Person3" + new Date().getTime()}).key

api.usersInArea = {
	"id1": {
		distance: 10,
		ring: 12323
	},
	"id2": {
		distance: 33,
		ring: 12323
	},
	"id3": {
		distance: 100,
		ring: 12323
	},
	"id4": {
		distance: 78,
		ring: 12323
	}
}

console.log(api.getUsersInArea())

// Request/ accept test
// var userId2 = api2.createUser({name: "Person2" + new Date().getTime()}).key
// api2.setCurrentUserId(userId)
// api.on(api.CONTACT_ADDED_EVENT, (user) => {
// 	console.log("on contact added user 1" + api.currentUserId)
// 	console.log(user)
// })

// api2.on(api2.REQUEST_CONTACT_EVENT, (user) => {
// 	console.log("on request contact user 1")
// 	console.log(user)

// 	api2.acceptRequest(user.id)
// })

// api2.on(api2.CONTACT_ADDED_EVENT, (user) => {
// 	console.log("on contact added user 2")
// 	console.log(user)
// })

// api.requestContact(userId2)










// api.pulse(10.223, 11.1323)

// api.on("testing", (a) => {
// 	console.log("in event")
// 	console.log(a)
// })

// let pulseTheOtherCoordinates = function() {
// 	var offset = 0.001
// 	var lat = 10.223
// 	var long = 11.223
// 	setInterval(() => {
// 		lat += offset
// 		long += offset
// 		api.pulse(lat, long, userId2)
// 		api.pulse(lat + 0.002, long + 0.002, userId3)

// 		setTimeout(() => {
// 			console.log(api.getUsersInArea())
// 		})

// 	}, 500);
// }

// setTimeout(() => {
// 	pulseTheOtherCoordinates()
// }, 2000)