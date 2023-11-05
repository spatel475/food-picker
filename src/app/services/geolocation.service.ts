import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { Capacitor } from '@capacitor/core';

@Injectable({
	providedIn: 'root'
})
export class GeolocationService {

	constructor() { }

	async locateMe() {
		try {
			let coords = await Geolocation.getCurrentPosition();
			let coordinates: Coordinates = {
				latitude: coords.coords.latitude,
				longitude: coords.coords.longitude
			}
			return coordinates;
		} catch (error) {
			return null;
		}
	}
}

export interface Coordinates {
	latitude: number;
	longitude: number;
}