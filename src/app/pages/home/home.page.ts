import { Component } from '@angular/core';
import { FourSquareService, Place } from '../../services/four-square.service';
import { Position } from '@capacitor/geolocation';
import { Coordinates, GeolocationService } from 'src/app/services/geolocation.service';
import { Toast } from '@capacitor/toast';
import { ToastController } from '@ionic/angular';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss']
})

export class HomePage {
	coordinates: Coordinates | null = null;
	addressInputValue: string = '';
	places: Place[] = [];

	constructor(
		private fourSquare: FourSquareService,
		private geolocation: GeolocationService,
		private toastr: ToastController
	) { }

	async locateMe() {
		let coordinates = await this.geolocation.locateMe();
		if (coordinates)
			console.log(coordinates)
		else {
			console.warn(coordinates)
			let toast = await this.toastr.create({
				message: 'Could not retrieve location. Please enter city and state below',
				color: 'danger',
				position: 'top',
				duration: 10000,
				icon: 'alert-circle'
			});
			await toast.present();
		};
	}

	async search() {
		if (this.isCityStateValid()) {
			this.callApi(this.coordinates?.latitude, this.coordinates?.longitude)
		}
		else {
			let toast = await this.toastr.create({
				message: 'Please enter a valid city and state (Oxford, MS)',
				color: 'warning',
				position: 'top',
				duration: 10000,
				icon: 'alert-circle'
			});
			await toast.present();
		}
	}

	callApi(latitude: number | undefined, longitude: number | undefined) {

		this.fourSquare.getNearbyPlaces(latitude, longitude)
			.subscribe(response => {
				// Update places with the received data
				this.places = response.results;
				console.warn(response)
			}, err => console.warn(err));
	}

	isCityStateValid() {
		const cityStatePattern = /^[a-zA-Z\u0080-\u024F]+(?:[\s-][a-zA-Z\u0080-\u024F]+)*,\s*[a-zA-Z]{2}$/
		return cityStatePattern.test(this.addressInputValue);
	}

}