"use strict";

import Api from "./api.js"

var api = new Api()

const name = "victor" + new Date().getTime()
var userId = api.createUser({name: name}).key
var userId2 = api.createUser({name: "Person2" + new Date().getTime()}).key
var userId3 = api.createUser({name: "Person3" + new Date().getTime()}).key


api.setCurrentUserId(userId)

api.pulse(10.223, 11.1323)


let pulseTheOtherCoordinates = function() {
	var offset = 0.001
	var lat = 10.223
	var long = 11.223
	setInterval(() => {
		lat += offset
		long += offset
		api.pulse(lat, long, userId2)
		api.pulse(lat + 0.002, long + 0.002, userId3)

		setTimeout(() => {
			console.log(api.getUsersInArea())
		})

	}, 500);
}

setTimeout(() => {
	pulseTheOtherCoordinates()
}, 2000)