"use strict";

import GooglePlaces from 'node-googleplaces';

const key = "AIzaSyDUPqtzuzWx2ktMj__Wta-KxDv28_SbvzY"
const places = new GooglePlaces(key);

const query = {
  location: '49.32.780037,-96.807723',
  radius: 1000,
  key: key
};

places.nearbySearch(query).then((res) => {
  console.log(res);
}).catch((err) => {
	console.log(err)
});