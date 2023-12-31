// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: false,
	clientId: 'secret',
	clientSecret: 'secret',
	apiUrl: 'https://api.foursquare.com/v3/places/search',
	fakeDataUrl: '../assets/data/places.json',
	useApi: false,
	apiKey: 'secret',
	firebaseConfig: {
		apiKey: "secret",
		authDomain: "xyz.firebaseapp.com",
		databaseURL: "https://xyz-default-rtdb.firebaseio.com",
		projectId: "xyz",
		storageBucket: "xyz.appspot.com",
		messagingSenderId: "secret",
		appId: "secret"
	}
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
