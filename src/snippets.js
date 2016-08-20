Api.on(Api.CONTACT_ADDED_EVENT, (user) => {
	// complete user object
	console.log("on contact added user 1")
	console.log(user)
})


Api.on(Api.REQUEST_CONTACT_EVENT, (user) => {
	console.log("on request contact user 1")
	console.log(user)

	// you have
	// user.id
	// user.user
	Api.acceptRequest(user.id)
})
