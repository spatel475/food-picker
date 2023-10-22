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

		// let isNative = Capacitor.isNativePlatform();

		// let location = null;

		// if (isNative) {
		// 	location = this.getLocationMobile();
		// }
		// else {
		// 	location = this.getLocationWeb();
		// }
	}

	private async getLocationMobile(): Promise<Coordinates | null> {
		const permissionState = (await Geolocation.checkPermissions()).coarseLocation;

		if (permissionState == 'granted') {
			let coords = await Geolocation.getCurrentPosition();
			let coordinates: Coordinates = {
				latitude: coords.coords.latitude,
				longitude: coords.coords.longitude
			}

			return coordinates;
		}

		let isNative = Capacitor.isNativePlatform();

		if (isNative)
			await Geolocation.requestPermissions();
		else
			this.getLocationWeb();

		return null;
	}

	private getLocationWeb() {

	}

}

export interface Coordinates {
	latitude: number;
	longitude: number;
}